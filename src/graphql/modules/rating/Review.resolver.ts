import { sampleBooksData, sampleReviewsData } from "../../../data/sample.js"

const resolvers = {
  Query: {
    reviews(root: any, args: any, context: any, info: any) {
      return sampleReviewsData.filter((review) => {
        if (args.bookId) {
          return review.bookId.toString() === args.bookId
        }
        return true
      });
    },
  },
  BookResponse: {
    reviews: (book: any) => sampleReviewsData.filter((r:any) => r.bookId === book.id),
    avgRating: (book: any) => {
      const ratings = sampleReviewsData.filter((r:any) => r.bookId === book.id)
      if (!ratings.length) return 0;
      const sum = ratings.reduce((acc:any, curr:any) => acc + curr.rating, 0)
      return sum / ratings.length
    },
  },

  ReviewResponse: {
    id: (review: any) => review.id.toString(),
    book: (review: any) => sampleBooksData.find((b:any) => b.id === review.bookId),
  },
}

export const reviewSchema = {resolvers}

