/*
  다음 경우들에 대해 총 14개의 SQL 쿼리를 작성해 주세요.
  예시로 값이 필요한 경우 적당한 값으로 채워넣어서 작성하면 됩니다. 
*/

/*
  1. 내 정보 업데이트 하기
  - 닉네임을 "test"로 업데이트
  - 현재 로그인한 유저 id가 1이라고 가정
*/
UPDATE users SET nickname = 'test' WHERE id = 1;

/*
  2. 내가 생성한 상품 조회
  - 현재 로그인한 유저 id가 1이라고 가정
  - 최신 순으로 정렬
  - 10개씩 페이지네이션, 3번째 페이지
*/
SELECT * FROM products 
WHERE products.user_Id = 1 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 20;

/*
  3. 내가 생성한 상품의 총 개수
*/
SELECT COUNT(*) FROM products 
WHERE products.user_id = 1;

/*
  4. 내가 좋아요 누른 상품 조회
  - 현재 로그인한 유저 id가 1이라고 가정
  - 최신 순으로 정렬
  - 10개씩 페이지네이션, 3번째 페이지
*/
SELECT * 
FROM favorites 
WHERE user_id = 1 
ORDER BY created_at DESC
LIMIT 10 
OFFSET 20;

/*
  5. 내가 좋아요 누른 상품의 총 개수
*/
SELECT COUNT(*) 
FROM favorites 
WHERE favorites.user_id = 1;

/*
  6. 상품 생성
  - 현재 로그인한 유저 id가 1이라고 가정
*/
INSERT INTO products (user_id, name, content, price, image, tags) 
VALUES (1, 'newCREATOR', 'New products data content one', 99999, 'https://testexampleimage.com/256x256', '{new, item}');

/*
  7. 상품 목록 조회
  - "test" 로 검색
  - 최신 순으로 정렬
  - 10개씩 페이지네이션, 1번째 페이지
  - 각 상품의 좋아요 개수를 포함해서 조회하기
*/
SELECT 
  p.*, 
  COUNT(f.id) AS favorites_count
FROM products p
LEFT JOIN favorites f ON f.product_id = p.id
WHERE p.name LIKE '%test%' OR p.content LIKE '%test%'
GROUP BY p.id
ORDER BY p.created_at DESC
LIMIT 10 OFFSET 0;

/*
  8. 상품 상세 조회
  - 1번 상품 조회
*/
SELECT * FROM products WHERE id = 1;

/*
  9. 상품 수정
  - 1번 상품 수정
*/
UPDATE products SET price = 10000 WHERE id = 1;

/*
  10. 상품 삭제
  - 1번 상품 삭제
*/
DELETE FROM products WHERE id = 1;

/*
  11. 상품 좋아요
  - 1번 유저가 2번 상품 좋아요
*/
INSERT INTO favorites (user_id, product_id) VALUES (1, 2);

/*
  12. 상품 좋아요 취소
  - 1번 유저가 2번 상품 좋아요 취소
*/
DELETE FROM favorites WHERE user_id = 1 AND product_id = 2;


/*   13. 상품 댓글 작성
  - 1번 유저가 2번 상품에 댓글 작성 
 */
INSERT INTO comments (user_id, product_id, content) VALUES(1, 2, 'This content is test');


/*   14. 상품 댓글 조회
  - 1번 상품에 달린 댓글 목록 조회
  - 최신 순으로 정렬
  - 댓글 날짜 2025-03-25 기준으로 커서 페이지네이션
  - 10개씩 페이지네이션 */
SELECT c.id AS comments_id, p.id AS product_id, c.content, c.created_at 
FROM comments c JOIN products p ON p.id = c.product_id 
WHERE c.product_id = 1 AND c.created_at < '2025-03-25 00:00:00' 
ORDER BY c.created_at DESC, c.id DESC
LIMIT 10;