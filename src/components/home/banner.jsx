"use client";
import React from "react";
import { motion, easeOut } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="rounded bg-neutral-100 py-8  sm:py-12 mb-14">
      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
        <div
          // animate={{ x: [0, 50, 0] }}
          // transition={{
          //   duration: 5,
          //   delay: 1,
          //   ease: easeOut,
          //   repeat: Infinity,
          // }}
          className="max-w-md space-y-4"
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight md:text-4xl"
            animate={{ x: [0, 50, 0] }}
            transition={{
              duration: 5,
              delay: 1,
              ease: easeOut,
              repeat: Infinity,
            }}
          >
            Welcome to{" "}
            <motion.span
              animate={{ color: ["#33ffe3", "#4A5565", "#000"] }}
              transition={{ duration: 6.5, repeat: Infinity }}
            >
              {" "}
              My Ecommerce
            </motion.span>
          </motion.h2>
          <p className="text-neutral-600">
            Discover the latest products at the best prices.
          </p>
          <Button className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 cursor-pointer"
            >
              Browse All Products
            </Link>
          </Button>
        </div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            alt="Hero Image"
            src={"/banner/perfume2.jpg"}
            width={450}
            height={450}
            className=" rounded-t-[20px] rounded-br-[20px] border-l-8 border-b-8 border-gray-400 shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
