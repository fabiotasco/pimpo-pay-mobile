export class Deposit {
  date: string; // 2018-10-01 15:08:00,
  amount: number;
  currency: string;
  holderAccount: HolderAccount;

  constructor() {
    this.currency = 'BRL';
    this.holderAccount = {
      number: null
    };
  }
}

export interface HolderAccount {
  number: string;
}
