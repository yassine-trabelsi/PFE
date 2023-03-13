import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44347/api/Login';

  constructor(private http: HttpClient) { }

  getProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getProfile/${id}`);
  }

  editProfile(id: number, updatedUser: any) {
    return this.http.put(`${this.apiUrl}/editProfile/${id}`, updatedUser);
  }
}
