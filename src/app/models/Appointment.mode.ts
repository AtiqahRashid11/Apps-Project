import { Time } from "@angular/common";
import { DatetimeCustomEvent } from "@ionic/angular";

export interface Post {
    name: string;
    email: string;
    Address: string;
    eventType: string;
    date: Date;
    time: Time;
    message: string;
 }