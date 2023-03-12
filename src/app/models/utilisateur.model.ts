export class Utilisateur {
    id: number = 0;
    nom: string = '';
    prenom: string = '';
    matricule: string = '';
    dateEmbauche: Date = new Date();
    email: string = '';
    motDePasse: string = '';
    tel: string = '';
    dateNaissance: Date = new Date();
    role: string = '';
    token: string = '';
    resetPasswordToken: string = '';
    resetPasswordExpiry: Date = new Date();
    image: string = '';
    salaire: number = 0;
    posteId: number = 0;
    départementId: number = 0;
}
