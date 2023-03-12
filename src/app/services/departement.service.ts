import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private apiUrl = 'https://localhost:44347/api/département';

  constructor(private http: HttpClient) { }

  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.apiUrl);
  }

  getDepartement(id: number): Observable<Departement> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Departement>(url);
  }

  addDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.apiUrl, departement);
  }

  updateDepartement(departement: Departement): Observable<any> {
    const url = `${this.apiUrl}/${departement.id}`;
    return this.http.put(url, departement);
  }

  deleteDepartement(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}