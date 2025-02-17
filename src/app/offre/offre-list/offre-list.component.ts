import { Component } from '@angular/core';
import { Offre } from '../model/offre.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddOffreComponent } from '../add-offre/add-offre.component';
import { CommonModule } from '@angular/common';
import { OffreService } from '../service/offre.service';
import { HttpClientModule } from '@angular/common/http';
import { AcheterEnergieComponent } from '../acheter-energie/acheter-energie.component';

@Component({
  selector: 'app-offre-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, HttpClientModule],
  providers: [OffreService],
  templateUrl: './offre-list.component.html',
  styleUrl: './offre-list.component.css'
})
export class OffreListComponent {
  offers: Offre[] = [];

  offersPerPage = 6;
  currentPage = 1;
  constructor(private dialog: MatDialog, private offreservice: OffreService) { }

  ngOnInit(): void {
    this.getOffers();
    
  }

  getOffers(): void {
    this.offreservice.getOffers().subscribe(
      (data: Offre[]) => {
        console.log('response');
        console.log(data);
        this.offers = data;

      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
    //this.offers.reverse();
  }

  opendiag(): void {
    console.log('Opening dialog...');
    const dialogRef = this.dialog.open(AddOffreComponent);
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        console.log('Dialog closed successfully - refreshing offers');
        setTimeout(() => {  // Add a small delay to ensure the backend is updated
          this.getOffers();
        }, 100);
      }
    });
}



  


  get paginatedOffers(): Offre[] {
  const startIndex = (this.currentPage - 1) * this.offersPerPage;
  const endIndex = startIndex + this.offersPerPage;
  return this.offers.slice(startIndex, endIndex);
}

  get totalPages(): number {
  return Math.ceil(this.offers.length / this.offersPerPage);
}

changePage(direction: number): void {
  if(
      (direction === -1 && this.currentPage > 1) ||
  (direction === 1 && this.currentPage < this.totalPages)
    ) {
  this.currentPage += direction;
}
  }

calculePrixMoyen(): number {
  if (this.offers.length === 0) return 0;

  const totalPrice = this.offers.reduce((sum, offer) => sum + offer.prixKw, 0);
  return Number((totalPrice / this.offers.length).toFixed(3));
}

offreActives(): number {
  if (this.offers.length === 0) return 0;
  return this.offers.filter((offer) => offer.status === true).length;

}

quantiteTotalDisponible(): number {
  if (this.offers.length === 0) return 0;

  // Filtrer les offres avec le statut "Disponible" et sommer leurs quantités
  return this.offers
    .filter((offer) => offer.status === true) // Garder seulement les offres disponibles
    .reduce((total, offer) => total + (offer.quantite || 0), 0); // Somme des quantités
}


acheterEnergie(offre: Offre): void {
  const dialogRef = this.dialog.open(AcheterEnergieComponent, {
    data: offre, // Passez l'offre sélectionnée au composant de dialogue
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'acheter') {
      // Logique à exécuter après l'achat (par exemple, mettre à jour l'offre)
      console.log('Achat confirmé pour l\'offre :', offre);
      // Vous pouvez mettre à jour l'offre dans la liste ici, par exemple:
      //offre.status = false; // Marquer l'offre comme vendue
    } else {
      console.log('Achat annulé.');
    }
  });
}

}