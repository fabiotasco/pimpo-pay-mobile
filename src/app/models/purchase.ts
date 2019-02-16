export interface Purchase{
        date:string;
        amount: number;
        currency: string;
        installments: number;
        plan: string;
        destinationAccount: {
            hash: string;
        },
        holderAccount: {
            number:string;
        }
}