import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users: any = [];
  constructor(private router: Router, private auth: AuthService, private api: ApiService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.signOut();
  }
}
