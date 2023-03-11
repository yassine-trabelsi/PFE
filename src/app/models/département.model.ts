import { Site } from "./site.model";
import { Utilisateur } from "./utilisateur.model";

export class Département {
    id: number = 0;
    nom: string = '';
    chefD: string = '';
    utilisateurs: Utilisateur[] = [];
    siteId: number = 0;
    site: Site = new Site(0, '', '', '', '', []);
}
