export default {
  products({ id: categoryId }, { filters: argFilters }, { PRODUCTS }) {
    let products = PRODUCTS.filter((product) => product.categoryId === categoryId);

    if (argFilters) {
      const { onSale, avgRating } = argFilters;
      if (onSale) products = products.filter((product) => product.onSale);
      if (avgRating)
        products = products.filter((product) => {
          const average = REVIEWS.filter((review) => review.productId === product.id).reduce(
            (acc, review, i, productReviews) => {
              if (i + 1 == productReviews)
                return (acc + review.rating) / productReviews.length;
              return acc + review.rating;
            },
            0
          );
          return avgRating >= average;
        });
    }

    return products;
  },
};
