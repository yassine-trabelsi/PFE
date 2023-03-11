import { Département } from "./département.model";

export class Site {
    constructor(
        public id: number,
        public site: string = '',
        public adresse: string = '',
        public tel: string = '',
        public fax: string = '',
        public départements: Département[] = []
    ) { }
}