export interface CurrencyResponse {
    id: string;
    createdAt: string;
    updatedAt: string;
    code: string;
    name: string;
    symbol: string;
    symbolPosition: string;
    decimalPlaces: number;
    decimalSeparator: string;
    thousandsSeparator: string;
    isBase: boolean;
    isActive: boolean;
    isDefault: boolean
}