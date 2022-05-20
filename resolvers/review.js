export default {
  product({ productId }, args, { PRODUCTS }) {
    return PRODUCTS.find((product) => product.id === productId);
  },
};
