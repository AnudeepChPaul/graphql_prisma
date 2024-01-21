export const typeDefs = `#graphql
  type Query {
    """
    Returns a list of books based on the id
    """
    books(id: String): [BookResponse]!
  }
  
  """
  Book is the book entity in the database
  """
  type Book {
    id: String!
    title: String
    authors: [String!]!
    published: Boolean
  }

  """
  BookResponse is a book with authors expanded
  """
  type BookResponse {
    id: String!
    title: String
    authors: [AuthorResponse!]!
    authorsCount: Int!
    published: Boolean
  }
`
