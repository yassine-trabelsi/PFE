import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users: any = [];
  private jwtHelper = new JwtHelperService();
  private id: string = '';

  constructor(private router: Router, private auth: AuthService, private api: ApiService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.id = decodedToken.nameid;
    }
  }

  logOut() {
    this.auth.signOut();
  }

  editProfile() {
    this.router.navigate(['/edit-profile', this.id]);
  }
}