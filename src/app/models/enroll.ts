import { Telephone } from './telephone';
import { Document } from './document';

export interface Enroll {
  document: Document;
  phone: Telephone;
  password: string;

}
