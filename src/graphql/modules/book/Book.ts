import { sampleAuthorsData, sampleBooksData } from "../../../data/sample.js";

const resolvers = {
  Query: {
    books(root: any, args: any, context: any, info: any) {
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
    authors: (book: any) => book.authors.map(
      (author: any) => sampleAuthorsData.find((a) => a.id.toString() === author.toString())),
    authorsCount: (book: any) => book.authors.length,
  },

}


export const bookSchema = { resolvers }
