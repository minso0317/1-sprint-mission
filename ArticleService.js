export function getArticleList() {
  const url = new URL("https://panda-market-api-crud.vercel.app/articles");
  url.searchParams.append("page", 1);
  url.searchParams.append("pageSize", 10);
  url.searchParams.append("keyword", "");

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("Finished");
    });
}

// getArticleList();

export function getArticle(id) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("Finished");
    });
}

// getArticle(335);

export function createArticle(title, content, image) {
  fetch("https://panda-market-api-crud.vercel.app/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("Finished");
    });
}

// createArticle("노드제이에스", "컴퓨터전공", "https://node.js.good");

export function patchArticle(id, title, content, image) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("Finished");
    });
}

// patchArticle(300, "타입스크립트", "기본서적", "https://type.script.kr");

export function deleteArticle(id) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: "DELETE",
    body: JSON.stringify(),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    })
    .finally(() => console.log(`ID ${id} 가 삭제되었습니다.`));
}

// deleteArticle(336);
