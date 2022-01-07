export interface Mail {
    sender: string;
    receivers: string[];
    subject: string;
    body: string;
    date : Date;
    type? : string;
}