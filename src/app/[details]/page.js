import { fetchProductDetails } from "@/actions";
import AddToCartButton from "@/components/add-to-cart-button";
import Rating from "@/components/rating";
import Reviews from "@/components/reviews";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DetailsImages from "@/components/details-images";

export default async function ProductDeatails({ params }) {
  console.log(params);
  const details = await fetchProductDetails(params.details);
  const detailsData = await details?.data;
  console.log(detailsData);
  const getSession = await auth();

  if (!getSession) {
    redirect("/unauth-page");
  }

  if (!detailsData) {
    return (
      <div className="p-20 flex justify-center">
        <h2 className="text-3xl font-bold">Product not found</h2>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto p-2">
      <div className="p-6">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <DetailsImages detailsData={detailsData} />
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {detailsData?.title}
            </h2>

            <Rating rating={detailsData?.rating} name="combinedRating" />

            <hr className="border-gray-600 border-1" />
            <p className="mt-5 text-gray-800 text-xl">
              {detailsData?.price} &euro;
            </p>
            <h3 className="mt-5">{detailsData?.description}</h3>
            <div className="mt-5">
              <AddToCartButton productItem={detailsData} />
              <p className="pt-2 italic">{detailsData?.shippingInformation}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className=" border-2 mt-5" />
      <Reviews detailsData={detailsData} id="reviews" />
    </div>
  );
}
