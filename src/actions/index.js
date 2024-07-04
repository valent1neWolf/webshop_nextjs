"use server";

import { signIn, signOut } from "@/auth";

//get all products
export async function fetchAllProducts(skip) {
  try {
    const result = await fetch(
      `https://dummyjson.com/products?limit=32&skip=${skip}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await result.json();
    return {
      success: true,
      data: data?.products,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while fetching products",
    };
  }
}

//max oldalak száma
function setLocalStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Failed to access localStorage:", error);
    // Implement alternative storage mechanism or handle the error
  }
}

function getLocalStorageItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Failed to access localStorage:", error);
    // Implement alternative retrieval mechanism or handle the error
    return null;
  }
}

export async function fetchMaxPages() {
  try {
    const cachedMaxPages = getLocalStorageItem("maxPages");
    if (cachedMaxPages) {
      return {
        success: true,
        data: parseInt(cachedMaxPages, 10),
      };
    }

    const result = await fetch(
      "https://dummyjson.com/products?limit=0&skip=0",
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await result.json();
    const productsLength = data?.products.length;
    const maxPages = Math.ceil(productsLength / 32);

    // Cache the result for future requests
    setLocalStorageItem("maxPages", maxPages.toString());

    return {
      success: true,
      data: maxPages,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while fetching max pages",
    };
  }
}

//termék fetch-elése

export async function fetchProductDetails(id) {
  try {
    const result = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await result.json();
    if (!data.id) {
      return {
        success: false,
        message: "Product not found",
      };
    } else {
      return {
        success: true,
        data: data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while fetching product details",
    };
  }
}

export async function loginAction() {
  await signIn("github");
}

export async function logoutAction() {
  await signOut();
}
