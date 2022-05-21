export default {
  addProduct(parent, { input }, { PRODUCTS }) {
    const newProduct = { ...input, id: "5" };

    PRODUCTS.push(newProduct);

    return newProduct;
  },
  deleteProduct(parent, { id }, { PRODUCTS, REVIEWS }) {
    PRODUCTS = PRODUCTS.filter((product) => product.id !== id);
    REVIEWS = REVIEWS.filter((review) => review.productId !== id);
    return PRODUCTS;
  },
  updateProduct(parent, { id, updatedFields }, { PRODUCTS }) {
    const product = PRODUCTS.find((product) => product.id === id);

    for (const field in updatedFields) {
      if (Object.prototype.hasOwnProperty.call(product, field))
        product[field] = updatedFields[field];
    }

    return product;
  },
};
