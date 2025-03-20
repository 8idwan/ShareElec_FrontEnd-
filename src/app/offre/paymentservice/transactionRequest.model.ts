export class TransactionRequest {
  constructor(
    public offreId: number,
    public amount: number,
    public quantite: number,
    public acheteurId: number,  // ID de l'acheteur
    public vendeurId: number    // ID du vendeur
  ) {}
}
