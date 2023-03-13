import { Component, OnInit } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { Poste } from 'src/app/models/poste.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { DepartementService } from 'src/app/services/departement.service';
import { PosteService } from 'src/app/services/poste.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  utilisateurs!: Utilisateur[];
  postes: Poste[] = [];
  departements: Departement[] = [];
  utilisateur: Utilisateur = new Utilisateur();
  isEditMode = false;
  isAddMode = false;
  searchText!: string;

  constructor(private utilisateurService: UtilisateurService, private posteService: PosteService, private departementService: DepartementService) { }

  ngOnInit() {
    this.getUtilisateurs();
    this.getPostes();
    this.getDepartements();
  }

  getUtilisateurs(): void {
    this.utilisateurService.getUtilisateurs()
      .subscribe(utilisateurs => {
        this.utilisateurs = utilisateurs.filter(utilisateur => !utilisateur.supprimé);
      });
  }

  getDepartements(): void {
    this.departementService.getDepartements()
      .subscribe(departements => this.departements = departements);
  }

  getPostes(): void {
    this.posteService.getPostes()
      .subscribe(postes => this.postes = postes);
  }
  deleteUtilisateur(utilisateur: Utilisateur): void {
    if (confirm(`Etes-vous sûr que vous voulez supprimer cet Utilisateur ?`)) {
      this.utilisateurService.deleteUtilisateur(utilisateur.id).subscribe(() => {
        const index = this.utilisateurs.findIndex(p => p.id === utilisateur.id);
        this.utilisateurs.splice(index, 1);
      });
    }
  }

  addUtilisateur(utilisateur: Utilisateur): void {
    if (!isNaN(utilisateur.posteId) && typeof utilisateur.posteId === 'number') {
      utilisateur.posteId = parseInt(String(utilisateur.posteId), 10);
    } else {
      console.log('posteId is not a valid number');
    }
    if (!isNaN(utilisateur.départementId) && typeof utilisateur.départementId === 'number') {
      utilisateur.départementId = parseInt(String(utilisateur.départementId), 10);
    } else {
      console.log('posteId is not a valid number');
    }
    console.log(utilisateur);
    utilisateur.posteId = parseInt(String(utilisateur.posteId), 10);
    utilisateur.départementId = parseInt(String(utilisateur.départementId), 10);
    this.utilisateurService.addUtilisateur(utilisateur)
      .subscribe(utilisateur => {
        this.utilisateurs.push(utilisateur);
      });
    this.isAddMode = false;
  }

  editUtilisateur(utilisateur: Utilisateur): void {
    this.utilisateur = { ...utilisateur };
    this.isEditMode = true;
    this.isAddMode = false;
  }

  updateUtilisateur(): void {
    this.utilisateur.posteId = parseInt(String(this.utilisateur.posteId), 10);
    this.utilisateur.départementId = parseInt(String(this.utilisateur.départementId), 10);
    this.utilisateurService.updateUtilisateur(this.utilisateur)
      .subscribe(() => {
        const index = this.utilisateurs.findIndex(p => p.id === this.utilisateur.id);
        this.utilisateurs[index] = this.utilisateur;
        this.utilisateur = new Utilisateur();
        this.isEditMode = false;
      });
  }

  showAddForm() {
    this.isAddMode = true;
    this.isEditMode = false;
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.isAddMode = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.utilisateur.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
