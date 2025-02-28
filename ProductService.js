import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app/products",
  timeout: 10000,
});

export async function getProductList(page, pageSize, keyword) {
  let res;
  try {
    const res = await instance.get("/", {
      params: { page, pageSize, keyword },
    });
    return res;
  } catch (e) {
    if (e.response) {
      console.log(e.response.headers);
      console.log(e.response.status);
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log("에러가 발생하였습니다.", e.message);
    }
  } finally {
    console.log("Finished");
  }
}

// getProductList();

export async function getProduct(id) {
  let res;
  try {
    res = await instance.get(`/${id}`);
    return res;
  } catch (e) {
    if (e.response) {
      console.log(e.response.headers);
      console.log(e.response.status);
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log("에러가 발생하였습니다.", e.message);
    }
  } finally {
    console.log("Finished");
  }
}

// getProduct(421);

export async function createProduct(name, description, price, tags, images) {
  let res;
  try {
    res = await instance.post("/", { name, description, price, tags, images });
    return res;
  } catch (e) {
    if (e.response) {
      console.log(e.response.headers);
      console.log(e.response.status);
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log("에러가 발생하였습니다.", e.message);
    }
  } finally {
    console.log("Finished");
  }
}

// createProduct(
//   "뉴맥북에어",
//   "16GB RAM, 512GB",
//   199,
//   "전자제품",
//   "https://apple.macbook.coopang.kr"
// );

export async function patchProduct(id, name, description, price, tags, images) {
  let res;
  try {
    res = await instance.patch(`/${id}`, {
      name,
      description,
      price,
      tags,
      images,
    });
    return res;
  } catch (e) {
    if (e.response) {
      console.log(e.response.headers);
      console.log(e.response.status);
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log("에러가 발생하였습니다.", e.message);
    }
  } finally {
    console.log("Finished");
  }
}

// patchProduct(
//   427,
//   "구형맥북에어",
//   "구형구정특별할인행사",
//   100,
//   "전자제품",
//   "https://apple3453.co.kr."
// );

export async function deleteProduct(id) {
  let res;
  try {
    res = await instance.delete(`/${id}`);
    return res;
  } catch (e) {
    if (e.response) {
      console.log(e.response.headers);
      console.log(e.response.status);
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log("에러가 발생하였습니다.", e.message);
    }
  } finally {
    console.log(`ID ${id} 가 삭제되었습니다.`);
  }
}

// deleteProduct(427);
