import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  sites!: Site[];
  site: Site = new Site();
  isEditMode = false;
  isAddMode = false;

  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.getSites();
  }

  getSites(): void {
    this.siteService.getSites()
      .subscribe(sites => this.sites = sites);
  }

  deleteSite(site: Site): void {
    if (confirm(`Etes-vous sûr que vous voulez supprimer Site : ${site.site}?`)) {
      this.siteService.deleteSite(site.id).subscribe(() => {
        const index = this.sites.findIndex(u => u.id === site.id);
        this.sites.splice(index, 1);
      });
    }
  }

  addSite(site: Site): void {
    this.siteService.addSite(site)
      .subscribe(site => {
        this.sites.push(site);
      });
    this.isAddMode = false;
  }

  editSite(site: Site): void {
    this.site = { ...site };
    this.isEditMode = true;
    this.isAddMode = false;
  }

  updateSite(): void {
    this.siteService.updateSite(this.site)
      .subscribe(() => {
        const index = this.sites.findIndex(s => s.id === this.site.id);
        this.sites[index] = this.site;
        this.site = new Site();
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
}

