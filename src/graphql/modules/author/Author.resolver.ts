import { sampleAuthorsData, sampleBooksData } from "../../../data/sample.js";

const resolvers = {
  Query: {
    authors(root: any, args: any, context: any, info: any) {
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
    books: (author: any) => author.books.map(
      (book: any) => sampleBooksData.find((b:any) => b.id === book)),
    bookCount: (author: any) => author.books.length,
  },
}

export const authorSchema = {resolvers}
