import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poste } from '../models/poste.model';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

  private apiUrl = 'https://localhost:44347/api/Poste';

  constructor(private http: HttpClient) { }

  getPostes(): Observable<Poste[]> {
    return this.http.get<Poste[]>(this.apiUrl);
  }

  getPoste(id: number): Observable<Poste> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Poste>(url);
  }

  addPoste(poste: Poste): Observable<Poste> {
    return this.http.post<Poste>(this.apiUrl, poste);
  }

  updatePoste(poste: Poste): Observable<any> {
    const url = `${this.apiUrl}/${poste.id}`;
    return this.http.put(url, poste);
  }

  deletePoste(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
