import { Site } from "./site.model";
import { Utilisateur } from "./utilisateur.model";

export class Departement {
    id: number = 0;
    nom: string = '';
    chefD: string = '';
    utilisateurs: Utilisateur[] = [];
    siteId: number = 0;
    site?: Site; // define the "site" property as a "Site" object
}
