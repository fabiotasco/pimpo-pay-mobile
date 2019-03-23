import { DestinationAccount } from './destination-account';
import { HolderAccount } from './deposit';

export interface Transfer {
  date: string;
  amount: number;
  currency: string;
  destinationAccount: DestinationAccount;
  holderAccount: HolderAccount;
}
