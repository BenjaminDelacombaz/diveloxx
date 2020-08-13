import { DiveSite } from './dive-site.model'
import { Diver } from './diver.model'
import { Observable } from 'rxjs'

export interface DiveInterface {
    id: string
    comments: string
    date: firebase.firestore.Timestamp
    depth: number
    dive_site_id: string
    duration: number
    temperature: number
    visibility: number
    divers_id: string[]
    owner_id: string
    accepted: boolean
}
export class Dive implements DiveInterface {
    public id: string
    public comments: string
    public date: firebase.firestore.Timestamp
    public depth: number
    public dive_site_id: string
    public duration: number
    public temperature: number
    public visibility: number
    public divers_id: string[]
    public owner_id: string
    public dive_site: Observable<DiveSite>
    public divers: Observable<Diver[]>
    public accepted: boolean

    constructor(dive: DiveInterface) {
        this.id = dive.id
        this.comments = dive.comments
        this.date = dive.date
        this.depth = dive.depth
        this.dive_site_id = dive.dive_site_id
        this.duration = dive.duration
        this.temperature = dive.temperature
        this.visibility = dive.visibility
        this.divers_id = dive.divers_id
        this.owner_id = dive.owner_id
        this.accepted = dive.accepted
    }
}