async function getProductList() {
  try {
    const url = new URL("https://panda-market-api-crud.vercel.app/products");
    url.searchParams.append("page", 1);
    url.searchParams.append("pageSize", 10);
    url.searchParams.append("keyword", "");

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Finished");
  }
}

getProductList();

async function getProduct(id) {
  try {
    const res = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Finished");
  }
}

getProduct(379);

async function createProduct(name, description, price, tags, images) {
  try {
    const res = await fetch(
      "https://panda-market-api-crud.vercel.app/products",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price,
          tags,
          images,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Finished");
  }
}

createProduct(
  "뉴맥북에어",
  "16GB RAM, 512GB",
  199,
  "전자제품",
  "https://apple.macbook.coopang.kr"
);

async function patchProduct(id, name, description, price, tags, images) {
  try {
    const res = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price,
          tags,
          images,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Finished");
  }
}

patchProduct(
  391,
  "구형맥북에어",
  "구형구정특별할인행사",
  100,
  "전자제품",
  "https://apple3453.co.kr."
);

async function deleteProduct(id) {
  try {
    const res = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log(`ID ${id} 가 삭제되었습니다.`);
  }
}

deleteProduct(388);
