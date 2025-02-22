export interface EmailTracking {
    email: string;
    emailType: string;
    ip: string;
    userAgent: string;
}

export interface TrackEmailQuery {
    email?: string;
    emailType?: string;
    api_key?: string;
    
}