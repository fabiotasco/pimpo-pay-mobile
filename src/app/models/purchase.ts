export interface Purchase{
        date:string;
        amount: number;
        currency: string;
        installments: number;
        plan: "Prepaid";
        destinationAccount: {
            hash: string;
        },
        holderAccount: {
            number:string;
        }
}