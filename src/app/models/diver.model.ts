export interface DiverInterface {
    id: string
    firstname: string
    lastname: string
    email: string
    phone: string
    birthdate: firebase.firestore.Timestamp
    uid: string
    owner_id: string
}
export class Diver implements DiverInterface {
    public id: string
    public firstname: string
    public lastname: string
    public email: string
    public phone: string
    public birthdate: firebase.firestore.Timestamp
    public uid: string
    public owner_id: string

    constructor(diver: DiverInterface) {
        this.id = diver.id
        this.firstname = diver.firstname
        this.lastname = diver.lastname
        this.email = diver.email
        this.phone = diver.phone
        this.birthdate = diver.birthdate
        this.uid = diver.uid
        this.owner_id = diver.owner_id
    }

    toString(): string {
        return `${this.firstname} ${this.lastname}`
    }

    canUpdate(obj: Diver): boolean {
        return obj.owner_id === this.id
    }
}