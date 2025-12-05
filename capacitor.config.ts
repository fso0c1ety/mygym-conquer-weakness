import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mygym.app',
  appName: 'MyGym',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor'
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true
  },
  plugins: {
    Keyboard: {
      resize: 'native',
      resizeOnFullScreen: true
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: '#ef4444',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
