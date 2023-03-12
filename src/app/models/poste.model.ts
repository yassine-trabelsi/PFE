import { Utilisateur } from "./utilisateur.model";

export class Poste {
    id: number = 0;
    numéro: number = 0;
    utilisateurId: number = 0;
    utilisateur!: Utilisateur;
}