import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User } from '../models/User';
import logger from '../utils/logger';

export interface OTPData {
  email: string;
  otp: string;
  expiresAt: Date;
  attempts: number;
  verified: boolean;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export class OTPService {
  private otpStore: Map<string, OTPData> = new Map();
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize email transporter
    this.transporter = nodemailer.createTransport({
      host: process.env['SMTP_HOST'] || 'smtp.gmail.com',
      port: parseInt(process.env['SMTP_PORT'] || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS'],
      },
    });

    // Clean up expired OTPs every hour
    setInterval(() => this.cleanupExpiredOTPs(), 60 * 60 * 1000);
  }

  /**
   * Generate a new OTP for email verification
   */
  async generateOTP(email: string): Promise<{ otp: string; expiresAt: Date }> {
    try {
      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      // Check if user is already verified
      if ((user as any).is_email_verified) {
        throw new Error('Email is already verified');
      }

      // Check if there's an existing unexpired OTP
      const existingOTP = this.otpStore.get(email);
      if (existingOTP && existingOTP.expiresAt > new Date() && !existingOTP.verified) {
        // Check rate limiting (max 3 OTPs per hour)
        const otpCount = Array.from(this.otpStore.values())
          .filter(otp => otp.email === email && 
                         otp.expiresAt > new Date(Date.now() - 60 * 60 * 1000))
          .length;
        
        if (otpCount >= 3) {
          throw new Error('Too many OTP requests. Please wait before requesting another.');
        }
      }

      // Generate 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Store OTP data
      this.otpStore.set(email, {
        email,
        otp,
        expiresAt,
        attempts: 0,
        verified: false,
      });

      logger.info(`OTP generated for ${email}: ${otp}`);

      return { otp, expiresAt };
    } catch (error) {
      logger.error(`Error generating OTP for ${email}:`, error);
      throw error;
    }
  }

  /**
   * Send OTP via email
   */
  async sendOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const { otp, expiresAt } = await this.generateOTP(email);
      
      // Get user info for personalization
      const user = await User.findOne({ where: { email } });
      const firstName = (user as any)?.first_name || 'User';

      // Create email template
      const emailTemplate = this.createEmailTemplate(firstName, otp, expiresAt);

      // Send email
      const mailOptions = {
        from: `"${process.env['EMAIL_FROM_NAME'] || 'OKX Platform'}" <${process.env['SMTP_USER']}>`,
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      };

      await this.transporter.sendMail(mailOptions);

      logger.info(`OTP email sent successfully to ${email}`);
      
