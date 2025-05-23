import { Component } from '@angular/core';
import { Offre } from '../model/offre.model';
import { MatDialog } from '@angular/material/dialog';
import { AddOffreComponent } from '../add-offre/add-offre.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offre-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offre-list.component.html',
  styleUrl: './offre-list.component.css'
})
export class OffreListComponent {
  offers: Offre[] = [
    new Offre(
      '1',
      'EDF Énergies',
      'Professionnel',
      5000,
      '20-02-2025',
      'Éolien',
      0.12,
      true,
      'Disponible'
    ),
    new Offre(
      '1',
      'EDF Énergies',
      'Professionnel',
      5000,
      '20-02-2025',
      'Éolien',
      0.12,
      true,
      'Disponible'
    ),
    new Offre(
      '1',
      'EDF Énergies',
      'Professionnel',
      5000,
      '20-02-2025',
      'Éolien',
      0.12,
      true,
      'Disponible'
    ),
    new Offre(
      '1',
      'EDF Énergies',
      'Professionnel',
      5000,
      '20-02-2025',
      'Éolien',
      0.12,
      true,
      'Disponible'
    ),
    new Offre(
      '1',
      'EDF Énergies',
      'Professionnel',
      5000,
      '20-02-2025',
      'Éolien',
      0.12,
      true,
      'Disponible'
    ),
    new Offre(
      '1',
      'EDF Énergies',
      'Professionnel',
      5000,
      '20-02-2025',
      'Éolien',
      0.12,
      true,
      'Disponible'
    ),
    new Offre(
      '1',
      'EDF Énergies',
      'Professionnel',
      5000,
      '20-02-2025',
      'Éolien',
      0.12,
      true,
      'Disponible'
    ),
    new Offre(
      '1',
      'EDF Énergies',
      'Professionnel',
      1000,
      '20-02-2025',
      'Éolien',
      0.12,
      true,
      'Disponible'
    ),
    new Offre(
      '1',
      'EDF Énergies',
      'Professionnel',
      1000,
      '20-02-2025',
      'Éolien',
      0.12,
      true,
      'Indisponible'
    ),
  ];

  offersPerPage = 6;
  currentPage = 1;
  constructor(private dialog:MatDialog) { }
  opendiag(): void {
    console.log("ll")
    this.dialog.open(AddOffreComponent);

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
    if (
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
    return this.offers.filter((offer) => offer.status === 'Disponible').length;

  }

  quantiteTotalDisponible(): number {
    if (this.offers.length === 0) return 0;

    // Filtrer les offres avec le statut "Disponible" et sommer leurs quantités
    return this.offers
      .filter((offer) => offer.status === 'Disponible') // Garder seulement les offres disponibles
      .reduce((total, offer) => total + (offer.quantite || 0), 0); // Somme des quantités
  }

}