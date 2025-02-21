```mermaid
  erDiagram
  PRODUCT {
    STRING id PK
    STRING name
    STRING description
    FLOAT price
    STRING tags
    DATETIME createdAt
    DATETIME updatedAt
  }
  ARTICLE {
    STRING id PK
    STRING title
    STRING content
    DATETIME createdAt
    DATETIME updatedAt
  }
  PRODUCTCOMMENT {
    STRING id PK
    STRING productId FK
    STRING content
    DATETIME createdAt
    DATETIME updatedAt
  }
  ARTICLECOMMENT {
    STRING id PK
    STRING articleId FK
    STRING content
    DATETIME createdAt
    DATETIME updatedAt
  }
PRODUCT ||--o{ PRODUCTCOMMENT : "belong to"
ARTICLE ||--o{ ARTICLECOMMENT : "belong to"
```