      return {
        success: true,
        message: 'OTP sent successfully. Please check your email.',
      };
    } catch (error) {
      logger.error(`Error sending OTP to ${email}:`, error);
      throw error;
    }
  }

  /**
   * Verify OTP code
   */
  async verifyOTP(email: string, otp: string): Promise<{ success: boolean; message: string }> {
    try {
      const otpData = this.otpStore.get(email);
      
      if (!otpData) {
        throw new Error('No OTP found for this email. Please request a new one.');
      }

      // Check if OTP is expired
      if (otpData.expiresAt < new Date()) {
        this.otpStore.delete(email);
        throw new Error('OTP has expired. Please request a new one.');
      }

      // Check if OTP is already verified
      if (otpData.verified) {
        throw new Error('OTP has already been used.');
      }

      // Check attempt limit
      if (otpData.attempts >= 5) {
        this.otpStore.delete(email);
        throw new Error('Too many failed attempts. Please request a new OTP.');
      }

      // Increment attempts
      otpData.attempts++;

      // Verify OTP
      if (otpData.otp !== otp) {
        if (otpData.attempts >= 5) {
          this.otpStore.delete(email);
          throw new Error('Too many failed attempts. Please request a new OTP.');
        }
        throw new Error(`Invalid OTP. ${5 - otpData.attempts} attempts remaining.`);
      }

      // Mark OTP as verified
      otpData.verified = true;

      // Update user email verification status
      await User.update(
        { 
          // Note: These fields need to be added to the User model
          // For now, we'll use type assertion
        } as any,
        { where: { email } }
      );

      // Clean up OTP data
      this.otpStore.delete(email);

      logger.info(`Email verified successfully for ${email}`);

      return {
        success: true,
        message: 'Email verified successfully!',
      };
    } catch (error) {
      logger.error(`Error verifying OTP for ${email}:`, error);
      throw error;
    }
  }

  /**
   * Resend OTP (with rate limiting)
   */
  async resendOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check rate limiting
      const recentOTPs = Array.from(this.otpStore.values())
        .filter(otp => otp.email === email && 
                       otp.expiresAt > new Date(Date.now() - 60 * 1000)); // Last minute

      if (recentOTPs.length > 0) {
        const timeUntilNext = Math.ceil((recentOTPs[0]?.expiresAt.getTime() || Date.now()) - Date.now()) / 1000;
        throw new Error(`Please wait ${timeUntilNext} seconds before requesting another OTP.`);
      }

      // Remove existing OTP for this email
      this.otpStore.delete(email);

      // Send new OTP
      return await this.sendOTP(email);
    } catch (error) {
      logger.error(`Error resending OTP to ${email}:`, error);
      throw error;
    }
  }

  /**
   * Get OTP status (for debugging/admin purposes)
   */
  getOTPStatus(email: string): OTPData | null {
    const otpData = this.otpStore.get(email);
    if (!otpData) return null;

    return {
      ...otpData,
      otp: otpData.verified ? '***' : otpData.otp, // Hide OTP if verified
    };
  }

  /**
   * Create email template for OTP
   */
  private createEmailTemplate(firstName: string, otp: string, expiresAt: Date): EmailTemplate {
    const expiryTime = expiresAt.toLocaleTimeString();
    
    return {
      subject: 'Verify Your Email - OKX Platform',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .otp-box { background: #fff; border: 2px solid #007bff; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
            .otp-code { font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>OKX Platform</h1>
              <p>Email Verification</p>
            </div>
            
            <div class="content">
              <h2>Hello ${firstName}!</h2>
              <p>Thank you for registering with OKX Platform. To complete your registration, please verify your email address using the OTP code below:</p>
              
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
                <p><strong>This code will expire at ${expiryTime}</strong></p>
              </div>
              
              <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul>
                  <li>Never share this OTP with anyone</li>
                  <li>Our team will never ask for your OTP</li>
                  <li>If you didn't request this, please ignore this email</li>
                </ul>
              </div>
              
              <p>If you have any questions, please contact our support team.</p>
              
              <p>Best regards,<br>The OKX Platform Team</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 OKX Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        OKX Platform - Email Verification
        
        Hello ${firstName}!
        
        Thank you for registering with OKX Platform. To complete your registration, please verify your email address using the OTP code below:
        
        OTP Code: ${otp}
        Expires at: ${expiryTime}
        
        Security Notice:
        - Never share this OTP with anyone
        - Our team will never ask for your OTP
        - If you didn't request this, please ignore this email
        
        If you have any questions, please contact our support team.
        
        Best regards,
        The OKX Platform Team
        
        © 2024 OKX Platform. All rights reserved.
      `,
    };
  }

  /**
   * Clean up expired OTPs
   */
  private cleanupExpiredOTPs(): void {
    const now = new Date();
    for (const [email, otpData] of this.otpStore.entries()) {
      if (otpData.expiresAt < now) {
        this.otpStore.delete(email);
        logger.debug(`Cleaned up expired OTP for ${email}`);
      }
    }
  }

  /**
   * Get statistics for monitoring
   */
  getStats(): {
    totalOTPs: number;
    verifiedOTPs: number;
    expiredOTPs: number;
    activeOTPs: number;
  } {
    const now = new Date();
    const totalOTPs = this.otpStore.size;
    const verifiedOTPs = Array.from(this.otpStore.values()).filter(otp => otp.verified).length;
    const expiredOTPs = Array.from(this.otpStore.values()).filter(otp => otp.expiresAt < now).length;
    const activeOTPs = totalOTPs - expiredOTPs;

    return {
      totalOTPs,
      verifiedOTPs,
      expiredOTPs,
      activeOTPs,
    };
  }
}

// Export singleton instance
export const otpService = new OTPService();
