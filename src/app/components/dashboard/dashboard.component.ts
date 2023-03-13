import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router, private auth: AuthService) { }

  private id: string = '';
  status = false;
  private jwtHelper = new JwtHelperService();

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.id = decodedToken.nameid;
    }
  }

  addToggle() {
    this.status = !this.status;
  }

  logout() {
    this.auth.signOut();
  }

  editProfile() {
    this.router.navigate(['/profile', this.id]);
  }

  Utilisateurs() {
    this.router.navigate(['/utilisateur']);
  }

}
