import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm!: FormGroup;
  id!: number;

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
        tel: ['', Validators.required],
      });

      this.userService.getUser(this.id).subscribe(data => {
        this.profileForm.setValue({
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          motDePasse: data.motDePasse,
          tel: data.tel
        });
      });
    });
  }

  home() {
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    this.userService.editUser(this.id, this.profileForm.value).subscribe(
      res => {
        console.log('Profile updated successfully');
        this.router.navigate(['/edit-profile', this.id]);
      },
      error => {
        console.log(error);
      }
    );
  }
}