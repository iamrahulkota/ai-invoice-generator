
{/* <> File Infromation:
    1. Detecting client/device-specific information like:
      Browser name/version
      Operating system
      Device type (mobile, tablet, desktop)
      Possibly screen size, locale, etc.
    2. Returning it in a structured object, often to:
      Include in HTTP request headers
      Help with analytics, debugging, or device-specific behavior in the frontend or backend
</> */}

// import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { axiosInstance } from '../axiosConfig';
// import dayjs from 'dayjs';

// Cache for IP and location data
let cachedIpInfo: any = null;
let cachedFingerprint: string | null = null;
// let lastFetchTime: string | null = null;

// Initialize FingerprintJS
// const fpPromise = FingerprintJS.load();

// Function to get device fingerprint
const getDeviceFingerprint = async (getFreshData = false): Promise<string> => {
  if (!getFreshData && cachedFingerprint) return cachedFingerprint;
  
  try {
    // const fp = await fpPromise;
    // const result = await fp.get();
    
    // Get device-specific components
    // const components = result.components;

    // Enhanced hardware detection
    const getHardwareInfo = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
      let gpuInfo = '';
      
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          gpuInfo = `${vendor}:${renderer}`;
        }
      }

      // Get CPU architecture details
      const cpuCores = navigator.hardwareConcurrency || 0;
      const memory = (navigator as any).deviceMemory || 0;

      return {
        gpu: gpuInfo,
        cpuCores,
        memory
      };
    };

    // Get screen characteristics that are hardware-dependent
    const getScreenCharacteristics = () => {
      const depth = window.screen.colorDepth;
      const pixelRatio = window.devicePixelRatio;
      const maxWidth = Math.max(
        window.screen.width,
        window.screen.availWidth,
        window.screen.width * pixelRatio
      );
      const maxHeight = Math.max(
        window.screen.height,
        window.screen.availHeight,
        window.screen.height * pixelRatio
      );

      return {
        width: maxWidth,
        height: maxHeight,
        depth,
        pixelRatio
      };
    };

    // Get audio capabilities (can help identify hardware)
    const getAudioCapabilities = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const maxChannels = audioContext.destination.maxChannelCount;
        const sampleRate = audioContext.sampleRate;
        audioContext.close();
        return { maxChannels, sampleRate };
      } catch (e) {
        return null;
      }
    };

    // Focus on hardware-specific attributes
    const deviceSpecificAttributes = {
      // Hardware characteristics
      hardware: getHardwareInfo(),
      screen: getScreenCharacteristics(),
      audio: getAudioCapabilities(),
      
      // OS-level information that's consistent
      platform: navigator.platform,
      oscpu: (navigator as any).oscpu,
      
      // Additional hardware indicators
      maxTouchPoints: navigator.maxTouchPoints,
      deviceMemory: (navigator as any).deviceMemory,
      
      // System language (helps differentiate similar devices)
      systemLanguage: navigator.language,
      
      // Time zone (geographical context)
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    // Create a stable hash from hardware attributes
    const stableAttributes = [
      deviceSpecificAttributes.hardware,
      deviceSpecificAttributes.screen,
      deviceSpecificAttributes.platform,
      deviceSpecificAttributes.maxTouchPoints,
      deviceSpecificAttributes.deviceMemory,
      deviceSpecificAttributes.timezone
    ];
    
    // Create a deterministic string from the attributes
    const deviceHash = stableAttributes
      .filter(attr => attr !== null && attr !== undefined)
      .map(attr => JSON.stringify(attr))
      .join('||');
    
    // Use SHA-256 for consistent hashing
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(deviceHash));
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Store only first 32 chars for a more manageable fingerprint
    const finalFingerprint = hashHex.slice(0, 32);
    
    console.log('Device Fingerprint Generated:', finalFingerprint);
    
    cachedFingerprint = finalFingerprint;
    // lastFetchTime = dayjs().format('DD MMM YYYY, HH:mm:ss');
    return cachedFingerprint;
  } catch (error) {
    console.warn('Failed to generate device fingerprint:', error);
    return '';
  }
};

// Function to get IP and location information
const getIpAndLocationInfo = async (getFreshData = false) => {
  if (!getFreshData && cachedIpInfo) return cachedIpInfo;
  
  try {
    const response = await axiosInstance.get('user_ip_info/get-info');
    cachedIpInfo = response.data;
    // lastFetchTime = dayjs().format('DD MMM YYYY, HH:mm:ss');
    return cachedIpInfo;
  } catch (error) {
    console.warn('Failed to fetch IP information:', error);
    return null;
  }
};

