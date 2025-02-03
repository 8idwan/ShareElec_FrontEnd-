import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequestModel } from '../model/user-request.model';
import { catchError } from 'rxjs/operators';
import { UserResponseModel } from '../model/user-response.model';
import { LoginRequestModel } from '../model/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5242/api/user';

  constructor(private http: HttpClient) {}

  // ✅ Changed to match backend endpoint path
  signUp(userData: UserRequestModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log('Sending signup request:', userData); // Debug log

    return this.http.post(`${this.baseUrl}/sign-in`, userData, { headers })
      .pipe(
        catchError(error => {
          console.error('Signup error details:', error);
          throw error;
        })
      );
  }
  

  // ✅ Changed to match backend endpoint path
  getUserInfo(id: number): Observable<UserResponseModel> {
    return this.http.get<UserResponseModel>(`${this.baseUrl}/${id}`);
  }

  // ✅ Changed to match backend endpoint path
  login(credentials: LoginRequestModel): Observable<{ token: string; utilisateur: UserResponseModel }> {
    return this.http.post<{ token: string; utilisateur: UserResponseModel }>(`${this.baseUrl}/login`, credentials);
  }

  // ✅ Added to match backend endpoint
  verifyEmail(email: string, code: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/veriferEmail`, { email, code });
  }
}