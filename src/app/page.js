// import { stripe } from "@/lib/stripe";

import Carousel from "@/components/home/carousel";

import Banner from "@/components/home/banner";
import { fetchAllProducts } from "@/lib/apis/product-api";

export default async function Home() {
  // const products = await stripe.products.list({
  //   expand: ["data.default_price"],
  //   limit: 5,
  // });

  const products = await fetchAllProducts();

  return (
    <div>
      <Banner />
      <section className="p-8 bg-gray-100 rounded-md ">
        <Carousel products={products.slice(0, 5)}></Carousel>
      </section>
    </div>
  );
}
