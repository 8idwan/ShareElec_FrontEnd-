import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offre } from '../model/offre.model';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  baseUrl = 'http://localhost:5240';

  constructor(private http : HttpClient) { }


  getOffers=():Observable<Offre[]>=>{
    return this.http.get<Offre[]>(`${this.baseUrl}/api/Offre/offres/`, )

  }

  createJob=(Job : Object) : Observable<Offre>=>{
    const options = {
      headers: new HttpHeaders(
        { 'content-type': 'application/json'}
        )
    };
    return(this.http.post<Offre>(
      `${this.baseUrl}/api/Offre/add/`,
      Offre,
      options));
  }

  getOffreById = (id : any) : Observable<Offre>=> {
    return this.http.get<Offre>(`${this.baseUrl}/api/Offre/offres/${id}`)
  }

  deleteOffre = (id : number) : Observable<Object> =>{
    return this.http.delete(`${this.baseUrl}/api/Offre/delete/${id}`)
  }

  
}
