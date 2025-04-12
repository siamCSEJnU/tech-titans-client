"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (!pathname.includes("dashboard")) {
    return (
      <div className="py-10   bg-gray-100 mt-12">
        <div className="w-4/5 mx-auto">
          {/* TOP */}
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* LEFT */}
            <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
              <Link href="/">
                <div
                  href={"/"}
                  className="hover:text-blue-600  text-2xl tracking-wide font-semibold"
                >
                  Tech Titans
                </div>
              </Link>
              <p>30/B/1, Central Plaza, Malibagh, Bangladesh</p>
              <span className="font-semibold">hello@techTitans.dev</span>
              <span className="font-semibold">+1 234 567 890</span>
              <div className="flex gap-6">
                <Image src="/facebook.png" alt="" width={16} height={16} />
                <Image src="/instagram.png" alt="" width={16} height={16} />
                <Image src="/youtube.png" alt="" width={16} height={16} />
              </div>
            </div>
            {/* CENTER */}
            <div className="hidden lg:flex justify-between w-1/2">
              <div className="flex flex-col justify-between">
                <h1 className="font-medium text-lg">COMPANY</h1>
                <div className="flex flex-col gap-4">
                  <Link href="">About Us</Link>
                  <Link href="">Careers</Link>
                  <Link href="">Affiliates</Link>
                  <Link href="">Blog</Link>
                  <Link href="">Contact Us</Link>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <h1 className="font-medium text-lg">SHOP</h1>
                <div className="flex flex-col gap-4">
                  <Link href="">New Arrivals</Link>
                  <Link href="">Accessories</Link>
                  <Link href="">Men</Link>
                  <Link href="">Women</Link>
                  <Link href="">All Products</Link>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <h1 className="font-medium text-lg">HELP</h1>
                <div className="flex flex-col gap-4">
                  <Link href="">Customer Service</Link>
                  <Link href="">My Account</Link>
                  <Link href="">Find a Store</Link>
                  <Link href="">Legal & Privacy</Link>
                  <Link href="">Gift Card</Link>
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-4">
              <h1 className="font-medium text-lg">SUBSCRIBE</h1>
              <p>
                Be the first to get the latest news about trends, promotions,
                and much more!
              </p>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Email address"
                  className="p-4 w-3/4 outline-1"
                />
                <button className="w-1/4 bg-black text-white ">JOIN</button>
              </div>
              <span className="font-semibold">Secure Payments</span>
              <div className="flex justify-between">
                <Image src="/discover.png" alt="" width={40} height={20} />
                <Image src="/mastercard.png" alt="" width={40} height={20} />
                <Image src="/visa.png" alt="" width={40} height={20} />
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-10">
            <div className="">© 2025 Tech Titans</div>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="">
                <span className="text-gray-500 mr-4">Language</span>
                <span className="font-medium">United States | English</span>
              </div>
              <div className="">
                <span className="text-gray-500 mr-4">Currency</span>
                <span className="font-medium">$ USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Footer;
