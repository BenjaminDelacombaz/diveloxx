import { DiveSite } from './dive-site.model'
import { Diver } from './diver.model'

export interface DiveInterface {
    id: string
    comments: string
    date: firebase.firestore.Timestamp
    depth: number
    dive_site: DiveSite
    duration: number
    temperature: number
    visibility: number
    divers: Diver[]
    owner_id: string
}
export class Dive implements DiveInterface {
    public id: string
    public comments: string
    public date: firebase.firestore.Timestamp
    public depth: number
    public dive_site: DiveSite
    public duration: number
    public temperature: number
    public visibility: number
    public divers: Diver[]
    public owner_id: string

    constructor(dive: DiveInterface) {
        this.id = dive.id
        this.comments = dive.comments
        this.date = dive.date
        this.depth = dive.depth
        this.dive_site = dive.dive_site
        this.duration = dive.duration
        this.temperature = dive.temperature
        this.visibility = dive.visibility
        this.divers = dive.divers
        this.owner_id = dive.owner_id
    }
}