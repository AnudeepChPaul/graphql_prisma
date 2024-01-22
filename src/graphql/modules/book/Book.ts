import { sampleAuthorsData, sampleBooksData } from "@/data/sample";
import { createLogger } from "@/utils/Logger";

const logger = createLogger('BookResolver');
const resolvers = {
  Query: {
    books(root: any, args: any, context: any, info: any) {
      logger.debug(`Books query received. ${JSON.stringify(args)}}`);
      return sampleBooksData.filter((book) => {
        if (args.id) {
          return book.id.toString() === args.id
        }
        return true
      });
    },
  },

  BookResponse: {
    id: (book: any) => book.id.toString(),
    authors: (book: any) => {
      logger.debug(`Fetching authors for related book ${book.id}`)
      return book.authors.map(
        (author: any) => sampleAuthorsData.find((a) => a.id.toString() === author.toString()))
    },
    authorsCount: (book: any) => {
      logger.debug(`Calculating author count for book ${book.id}`)
      return book.authors.length
    }
  },

}


export const bookSchema = { resolvers }
