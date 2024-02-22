import { sampleAuthorsData, sampleBooksData } from "@/data/sample";
import { createLoggerByClassName } from "@/utils/Logger";

const logger = createLoggerByClassName("AuthorResolver");
const resolvers = {
  Query: {
    authors(root: any, args: any, context: any, info: any) {
      logger.debug(`Authors query received. ${JSON.stringify(args)}}`);
      return sampleAuthorsData.filter((author: any) => {
        if (args.id) {
          return author.id.toString() === args.id;
        }
        return true;
      });
    },
  },

  AuthorResponse: {
    id: (author: any) => author.id.toString(),
    books: (author: any) => {
      logger.debug(`Fetching books for related author ${author.id}`);
      return author.books.map((bookId: any) =>
        sampleBooksData.find((b: any) => b.id === bookId),
      );
    },
    bookCount: (author: any) => {
      logger.debug(`Calculating book count for author ${author.id}`);
      return author.books.length;
    },
  },
};

export const authorSchema = { resolvers };
