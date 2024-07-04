import { fetchAllProducts, fetchMaxPages } from "@/actions";
import ProductCard from "../components/product-card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PageCounter from "@/components/pagination";

export default async function Home({ searchParams }) {
  console.log("searchParams", searchParams);
  const pageParam = searchParams?.page;
  const skip = pageParam ? (parseInt(pageParam) - 1) * 32 : 0;
  const getAllProducts = await fetchAllProducts(skip);
  console.log(getAllProducts);

  const getSession = await auth();

  if (!getSession) {
    redirect("/unauth-page");
  }

  console.log(getSession);

  const maxPages = await fetchMaxPages();
  // console.log(maxPages);

  return (
    <div>
      <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto p-2 py-4">
        {getAllProducts && getAllProducts.data && getAllProducts.data.length > 0
          ? getAllProducts.data.map((product) => <ProductCard item={product} />)
          : null}
      </div>
      <div>
        <PageCounter maxPages={maxPages?.data} />
      </div>
    </div>
  );
}
