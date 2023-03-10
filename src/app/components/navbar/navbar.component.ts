import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
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

  constructor(private router: Router, private auth: AuthService, private api: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.id = decodedToken.nameid;
      this.prenom = decodedToken.unique_name;
    }
  }

  logout() {
    this.auth.signOut();
  }

  editProfile() {
    this.router.navigate(['/profile', this.id]);
  }

}