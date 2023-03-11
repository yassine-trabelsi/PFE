import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from 'src/app/models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private apiUrl = 'https://localhost:44347/api/Site/';

  constructor(private http: HttpClient) { }

  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl);
  }

  getSite(id: number): Observable<Site> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<Site>(url);
  }

  addSite(site: Site): Observable<Site> {
    return this.http.post<Site>(this.apiUrl, site);
  }

  updateSite(site: Site): Observable<any> {
    const url = `${this.apiUrl}${site.id}`;
    return this.http.put(url, site);
  }

  deleteSite(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    return this.http.delete(url);
  }
}