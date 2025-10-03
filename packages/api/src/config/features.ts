// src/config/features.ts
export const features = {
    walletDisabled:
      String(process.env['DISABLE_WALLET'] || 'false')
        .trim()
        .toLowerCase() === 'true',
  };
  