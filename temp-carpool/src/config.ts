import { Platform } from 'react-native';

// ⚠️ IP REAL DE TU PC (la que sacaste con ipconfig)
const IP_FISICA = '192.168.0.105'; 

export const API_URL = Platform.select({
  // En Android físico usamos la IP real. (10.0.2.2 solo sirve en emuladores)
  android: __DEV__ ? `http://${IP_FISICA}:3000` : 'https://tu-api.com',
  // Para iOS o Web
  ios: __DEV__ ? 'http://localhost:3000' : 'https://tu-api.com',
  // Por defecto
  default: `http://${IP_FISICA}:3000`,
}); 