export class Transaction {
  id: number;
  date: Date;
  amount: number;
  currencyType: string;
  installments: number;
  reasonCode: string;
  reasonMessage: string;
  type: string;
  planType: string;
  status: string;
}
