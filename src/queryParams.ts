import {bookSellersConfig} from "./bookSellersConfig";
import {bookSellersConfigKeys} from "./types";

export const buildAuthorQueryParams = (bookSeller: bookSellersConfigKeys, author: string, limit: number | null = null) => {
    const bookSellerApiQueryParamKeys = bookSellersConfig[bookSeller].paths.author.queryParams;
    const format = bookSellersConfig[bookSeller].paths.author.format;
    let queryParams = {
        [bookSellerApiQueryParamKeys['author']]: author,
        ...(bookSellerApiQueryParamKeys['format'] && {[bookSellerApiQueryParamKeys['format'] as string]: format}),
        ...(bookSellerApiQueryParamKeys['limit'] && limit && {[bookSellerApiQueryParamKeys['limit'] as string]: limit.toString()}),
    }
    return new URLSearchParams(queryParams)
};