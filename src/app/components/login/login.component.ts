import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Matricule: ['', Validators.required],
      MotDePasse: ['', Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            //alert(res.message)
            this.loginForm.reset();
            this.auth.storeToken(res.token);
            this.router.navigate(['home']);
          },
          error: (err) => {
            alert(err?.error.message)
          }
        })
    } else {
      this.validateAllFormFields(this.loginForm);
      alert("Formulaire invalide !")
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }
  confirmToSend() {
    const buttonRef = document.getElementById("closeBtn");
    buttonRef?.click();
  }
}
