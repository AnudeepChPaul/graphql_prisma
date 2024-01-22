import { sampleBooksData, sampleReviewsData } from "@/data/sample"
import { createLogger } from "@/utils/Logger";

const logger = createLogger('ReviewResolver');
const resolvers = {
  Query: {
    reviews(root: any, args: any, context: any, info: any) {
      logger.debug(`Reviews query received. ${JSON.stringify(args)}}`);
      return sampleReviewsData.filter((review) => {
        if (args.bookId) {
          return review.bookId.toString() === args.bookId
        }
        return true
      });
    },
  },
  BookResponse: {
    reviews: (book: any) => {
      logger.debug(`Fetching reviews for related book ${book.id}`)
      return sampleReviewsData.filter((r: any) => r.bookId === book.id)
    },
    avgRating: (book: any) => {
      logger.debug(`Calculating average rating for book ${book.id}`)
      const ratings = sampleReviewsData.filter((r: any) => r.bookId === book.id)
      if (!ratings.length) return 0;
      const sum = ratings.reduce((acc: any, curr: any) => acc + curr.rating, 0)
      return sum / ratings.length
    },
  },

  ReviewResponse: {
    id: (review: any) => review.id.toString(),
    book: (review: any) => {
      logger.debug(`Fetching book ${review.bookId} for related Review ${review.id}`)
      return sampleBooksData.find((b: any) => b.id === review.bookId)
    },
  },
}

export const reviewSchema = { resolvers }

