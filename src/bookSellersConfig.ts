import {BookSellerExampleApiResponse, bookSellersConfigKeys, BookSellersDetails, WaterstonesApiResponse} from "./types";

export const bookSellersConfig: Record<bookSellersConfigKeys, BookSellersDetails> = {
    waterstones: {
        baseRoute: 'https://api.waterstones.com/',
        paths: {
            author: {
                path: 'writer/',
                format: 'json',
                queryParams: {
                    author: 'writer',
                    limit: 'limit',
                    format: 'format'
                },
                apiResponseMapper: (data: WaterstonesApiResponse[]) => data.map((item: WaterstonesApiResponse) => ({
                    title: item.name,
                    author: item.writer,
                    isbn: item.isbn,
                    quantity: item.stock.amount,
                    price: item.stock.price,
                }))
            }
        }
    },
    exampleBookSeller: {
        baseRoute: 'http://api.book-seller-example.com/',
        paths: {
            author: {
                path: 'by-author/',
                format: 'xml',
                queryParams: {
                    author: 'q',
                    limit: 'limit',
                    format: 'format',
                },
                apiResponseMapper: (data: BookSellerExampleApiResponse[]) => data.map((item: BookSellerExampleApiResponse) => ({
                    title: item.book.title,
                    author: item.book.author,
                    isbn: item.book.isbn,
                    quantity: item.stock.quantity,
                    price: item.stock.price,
                }))
            }
        }
    }
}
