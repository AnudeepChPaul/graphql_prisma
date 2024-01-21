import { sampleAuthorsData, sampleBooksData } from "../../../data/sample.js";
import { createLogger } from "../../../utils/Logger.js";

const logger = createLogger('AuthorResolver');
const resolvers = {
  Query: {
    authors(root: any, args: any, context: any, info: any) {
      logger.debug(`Authors query received. ${JSON.stringify(args)}}`);
      return sampleAuthorsData.filter((author: any) => {
        if (args.id) {
          return author.id.toString() === args.id
        }
        return true
      });
    }
  },

  AuthorResponse: {
    id: (author: any) => author.id.toString(),
    books: (author: any) => {
      logger.debug(`Fetching books for related author ${author.id}`)
      return author.books.map(
        (book: any) => sampleBooksData.find((b:any) => b.id === book))
    },
    bookCount: (author: any) => {
      logger.debug(`Calculating book count for author ${author.id}`)
      return author.books.length
    }
  },
}

export const authorSchema = {resolvers}
