import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app/articles",
  timeout: 10000,
});

export function getArticleList(page, pageSize, keyword) {
  return instance
    .get("/", { params: { page, pageSize, keyword } })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.headers);
        console.log(e.response.status);
        console.log(e.response.data);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("에러가 발생하였습니다", e.message);
      }
    })
    .finally(() => {
      console.log("Finished");
    });
}

// getArticleList();

export function getArticle(id) {
  return instance
    .get(`/${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.headers);
        console.log(e.response.status);
        console.log(e.response.data);
      } else if (e.request) {
        console.log(error);
      } else {
        console.log("에러가 발생하였습니다.", e.message);
      }
    })
    .finally(() => {
      console.log("Finished");
    });
}

// getArticle(363);

export function createArticle(title, content, image) {
  return instance
    .post("/", { title, content, image })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.headers);
        console.log(e.response.data);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("에러가 발생하였습니다.", e.message);
      }
    })
    .finally(() => {
      console.log("Finished");
    });
}

// createArticle("노드제이에스", "컴퓨터전공", "https://node.js.good");

export function patchArticle(id, title, content, image) {
  return instance
    .patch(`/${id}`, { title, content, image })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.headers);
        console.log(e.response.status);
        console.log(e.response.data);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("에러가 발생하였습니다.", e.message);
      }
    })
    .finally(() => {
      console.log("Finished");
    });
}

// patchArticle(376, "타입스크립트", "기본서적", "https://type.script.kr");

export function deleteArticle(id) {
  return instance
    .delete(`${id}`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e.response) {
        console.log(e.response.headers);
        console.log(e.response.status);
        console.log(e.response.data);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log("에러가 발생하였습니다.", e.message);
      }
    })
    .finally(() => console.log(`ID ${id} 가 삭제되었습니다.`));
}

// deleteArticle(376);
