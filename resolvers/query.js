export default {
  products(parent, { filters: argsFilters }, { PRODUCTS, REVIEWS }) {
    let products = PRODUCTS;
    if (argsFilters) {
      if (argsFilters.onSale) products = products.filter((product) => product.onSale);
      if (argsFilters.avgRating)
        products = products.filter((product) => {
          const avgRating = REVIEWS.filter((review) => review.productId === product.id).reduce(
            (acc, review, i, productReviews) => {
              if (i + 1 == productReviews)
                return (acc + review.rating) / productReviews.length;
              return acc + review.rating;
            },
            0
          );
          return avgRating >= argsFilters.avgRating;
        });
    }

    return products;
  },
  product(parent, { id }, { PRODUCTS }) {
    const product = PRODUCTS.find((prod) => prod.id === id);

    return product || null;
  },
  categories(parent, args, { CATEGORIES }) {
    return CATEGORIES;
  },
  category(parent, { id: categoryId }, { CATEGORIES }) {
    const category = CATEGORIES.find((category) => category.id === categoryId);

    return category || null;
  },
  reviews(parent, args, { REVIEWS }) {
    return REVIEWS;
  },
  review(parent, { id: reviewId }, { REVIEWS }) {
    return REVIEWS.find((review) => review.id === reviewId);
  },
};
