import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm!: FormGroup;
  id!: number;
  public users: any = [];
  private jwtHelper = new JwtHelperService();
  public prenom: string = '';
  public matricule: string = '';
  public tel: string = '';
  public role: string = '';
  public email: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

      this.profileForm = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        motDePasse: ['', Validators.required],
        matricule: ['', Validators.required],
        tel: ['', Validators.required],
        role: ['', Validators.required],
      });

      this.userService.getUser(this.id).subscribe(data => {
        this.profileForm.setValue({
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          motDePasse: data.motDePasse,
          matricule: data.matricule,
          tel: data.tel,
          role: data.role,
        });
      });
    });

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.id = decodedToken.nameid;
      this.prenom = decodedToken.unique_name;
      this.matricule = decodedToken.family_name;
      this.tel = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'];
      this.role = decodedToken.role;
      this.email = decodedToken.email;
    }
  }

  home() {
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    this.userService.editUser(this.id, this.profileForm.value).subscribe(
      res => {
        alert('Profile updated successfully');
        this.router.navigate(['/profile', this.id]);
      },
      error => {
        console.log(error);
      }
    );
  }
}