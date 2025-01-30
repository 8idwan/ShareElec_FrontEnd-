export class Offre {
  constructor(
    public _id: string,
    public quantite: number,
    public date: string,
    public type: string,
    public prixKw: number,
    public vendDetails: boolean,
    public status: string,
    public user: {
      idUtilisateure: number;
      nom: string;
      prenom: string;
      NumeroTelephone:string;
      userStatus : string;
      email: string;
    }
  ) {}
}