// Function to get geolocation
// const getGeolocation = (): Promise<GeolocationPosition> => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error('Geolocation is not supported'));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(resolve, reject, {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0
//     });
//   });
// };

// Function to collect device information
export const getDeviceInfo = async (getFreshData = false) => {
  // Get unique device fingerprint
  const deviceFingerprint = await getDeviceFingerprint(getFreshData);
  
  const basicInfo = {
    'X-Device-Fingerprint': deviceFingerprint,
    // 'X-Last-Fresh-Fetch': lastFetchTime || '',
    'X-User-Agent': window.navigator.userAgent,
    // 'X-Screen-Resolution': `${window.screen.width}x${window.screen.height}`,
    // 'X-Viewport-Size': `${window.innerWidth}x${window.innerHeight}`,
    // 'X-Platform': window.navigator.platform,
    'X-Browser-Language': window.navigator.language,
    'X-Device-Type': /Mobile|Android|iPhone/i.test(window.navigator.userAgent) ? 'mobile' : 'desktop',
    // 'X-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    
    // Browser capabilities
    // 'X-Cookies-Enabled': navigator.cookieEnabled.toString(),
    // 'X-Local-Storage': typeof localStorage !== 'undefined' ? 'true' : 'false',
    // 'X-WebGL-Support': typeof document.createElement('canvas').getContext('webgl') !== 'undefined' ? 'true' : 'false',
    // 'X-Touch-Support': ('ontouchstart' in window || navigator.maxTouchPoints > 0).toString(),
    
    // System capabilities
    // 'X-Hardware-Concurrency': (navigator as any).hardwareConcurrency?.toString() || '',
    // 'X-Device-Memory': (navigator as any).deviceMemory?.toString() || '',
    // 'X-Color-Depth': window.screen.colorDepth?.toString() || '',
    // 'X-Pixel-Ratio': window.devicePixelRatio?.toString() || '',
  };

  // Network information
  // const connection = (navigator as any).connection;
  // if (connection) {
  //   basicInfo['X-Network-Type'] = connection.effectiveType || '';
  //   basicInfo['X-Network-Downlink'] = connection.downlink?.toString() || '';
  //   basicInfo['X-Network-SaveData'] = connection.saveData?.toString() || '';
  // }

  // Battery information
  // try {
  //   const battery: any = await (navigator as any).getBattery?.();
  //   if (battery) {
  //     basicInfo['X-Battery-Level'] = (battery.level * 100).toString();
  //     basicInfo['X-Battery-Charging'] = battery.charging.toString();
  //   }
  // } catch (error) {
  //   console.warn('Battery status not available:', error);
  // }

  // Get IP and location info
  const ipInfo = await getIpAndLocationInfo(getFreshData);
  const additionalInfo: Record<string, string> = {};
  
  if (ipInfo) {
    // Basic location info
    additionalInfo['X-Client-IP'] = ipInfo.ip || '';
    additionalInfo['X-Client-City'] = ipInfo.city || '';
    additionalInfo['X-Client-Region'] = ipInfo.region || '';
    additionalInfo['X-Client-Country'] = ipInfo.country_name || '';
    additionalInfo['X-Client-Postal'] = ipInfo.postal || '';
    
    // Precise coordinates
    additionalInfo['X-Client-Latitude'] = ipInfo.latitude?.toString() || '';
    additionalInfo['X-Client-Longitude'] = ipInfo.longitude?.toString() || '';
    
    // Additional location context
    additionalInfo['X-Client-Timezone'] = ipInfo.timezone || '';
    // additionalInfo['X-Client-Currency'] = ipInfo.currency || '';
    // additionalInfo['X-Client-Languages'] = ipInfo.languages || '';
    // additionalInfo['X-Client-Network'] = ipInfo.network || '';
    // additionalInfo['X-Client-ISP'] = ipInfo.org || '';
  }

  // Try to get precise geolocation if available
  // try {
  //   const position = await getGeolocation();
  //   additionalInfo['X-Geolocation-Lat'] = position.coords.latitude.toString();
  //   additionalInfo['X-Geolocation-Long'] = position.coords.longitude.toString();
  //   additionalInfo['X-Geolocation-Accuracy'] = position.coords.accuracy.toString();
  // } catch (error) {
  //   console.warn('Geolocation not available:', error);
  // }

  return { ...basicInfo, ...additionalInfo };
};