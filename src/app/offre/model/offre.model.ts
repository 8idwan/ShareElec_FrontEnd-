export class Offre {
    constructor(
      public _id: string,
      public userName: string,
      public userStatus: string,
      public quantite: number,
      public date: string,
      public type: string,
      public prixKw: number,
      public vendDetails: boolean,
      public status: string
    ) {}
  }

  // normalement on doit mettre le type user dans offre
  