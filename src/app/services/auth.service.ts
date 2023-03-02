import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:44347/api/Utilisateur/"
  constructor(private http: HttpClient) { }
  login(utilisateurObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, utilisateurObj);
  }
}
