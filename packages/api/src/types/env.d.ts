declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production' | 'test';
      PORT?: string;
      DISABLE_WALLET?: string;
      npm_package_version?: string;
      // add DB_USER, DB_PASSWORD, etc. if you want type safety
    }
  }
  