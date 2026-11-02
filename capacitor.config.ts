import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'vn.quanso.offline',
  appName: 'Quản lý quân số',
  webDir: 'www',
  bundledWebRuntime: false,
  server: { androidScheme: 'https' }
};
export default config;
