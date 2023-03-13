import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { PosteComponent } from './components/poste/poste.component';
import { SiteComponent } from './components/site/site.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ResetComponent } from './components/reset/reset.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DepartementComponent } from './components/departement/departement.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ResetComponent },
  { path: 'site', component: SiteComponent },
  { path: 'dept', component: DepartementComponent },
  { path: 'poste', component: PosteComponent },
  { path: 'utilisateur', component: UtilisateurComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
