import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:5240/api/payments'; // Remplacez PORT par votre port

  constructor(private http: HttpClient) { }

  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-payment-intent`, { Amount: amount });
  }
}
