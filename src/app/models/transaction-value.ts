import { DestinationAccount } from './destination-account';
import { HolderAccount } from './holder-account';

export class TransactionValue {
  amount: number;
  installments: number;
  plan: string;
  destinationAccount: string;
  destinationHash: string;

  constructor() {}
}
