import getBooksByAuthor from "../src/BookSearchApiClient";
import {buildAuthorQueryParams} from "../src/queryParams";
import {BookSellerExampleApiResponse, WaterstonesApiResponse} from "../src/types";

jest.mock('../src/bookSellersConfig', () => ({
    ...jest.requireActual('../src/bookSellersConfig'),
    bookSellersConfig: {
        waterstones: {
            baseRoute: 'https://api.waterstones.com/',
            paths: {
                author: {
                    path: 'writer/',
                    format: 'json',
                    queryParams: {
                        author: 'writer',
                        format: 'format'
                    },
                    apiResponseMapper: (data: WaterstonesApiResponse[]) => data.map((item) => ({
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
                    apiResponseMapper: (data: BookSellerExampleApiResponse[]) => data.map((item) => ({
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
}))

describe("queryParams", () => {
    it('should out query params based on the config queryParams for the respective keys', () => {
        const waterstoneQueryParams = buildAuthorQueryParams('waterstones', 'C.S. Lewis', 10);
        const exampleBooksellerQueryParams = buildAuthorQueryParams('exampleBookSeller', 'Shakespeare', 12);
        expect(waterstoneQueryParams.toString()).toBe("writer=C.S.+Lewis&format=json");
        expect(exampleBooksellerQueryParams.toString()).toBe("q=Shakespeare&format=xml&limit=12");
    });
});

describe("getBooksByAuthor", () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => {
            const mockResponse = [{name: 'The Lion, The Witch & The Wardrobe', writer: 'C.S. Lewis', isbn: '2312516', stock: {amount: 5, price: 8}}]
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve(mockResponse)
            })
        }) as jest.Mock;
    });

    it('should return an array of standard objects with book information on successful api response regardless of book seller', async () => {
        const jsonBookInformation = await getBooksByAuthor('waterstones', 'C.S. Lewis', 10);
        expect(jsonBookInformation).toEqual([{title: 'The Lion, The Witch & The Wardrobe', author: 'C.S. Lewis', isbn: '2312516', quantity: 5, price: 8}])
    });
});