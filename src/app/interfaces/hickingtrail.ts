import { Community } from "./community"
import { Municipality } from "./municipality"
import { Province } from "./province"

export interface Hickingtrail {
    id: number
    distance_kms: number
    time_minutes: number
    community: Community[]
    province: Province[]
    municipality: Municipality[]
    origin_name: string
    origin_lat: number
    origin_lng: number
    destination_name: string
    destination_lat: number
    destination_lng: number
    difficulty_level: string
  }