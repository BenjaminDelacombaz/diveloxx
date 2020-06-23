export interface DiverInterface {
    firstname: string
    lastname: string
    email: string
    phone: string
    birthdate: firebase.firestore.Timestamp
}
export class Diver implements DiverInterface {
    public firstname: string
    public lastname: string
    public email: string
    public phone: string
    public birthdate: firebase.firestore.Timestamp

    constructor(diver: DiverInterface) {
        this.firstname = diver.firstname
        this.lastname = diver.lastname
        this.email = diver.email
        this.phone = diver.phone
        this.birthdate = diver.birthdate
    }

    toString(): string {
        return `${this.firstname} ${this.lastname}`
    }
}