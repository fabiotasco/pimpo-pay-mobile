import { Telephone } from './telephone';

export class UserData {
  hash: string;
  contracts: Array<Contract>;
  plans: Array<Plan>;
  phones: Array<Telephone>;
  status: string;

  constructor(){}
}

interface Contract {
  contractType: string;
}

interface Plan {
  name: string;
}
