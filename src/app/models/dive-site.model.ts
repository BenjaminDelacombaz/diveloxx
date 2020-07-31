export interface DiveSiteInterface {
    id: string
    description: string
    difficulty: number
    location: firebase.firestore.GeoPoint
    name: string
    water_type: number
    owner_id: string
}
export class DiveSite implements DiveSiteInterface {
    public id: string
    public description: string
    public difficulty: number
    public location: firebase.firestore.GeoPoint
    public name: string
    public water_type: number
    public owner_id: string

    constructor(diveSite: DiveSiteInterface) {
        this.id = diveSite.id
        this.description = diveSite.description
        this.difficulty = diveSite.difficulty
        this.location = diveSite.location
        this.name = diveSite.name
        this.owner_id = diveSite.owner_id
    }

    toString(): string {
        return this.name
    }
}