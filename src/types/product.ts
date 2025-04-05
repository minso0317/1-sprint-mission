interface Product {
  id: Number;
  name: String;
  description: String;
  price: Number;
  tags: String[];
  images: String[];
  comments: Number;
  createdAt: Date;
  updatedAt: Date;
}

export default Product;
