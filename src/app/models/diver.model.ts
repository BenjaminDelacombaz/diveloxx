export interface DiverInterface {
    name: string
    email: string
    phone: string
    birthdate: firebase.firestore.Timestamp
}
export class Diver implements DiverInterface {
    public name: string
    public email: string
    public phone: string
    public birthdate: firebase.firestore.Timestamp

    constructor(diver: DiverInterface) {
        this.name = diver.name
        this.email = diver.email
        this.phone = diver.phone
        this.birthdate = diver.birthdate
    }
}