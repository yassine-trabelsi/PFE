import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departement } from 'src/app/models/departement.model';
import { Site } from 'src/app/models/site.model';
import { DepartementService } from 'src/app/services/departement.service';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

  departements!: Departement[];
  sites: Site[] = [];
  departement: Departement = new Departement();
  isEditMode = false;
  isAddMode = false;

  constructor(private departementService: DepartementService, private siteService: SiteService) { }

  ngOnInit() {
    this.getDepartements();
    this.getSites();
  }

  getSites(): void {
    this.siteService.getSites()
      .subscribe(sites => this.sites = sites);
  }

  getDepartements(): void {
    this.departementService.getDepartements()
      .subscribe(departements => this.departements = departements);
  }

  deleteDepartement(departement: Departement): void {
    if (confirm(`Etes-vous sûr que vous voulez supprimer le département : ${departement.nom}?`)) {
      this.departementService.deleteDepartement(departement.id).subscribe(() => {
        const index = this.departements.findIndex(u => u.id === departement.id);
        this.departements.splice(index, 1);
      });
    }
  }

  addDepartement(departement: Departement): void {
    if (!departement) {
      return;
    }

    // Convert the siteId string value to an integer
    departement.siteId = parseInt(String(departement.siteId), 10);

    this.departementService.addDepartement(departement)
      .subscribe(departement => {
        this.departements.push(departement);
      });
    this.isAddMode = false;
  }



  editDepartement(departement: Departement): void {
    this.departement = { ...departement };
    this.isEditMode = true;
    this.isAddMode = false;
  }

  updateDepartement(): void {
    this.departement.siteId = parseInt(String(this.departement.siteId), 10);
    this.departementService.updateDepartement(this.departement)
      .subscribe(() => {
        const index = this.departements.findIndex(d => d.id === this.departement.id);
        this.departements[index] = this.departement;
        this.departement = new Departement();
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

  getSiteNom(siteId: number): string {
    const site = this.sites.find(s => s.id === siteId);
    return site ? site.site : '';
  }
}
