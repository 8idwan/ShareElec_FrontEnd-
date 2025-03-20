import { Component } from '@angular/core';
import { Offre } from '../model/offre.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddOffreComponent } from '../add-offre/add-offre.component';
import { CommonModule } from '@angular/common';
import { OffreService } from '../service/offre.service';
import { HttpClientModule } from '@angular/common/http';
import { AcheterEnergieComponent } from '../acheter-energie/acheter-energie.component';
import { FormsModule } from '@angular/forms';
import { UserResponseModel } from '../../user/model/user-response.model';

@Component({
  selector: 'app-offre-list',
  standalone: true,
  imports: [CommonModule, MatDialogModule, HttpClientModule, FormsModule],
  providers: [OffreService],
  templateUrl: './offre-list.component.html',
  styleUrl: './offre-list.component.css'
})
export class OffreListComponent {
  offers: Offre[] = [];
  filteredOffers: Offre[] = [];
  offersPerPage = 6;
  currentPage = 1;
  
  // Search and filter variables
  searchTerm: string = '';
  selectedType: string = '';
  selectedEnergy: string = '';
  selectedPriceOrder: string = '';
  
  currentUser!: UserResponseModel | null; 
  

  constructor(private dialog: MatDialog, private offreservice: OffreService) { }

  ngOnInit(): void {
    const storedUserJson = localStorage.getItem('currentUser');
    if (storedUserJson) {
      this.currentUser = JSON.parse(storedUserJson) as UserResponseModel;
      console.log('Current user:', this.currentUser.id);
    }
    this.getOffers();
  }

  getOffers(): void {
    this.offreservice.getOffers().subscribe(
      (data: Offre[]) => {
        console.log('response');
        console.log(data);
        this.offers = data;
        this.offers = data.filter(offer => offer.status !== false);
        this.applyFilters(); // Apply filters when data is loaded
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
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

  // Search and filter methods
  search(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.currentPage = 1; // Reset to first page when searching
    this.applyFilters();
  }

  applyTypeFilter(event: Event): void {
    this.selectedType = (event.target as HTMLSelectElement).value;
    this.currentPage = 1; // Reset to first page when filtering
    this.applyFilters();
  }

  applyEnergyFilter(event: Event): void {
    this.selectedEnergy = (event.target as HTMLSelectElement).value;
    this.currentPage = 1; // Reset to first page when filtering
    this.applyFilters();
  }

  applyPriceFilter(event: Event): void {
    this.selectedPriceOrder = (event.target as HTMLSelectElement).value;
    this.currentPage = 1; // Reset to first page when filtering
    this.applyFilters();
  }

  applyFilters(): void {
    // Start with all offers
    let result = [...this.offers];
    
    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      result = result.filter(offer => 
        offer.user.nom.toLowerCase().includes(searchLower) ||
        offer.user.prenom.toLowerCase().includes(searchLower) ||
        offer.type.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply type filter
    if (this.selectedType) {
      result = result.filter(offer => 
        offer.user.userStatus.toLowerCase() === this.selectedType.toLowerCase()
      );
    }
    
    // Apply energy filter
    if (this.selectedEnergy) {
      result = result.filter(offer => 
        offer.type.toLowerCase() === this.selectedEnergy.toLowerCase()
      );
    }
    
    // Apply price sorting
    if (this.selectedPriceOrder) {
      result.sort((a, b) => {
        if (this.selectedPriceOrder === 'asc') {
          return a.prixKw - b.prixKw;
        } else {
          return b.prixKw - a.prixKw;
        }
      });
    }
    
    this.filteredOffers = result;
  }
  
  get paginatedOffers(): Offre[] {
    const startIndex = (this.currentPage - 1) * this.offersPerPage;
    const endIndex = startIndex + this.offersPerPage;
    return this.filteredOffers.slice(startIndex, endIndex);
  }
  
  get totalPages(): number {
    return Math.ceil(this.filteredOffers.length / this.offersPerPage);
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
    if (this.filteredOffers.length === 0) return 0;
    const totalPrice = this.filteredOffers.reduce((sum, offer) => sum + offer.prixKw, 0);
    return Number((totalPrice / this.filteredOffers.length).toFixed(3));
  }
  
  offreActives(): number {
    if (this.filteredOffers.length === 0) return 0;
    return this.filteredOffers.filter((offer) => offer.status === true).length;
  }
  
  quantiteTotalDisponible(): number {
    if (this.filteredOffers.length === 0) return 0;
    // Filtrer les offres avec le statut "Disponible" et sommer leurs quantités
    return this.filteredOffers
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