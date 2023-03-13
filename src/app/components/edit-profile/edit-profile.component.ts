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
  user: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.userService.getProfile(this.id).subscribe((data: any) => {
      this.user = data;
      this.profileForm.patchValue({
        nom: this.user.nom,
        prenom: this.user.prenom,
        matricule: this.user.matricule,
        email: this.user.email,
        motDePasse: this.user.motDePasse,
        tel: this.user.tel,
        image: this.user.image
      });
    });

    this.profileForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      matricule: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      tel: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.userService.editProfile(this.id, this.profileForm.value)
      .subscribe(() => {
        window.location.reload();
      });
  }

  home() {
    this.router.navigate(['/home']);
  }
}
