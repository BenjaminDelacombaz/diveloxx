export interface DiverInterface {
    firstname: string
    lastname: string
    email: string
    phone: string
    birthdate: firebase.firestore.Timestamp
    uid: string
}
export class Diver implements DiverInterface {
    public firstname: string
    public lastname: string
    public email: string
    public phone: string
    public birthdate: firebase.firestore.Timestamp
    public uid: string

    constructor(diver: DiverInterface) {
        this.firstname = diver.firstname
        this.lastname = diver.lastname
        this.email = diver.email
        this.phone = diver.phone
        this.birthdate = diver.birthdate
        this.uid = diver.uid
    }

    toString(): string {
        return `${this.firstname} ${this.lastname}`
    }
}