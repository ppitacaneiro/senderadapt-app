import { Step } from "./step";

export interface HickingtrailRegister {
    user_id: number;
    distance_kms: number;
    time_minutes: number;
    community_id: number;
    province_id: number;
    municipality_id: number;
    origin_name: string;
    origin_lat: number;
    origin_lng: number;
    destination_name: string;
    destination_lat: number;
    destination_lng: number;
    difficulty_level: string;
    steps: Step[];
}