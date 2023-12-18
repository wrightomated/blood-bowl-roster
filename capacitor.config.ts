import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bbroster',
  appName: 'bbroster',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
