import { Credentials } from '../models/credentials';
import { isIOS } from 'tns-core-modules/platform';

declare var NSString: any;
declare var NSUTF8StringEncoding: any;
declare var java: any;
declare var android: any;

/* Endpoints enviroments */

export const ACCESS = 'accesss';

export const endpoint: string = 'http://35.243.251.185:8080/api';
//export const endpoint:string = 'http://pimpopay.com/api';

/* Endpoints enviroments */

export const redirectTo = (index: number): string => {
  const urls = [
    '/home/balance',
    '/home/buy',
    '/home/credit',
    '/home/transfer',
    '/home/user'
  ];
  return urls[index];
};

export const openRoute = (route): boolean => {
  const routes = ['/access/login', 'access/enroll'];
  let isOpen = false;

  routes.forEach(url => {
    if (route.indexOf(url) > -1) {
      isOpen = true;
    }
  });

  return isOpen;
};

export const btoa = (creditials: Credentials): string => {
  if (isIOS) {
    let text = NSString.stringWithString(
      creditials.username + ':' + creditials.password
    );
    let data = text.dataUsingEncoding(NSUTF8StringEncoding);
    return data.base64EncodedStringWithOptions(0);
  } else {
    let text = new java.lang.String(
      creditials.username + ':' + creditials.password
    );
    let data = text.getBytes('UTF-8');
    return android.util.Base64.encodeToString(
      data,
      android.util.Base64.DEFAULT
    );
  }
};

export const mobileOperatorList = () => {
  return ['claro', 'oi', 'tim', 'vivo'];
};

export const formatPhoneNumber = (phone: string) => {
  phone = phone.replace(/\D/, '');
  return '+55' + phone;
};

export const adjustDecimal = (nr: number, decimal: number): number => {
  var og = Math.pow(10, decimal);
  return Math.floor(nr * og) / og;
};

export enum PositionChevron {
  CLOSE = 0,
  OPEN = -90
}

export enum AccessType {
  BUSINESS = 'Business',
  PERSONAL = 'Personal'
}

export enum TransactionStatus {
  AUTHORIZED = 'AUTHORIZED',
  /** Negada */
  DENIED = 'DENIED',

  /** Cancelada */
  CANCELLED = 'CANCELLED',

  /** Liquidada */
  SETTLED = 'SETTLED',

  /** Disputada */
  DISPUTED = 'DISPUTED',

  /** Disputa respondida */
  DISPUTE_RESPONDED = 'DISPUTE_RESPONDED',

  /** Arbitrada */
  ARBITRATED = 'ARBITRATED'
}
