import { Component, OnInit } from '@angular/core';
import { Poste } from 'src/app/models/poste.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { PosteService } from 'src/app/services/poste.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {

  postes!: Poste[];
  poste: Poste = new Poste();
  utilisateurs: Utilisateur[] = [];
  isEditMode = false;
  isAddMode = false;

  constructor(private posteService: PosteService, private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.getPostes();
    this.getUtilisateurs();
  }

  getPostes(): void {
    this.posteService.getPostes()
      .subscribe(postes => this.postes = postes);
  }

  getUtilisateurs(): void {
    this.utilisateurService.getUtilisateurs()
      .subscribe(utilisateurs => this.utilisateurs = utilisateurs);
  }

  deletePoste(poste: Poste): void {
    if (confirm(`Etes-vous sûr que vous voulez supprimer ce Poste ?`)) {
      this.posteService.deletePoste(poste.id).subscribe(() => {
        const index = this.postes.findIndex(p => p.id === poste.id);
        this.postes.splice(index, 1);
      });
    }
  }

  addPoste(poste: Poste): void {
    poste.utilisateurId = parseInt(String(poste.utilisateurId), 10);
    this.posteService.addPoste(poste)
      .subscribe(poste => {
        this.postes.push(poste);
      });
    this.isAddMode = false;
  }

  editPoste(poste: Poste): void {
    this.poste = { ...poste };
    this.isEditMode = true;
    this.isAddMode = false;
  }

  updatePoste(): void {
    this.poste.utilisateurId = parseInt(String(this.poste.utilisateurId), 10);
    this.posteService.updatePoste(this.poste)
      .subscribe(() => {
        const index = this.postes.findIndex(p => p.id === this.poste.id);
        this.postes[index] = this.poste;
        this.poste = new Poste();
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

  getUtilisateurNom(utilisateurId: number): string {
    const utilisateur = this.utilisateurs.find(s => s.id === utilisateurId);
    return utilisateur ? utilisateur.matricule : '';
  }
}
