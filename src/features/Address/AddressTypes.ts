export interface AddresRequest {
    fullName: string;
    phoneNumber: string;
    country: string;
    state: string;
    city?: string;
    province?: string;
    district?: string; 
    sector?: string; 
    addressLine1?: string;
    postalCode?: string;
}