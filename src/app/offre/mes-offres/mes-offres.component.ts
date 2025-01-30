import { Component } from '@angular/core';
import { Offre } from '../model/offre.model';
import { CommonModule } from '@angular/common';
import { AddOffreComponent } from '../add-offre/add-offre.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OffreService } from '../service/offre.service';
import { HttpClientModule } from '@angular/common/http';
import { MesOffres } from '../model/mes-offres.model';

@Component({
  selector: 'app-mes-offres',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MatDialogModule],
  providers: [OffreService],
  templateUrl: './mes-offres.component.html',
  styleUrl: './mes-offres.component.css'
})
export class MesOffresComponent {
  offers: MesOffres[] = [];
  
    offersPerPage = 6;
    currentPage = 1;
    constructor(private dialog:MatDialog,private offreservice:OffreService) { }

    ngOnInit(): void {
      this.MesOffre();
    }
    
    MesOffre(): void {
      console.log("mes")
      this.offreservice.getOffersByUserId(2).subscribe(
        (data: Offre[]) => {
          console.log('Mes Offre');
          console.log(data);
          this.offers = data; 
           
        },
        (error) => {
          console.error('Error fetching offers:', error);
        }
      );
    }

    opendiag(): void {
      console.log("ll")
      this.dialog.open(AddOffreComponent);
      
  
    }

    deleteOffre(id:any): void {
      console.log(id);
      this.offreservice.deleteOffre(id).subscribe(
        (res) => {
          console.log(res);
          this.offers = this.offers.filter(offer => offer.id !== id);
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
        .filter((offer) => offer.status === true) // Garder seulement les offres disponibles
        .reduce((total, offer) => total + (offer.quantite || 0), 0); // Somme des quantités
    }
  

}
