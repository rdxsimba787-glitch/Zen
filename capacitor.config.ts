import type {CapacitorConfig} from '@capacitor/cli';

// Change appId to your own reverse-domain id (for example com.yourname.yourapp)
// before publishing to the Play Store. appName is the name shown under the icon.
const config: CapacitorConfig = {
  appId: 'com.example.minecraftsite',
  appName: 'Minecraft Server',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#0a0a0c',
      showSpinner: false,
      androidSplashResourceName: 'splash',
    },
  },
};

export default config;
