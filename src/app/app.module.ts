import { TokenInterceptor } from './interceptors/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ResetComponent } from './components/reset/reset.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SiteComponent } from './components/site/site.component';
import { DepartementComponent } from './components/departement/departement.component';
import { PosteComponent } from './components/poste/poste.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ResetComponent,
    EditProfileComponent,
    NavbarComponent,
    SiteComponent,
    DepartementComponent,
    PosteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
