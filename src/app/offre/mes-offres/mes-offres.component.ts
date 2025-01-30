import { Component } from '@angular/core';
import { Offre } from '../model/offre.model';
import { CommonModule } from '@angular/common';
import { AddOffreComponent } from '../add-offre/add-offre.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { OffreService } from '../service/offre.service';
import { HttpClientModule } from '@angular/common/http';
import { MesOffres } from '../model/mes-offres.model';
import { EditOffreComponent } from '../edit-offre/edit-offre.component';

@Component({
  selector: 'app-mes-offres',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatDialogModule],
  providers: [OffreService],
  templateUrl: './mes-offres.component.html',
  styleUrl: './mes-offres.component.css'
})
export class MesOffresComponent {
  offers: MesOffres[] = [

  ];

  offersPerPage = 6;
  currentPage = 1;
  constructor(private dialog: MatDialog, private offreservice: OffreService) { }

  ngOnInit(): void {
    this.MesOffre();
  }

  MesOffre(): void {
    console.log("mes")
    this.offreservice.getOffersByUserId(1).subscribe(
      (data: MesOffres[]) => {
        console.log('Mes Offres');
        console.log(data);
        this.offers = data;

      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
  }

  opendiag(): void {
    const dialogRef = this.dialog.open(AddOffreComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.offreservice.createOffre(result).subscribe(
          (newOffer) => {
            console.log('Nouvelle offre créée:', newOffer);
            this.MesOffre(); // Rafraîchir la liste des offres
          },
          (error) => {
            console.error('Erreur lors de la création:', error);
          }
        );
      }
    });
  }

  openEditDialog(offer: MesOffres): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: offer.id,
      userId: offer.userId,  // Ajoutez cette ligne
      quantite: offer.quantite,
      vendDetails: offer.vendDetails,
      type: offer.type,
      prixKw: offer.prixKw,
      status: offer.status,
      date: offer.date
    };;
    const dialogRef = this.dialog.open(EditOffreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.offreservice.modifierOffer(offer.id, result).subscribe(
          (updatedOffer) => {
            console.log('Offre modifiée avec succès:', updatedOffer);
            this.MesOffre();
          },
          (error) => {
            console.error('Erreur lors de la modification:', error);
          }
        );
      }
    });
  }


  get paginatedOffers(): MesOffres[] {
    const startIndex = (this.currentPage - 1) * this.offersPerPage;
    const endIndex = startIndex + this.offersPerPage;
    return this.offers.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.offers.length / this.offersPerPage);
  }

  changePage(direction: number): void {
    if (
      (direction === -1 && this.currentPage > 1) ||
      (direction === 1 && this.currentPage < this.totalPages)
    ) {
      this.currentPage += direction;
    }
  }

  quantiteTotalVendu(): number {
    return this.offers
      .filter(offer => offer.status === true)
      .reduce((sum, offer) => sum + offer.quantite, 0);
  }

  offreActives(): number {
    if (this.offers.length === 0) return 0;
    return this.offers.filter((offer) => offer.status === true).length;

  }

  quantiteTotalDisponible(): number {
    if (this.offers.length === 0) return 0;

    // Filtrer les offres avec le statut "Disponible" et sommer leurs quantités
    return this.offers
      .filter((offer) => offer.status ===true) // Garder seulement les offres disponibles
      .reduce((total, offer) => total + (offer.quantite || 0), 0); // Somme des quantités
  }

}