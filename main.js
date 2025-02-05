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

class ElectronicProduct extends Product {
  constructor(
    name,
    description,
    price,
    tags,
    images,
    manufacturer,
    favoriteCount
  ) {
    super(name, description, price, tags, images, favoriteCount);
    this.manufacturer = manufacturer;
  }
}

const electronicProduct1 = new ElectronicProduct(
  "모니터",
  "QHD 4k",
  "400000",
  "전자제품",
  "https://monitor.co.kr",
  "LG"
);

electronicProduct1.favorite();

console.log(electronicProduct1);

class Article {
  constructor(title, content, writer, likeCount = 0, createdAt = new Date()) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this._likeCount = likeCount;
    this.createdAt = createdAt;
  }

  like() {
    this._likeCount += 1;
  }

  get likeCount() {
    return this._likeCount;
  }

  set likeCount(value) {
    throw new Error("좋아요는 수정할 수 없습니다.");
  }
}

const article1 = new Article("모던자바스크립트", "IT서적", "자바킴");

article1.like();

console.log(article1);
