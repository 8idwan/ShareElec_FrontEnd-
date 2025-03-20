export class Offre {
  constructor(
    public id: number,
    public quantite: number,
    public date: string,
    public type: string,
    public prixKw: number,
    public vendDetails: boolean,
    public status: boolean,
    public user: {
      id: number;
      nom: string;
      prenom: string;
      NumeroTelephone:string;
      userStatus : string;
      email: string;
    }
  ) {}
}
