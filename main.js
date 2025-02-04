class Product {
  constructor(name, description, price, tags, images, favoriteCount = 0) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this._favoriteCount = favoriteCount;
  }

  favorite() {
    this._favoriteCount += 1;
  }

  get favoriteCount() {
    return this._favoriteCount;
  }

  set favoriteCount(value) {
    throw new Error("좋아요는 수정할 수 없습니다.");
  }
}

const product1 = new Product(
  "책상",
  "높낮이 조절가능",
  300000,
  "가구",
  "https://deskgood.com"
);

product1.favorite();
product1.favorite();

console.log(product1);
