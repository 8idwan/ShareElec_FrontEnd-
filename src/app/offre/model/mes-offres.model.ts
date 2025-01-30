export class MesOffres {
    constructor(
        public _id: string,
        public quantite: number,
        public date: string,
        public type: string,
        public prixKw: number,
        public vendDetails: boolean,
        public status: string
    ) { }
}
