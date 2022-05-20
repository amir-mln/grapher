export default {
  category({ categoryId: productCategoryId }, args, { CATEGORIES }) {
    return CATEGORIES.find((category) => category.id === productCategoryId);
  },
  reviews({ id: productId }, args, { REVIEWS }) {
    return REVIEWS.filter((review) => review.productId === productId);
  },
};
