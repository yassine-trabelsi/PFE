import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl = 'https://localhost:44347/api/Utilisateur';

  constructor(private http: HttpClient) { }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }

  getUtilisateur(id: number): Observable<Utilisateur> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Utilisateur>(url);
  }

  addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, utilisateur);
  }

  updateUtilisateur(utilisateur: Utilisateur): Observable<any> {
    const url = `${this.apiUrl}/${utilisateur.id}`;
    return this.http.put(url, utilisateur);
  }

  deleteUtilisateur(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
