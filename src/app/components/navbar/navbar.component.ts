import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public users: any = [];
  private jwtHelper = new JwtHelperService();
  private id: string = '';
  public prenom: string = '';
  public role: string = '';

  constructor(private router: Router, private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.id = decodedToken.nameid;
      this.prenom = decodedToken.unique_name;
      this.role = decodedToken.role;
    }
  }

  logout() {
    this.auth.signOut();
  }

  editProfile() {
    this.router.navigate(['/profile', this.id]);
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }
}
