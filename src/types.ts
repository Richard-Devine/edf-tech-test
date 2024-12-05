export type bookSellersConfigKeys =
    'waterstones' |
    'exampleBookSeller'

export interface BookSellersDetails {
    baseRoute: string;
    paths: {
        author: {
            path: string;
            format: string;
            queryParams: {
                author: string;
                limit?: string;
                format?: string;
            },
            apiResponseMapper: (data: any) => BookObject[]
        },
    },
}

export interface BookSellerExampleApiResponse {
    book: {
        title: string;
        author: string;
        isbn: number;
    },
    stock: {
        quantity: number;
        price: number;
    }
}

export interface WaterstonesApiResponse {
    name: string;
    writer: string;
    isbn: number;
    stock: {
        amount: number;
        price: number;
    }
}

export interface BookObject {
    title: string;
    author: string;
    isbn: number;
    quantity: number;
    price: number;
}
