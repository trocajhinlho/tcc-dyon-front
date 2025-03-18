import { EventCardInfo, EventInfo, EventPeriod, EventSearchQuery } from "../types/interface";
import { genericRequest } from "./axios";

export function fetchEventData(publicId: string) {
    return genericRequest<EventInfo>({
        url: "/eventos/" + publicId
    });
}

export function fetchEventPeriodsData(eventId: string) {
    return genericRequest<EventPeriod[]>({
        url: "/eventos/" + eventId + "/periodos"
    });
}

export function fetchEventSearch(searchQuery: string) {
    return genericRequest<EventCardInfo[]>({
        url: "/eventos?" + searchQuery 
    });
}