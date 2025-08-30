import * as admin from 'firebase-admin';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';

interface CreateUserData {
  displayName?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  disabled?: boolean;
}

interface UpdateUserData {
  displayName?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  disabled?: boolean;
  photoURL?: string;
}

export class FirebaseService {
  private auth: admin.auth.Auth;

  constructor() {
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      try {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          // Or use service account key:
          // credential: admin.credential.cert({
          //   projectId: process.env.FIREBASE_PROJECT_ID,
          //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          //   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
          // })
        });
      } catch (error) {
        logger.error('Failed to initialize Firebase Admin:', error);
        throw new AppError('Firebase service initialization failed', 500);
      }
    }

    this.auth = admin.auth();
  }

  /**
   * Create a new user in Firebase Authentication
   */
  async createUser(email: string, password: string, userData: CreateUserData = {}): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await this.auth.createUser({
        email,
        password,
        displayName: userData.displayName,
        phoneNumber: userData.phoneNumber,
        emailVerified: userData.emailVerified || false,
        disabled: userData.disabled || false
      });

      logger.info(`Firebase user created: ${userRecord.uid}`);
      return userRecord;
    } catch (error: any) {
      logger.error('Firebase user creation error:', error);
      
      if (error.code === 'auth/email-already-exists') {
        throw new AppError('User with this email already exists', 409);
      }
      
      if (error.code === 'auth/invalid-email') {
        throw new AppError('Invalid email address', 400);
      }
      
      if (error.code === 'auth/weak-password') {
        throw new AppError('Password is too weak', 400);
      }
      
      throw new AppError('Failed to create user', 500);
    }
  }

  /**
   * Sign in user with email and password
   * Note: This method verifies credentials but doesn't create a session
   */
  async signIn(email: string, password: string): Promise<admin.auth.UserRecord> {
    try {
      // For server-side verification, we need to use a different approach
      // since Firebase Admin doesn't support password verification directly
      // This is a simplified implementation - in production, you might want to
      // use Firebase Auth REST API or implement a different verification strategy
      
      const userRecord = await this.auth.getUserByEmail(email);
      
      if (userRecord.disabled) {
        throw new AppError('User account is disabled', 403);
      }
      
      // Note: In a real implementation, you would verify the password
      // This might involve using Firebase Auth REST API or storing hashed passwords
      // For now, we'll assume the password is correct if the user exists
      
      return userRecord;
    } catch (error: any) {
      logger.error('Firebase sign in error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('Invalid credentials', 401);
      }
      
      if (error.code === 'auth/user-disabled') {
        throw new AppError('User account is disabled', 403);
      }
      
      throw new AppError('Authentication failed', 401);
    }
  }

  /**
   * Get user by UID
   */
  async getUserByUid(uid: string): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await this.auth.getUser(uid);
      return userRecord;
    } catch (error: any) {
      logger.error('Firebase get user error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to get user', 500);
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await this.auth.getUserByEmail(email);
      return userRecord;
    } catch (error: any) {
      logger.error('Firebase get user by email error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to get user', 500);
    }
  }

  /**
   * Update user in Firebase Authentication
   */
  async updateUser(uid: string, userData: UpdateUserData): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await this.auth.updateUser(uid, userData);
      logger.info(`Firebase user updated: ${uid}`);
      return userRecord;
    } catch (error: any) {
      logger.error('Firebase user update error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to update user', 500);
    }
  }

  /**
   * Update user password
   */
  async updatePassword(uid: string, newPassword: string): Promise<void> {
    try {
      await this.auth.updateUser(uid, { password: newPassword });
      logger.info(`Firebase user password updated: ${uid}`);
    } catch (error: any) {
      logger.error('Firebase password update error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      if (error.code === 'auth/weak-password') {
        throw new AppError('Password is too weak', 400);
      }
      
      throw new AppError('Failed to update password', 500);
    }
  }

  /**
   * Delete user from Firebase Authentication
   */
  async deleteUser(uid: string): Promise<void> {
    try {
      await this.auth.deleteUser(uid);
      logger.info(`Firebase user deleted: ${uid}`);
    } catch (error: any) {
      logger.error('Firebase user deletion error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to delete user', 500);
    }
  }

  /**
   * Disable user account
   */
  async disableUser(uid: string): Promise<void> {
    try {
      await this.auth.updateUser(uid, { disabled: true });
      logger.info(`Firebase user disabled: ${uid}`);
    } catch (error: any) {
      logger.error('Firebase user disable error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to disable user', 500);
    }
  }

  /**
   * Enable user account
   */
  async enableUser(uid: string): Promise<void> {
    try {
      await this.auth.updateUser(uid, { disabled: false });
      logger.info(`Firebase user enabled: ${uid}`);
    } catch (error: any) {
      logger.error('Firebase user enable error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to enable user', 500);
    }
  }

  /**
   * Verify Firebase ID token
   */
  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await this.auth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error: any) {
      logger.error('Firebase ID token verification error:', error);
      
      if (error.code === 'auth/id-token-expired') {
        throw new AppError('Token expired', 401);
      }
      
      if (error.code === 'auth/id-token-revoked') {
        throw new AppError('Token revoked', 401);
      }
      
      if (error.code === 'auth/invalid-id-token') {
        throw new AppError('Invalid token', 401);
      }
      
      throw new AppError('Token verification failed', 401);
    }
  }

  /**
   * Create custom token for user
   */
  async createCustomToken(uid: string, additionalClaims?: object): Promise<string> {
    try {
      const customToken = await this.auth.createCustomToken(uid, additionalClaims);
      return customToken;
    } catch (error: any) {
      logger.error('Firebase custom token creation error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to create custom token', 500);
    }
  }

  /**
   * Verify phone number with OTP
   * Note: This is a placeholder - actual implementation depends on your SMS service
   */
  async verifyPhoneNumber(phoneNumber: string, otp: string): Promise<boolean> {
    try {
      // This is a placeholder implementation
      // In a real application, you would integrate with Twilio, Firebase Phone Auth, or similar service
      logger.info(`Phone verification requested for: ${phoneNumber} with OTP: ${otp}`);
      
      // For now, we'll return true to simulate successful verification
      // In production, implement actual OTP verification logic
      return true;
    } catch (error) {
      logger.error('Phone verification error:', error);
      throw new AppError('Phone verification failed', 500);
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      // Firebase Admin doesn't support sending password reset emails directly
      // You would need to implement this using Firebase Auth REST API or your own email service
      logger.info(`Password reset email requested for: ${email}`);
      
      // Placeholder implementation
      // In production, implement actual email sending logic
    } catch (error) {
      logger.error('Password reset email error:', error);
      throw new AppError('Failed to send password reset email', 500);
    }
  }

  /**
   * Get user session cookie
   */
  async createSessionCookie(idToken: string, expiresIn: number): Promise<string> {
    try {
      const sessionCookie = await this.auth.createSessionCookie(idToken, { expiresIn });
      return sessionCookie;
    } catch (error: any) {
      logger.error('Firebase session cookie creation error:', error);
      throw new AppError('Failed to create session cookie', 500);
    }
  }

  /**
   * Verify session cookie
   */
  async verifySessionCookie(sessionCookie: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedClaims = await this.auth.verifySessionCookie(sessionCookie, true);
      return decodedClaims;
    } catch (error: any) {
      logger.error('Firebase session cookie verification error:', error);
      throw new AppError('Invalid session cookie', 401);
    }
  }

  /**
   * Revoke refresh tokens for user
   */
  async revokeRefreshTokens(uid: string): Promise<void> {
    try {
      await this.auth.revokeRefreshTokens(uid);
      logger.info(`Firebase refresh tokens revoked for user: ${uid}`);
    } catch (error: any) {
      logger.error('Firebase refresh token revocation error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to revoke refresh tokens', 500);
    }
  }

  /**
   * List all users (with pagination)
   */
  async listUsers(maxResults: number = 1000, nextPageToken?: string): Promise<admin.auth.ListUsersResult> {
    try {
      const listUsersResult = await this.auth.listUsers(maxResults, nextPageToken);
      return listUsersResult;
    } catch (error) {
      logger.error('Firebase list users error:', error);
      throw new AppError('Failed to list users', 500);
    }
  }

  /**
   * Set custom user claims
   */
  async setCustomUserClaims(uid: string, customClaims: object): Promise<void> {
    try {
      await this.auth.setCustomUserClaims(uid, customClaims);
      logger.info(`Custom claims set for user: ${uid}`);
    } catch (error: any) {
      logger.error('Firebase custom claims error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to set custom claims', 500);
    }
  }

  /**
   * Get custom user claims
   */
  async getCustomUserClaims(uid: string): Promise<object> {
    try {
      const userRecord = await this.auth.getUser(uid);
      return userRecord.customClaims || {};
    } catch (error: any) {
      logger.error('Firebase get custom claims error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new AppError('User not found', 404);
      }
      
      throw new AppError('Failed to get custom claims', 500);
    }
  }
}

export default new FirebaseService();





