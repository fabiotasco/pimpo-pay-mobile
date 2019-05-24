import { DestinationAccount } from './destination-account';
import { HolderAccount } from './deposit';

export interface Purchase {
  date: string;
  amount: number;
  currency: string;
  installments: number;
  plan: string;
  destinationAccount: DestinationAccount;
  holderAccount: HolderAccount;

}
