export class MesOffres {
    constructor(
        public id: number,
        public userId: number,
        public quantite: number,
        public date: string,
        public type: string,
        public prixKw: number,
        public vendDetails: boolean,
        public status: boolean
    ) { }
}
