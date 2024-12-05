import {Parser} from 'xml2js';
import {bookSellersConfig} from './bookSellersConfig'
import {buildAuthorQueryParams} from "./queryParams";
import {BookObject, bookSellersConfigKeys} from "./types";


const getBooksByAuthor = async (bookSeller: bookSellersConfigKeys, author: string, limit: number | null = null) => {
    try {
        let authorsBooks: BookObject[] = []
        const bookSellerConfig = bookSellersConfig[bookSeller]

        const queryParams = buildAuthorQueryParams(bookSeller, author, limit)
        const res = await fetch(`${bookSellerConfig.baseRoute}${bookSellerConfig.paths.author.path}?${queryParams}`);

        if (res.status !== 200) throw new Error(res.statusText);

        if (bookSellersConfig[bookSeller].paths.author.format === 'json') {
            authorsBooks = bookSellerConfig.paths.author.apiResponseMapper(await res.json())
        }

        if (bookSellersConfig[bookSeller].paths.author.format === 'xml') {
            const bookInformationString: string = await res.text()
            const parser = new Parser()
            const authorsBooksJson = await parser.parseStringPromise(bookInformationString)
            authorsBooks = bookSellerConfig.paths.author.apiResponseMapper(authorsBooksJson)
        }

        return authorsBooks

    } catch (error) {
        throw new Error(`Failed to fetch books by author: ${error}`)
    }
}

export default getBooksByAuthor;