// import { useEffect, useState } from 'react';
// import { getDeviceInfo } from '@/config/helper/get-user-device-info';
// import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const CLIENT_INFO_COOKIE = 'clientInfo';

// export const useGetClientInfo = (defaultCall = true) => {
//   const dispatch = useDispatch();
//   const [clientInfo, setClientInfo] = useState<any>(null);
//   const [ready, setReady] = useState<boolean>(false);

//   useEffect(() => {
//     if (defaultCall) {
//       getClientInfo(true);
//     }
//   }, []);

//   const getClientInfo = async (getFreshData = false) => {
//     const deviceInfo = await getDeviceInfo(getFreshData);
//     dispatch({ type: 'SET_CLIENT_INFO', payload: deviceInfo });
//     cookies.set(CLIENT_INFO_COOKIE, JSON.stringify(deviceInfo), { path: '/' });
//     setClientInfo(deviceInfo);
//     setReady(true);

//     return deviceInfo;
//   };

//   return { clientInfo, ready, refetch: getClientInfo };
// };

export const getClientInfoFromCookie = () => {
  const clientInfo = cookies.get(CLIENT_INFO_COOKIE);

  if (typeof clientInfo === 'string') {
    return JSON.parse(clientInfo);
  }

  return clientInfo;
};

export const removeClientInfoFromCookie = () => {
  cookies.remove(CLIENT_INFO_COOKIE, { path: '/' });
};
