import { appResolvers } from "@modules/app/App.resolver";
import { authorSchema } from "@modules/author/Author.resolver";
import { bookSchema } from "@modules/book/Book";
import { reviewSchema } from "@modules/rating/Review.resolver";

export const resolvers = [
  appResolvers,
  authorSchema.resolvers,
  bookSchema.resolvers,
  reviewSchema.resolvers,
];
