import { Departement } from "./departement.model";

export class Site {
    public id: number = 0;
    public site: string = '';
    public adresse: string = '';
    public tel: string = '';
    public fax: string = '';
    public departements: Departement[] = [];
}