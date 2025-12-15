"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiInfo } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { PiMagicWand } from "react-icons/pi";
import { z } from "zod";
import { authValidation } from "../lib/zod/auth.schema";
import { InputGroup } from "./ui/inputs";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Inputs = z.infer<typeof authValidation.login>;

export default function FigmaAuthModal({ open, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const form = useForm<Inputs>({
    resolver: zodResolver(authValidation.login),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: Inputs) => {
    console.log(data);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="
              fixed top-1/2 left-1/2 z-[1000]
              w-full max-w-xl
              -translate-x-1/2 -translate-y-1/2
              rounded-3xl overflow-hidden
            "
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-white dark:bg-dark-primary p-10 border border-gray-200 dark:border-dark-primary rounded-3xl shadow-xl relative">
              <button
                onClick={onClose}
                className="
                  absolute right-5 top-5
                  text-gray-500 dark:text-gray-400
                  hover:text-gray-700 dark:hover:text-gray-200
                "
              >
                <MdClose size={22} />
              </button>

              <div className="w-12 h-12 mx-auto mb-6 bg-surface-secondary dark:bg-gray-800 rounded-2xl flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 300"
                  height="26"
                >
                  <path
                    fill="#0acf83"
                    d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z"
                  />
                  <path
                    fill="#a259ff"
                    d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z"
                  />
                  <path
                    fill="#f24e1e"
                    d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z"
                  />
                  <path
                    fill="#ff7262"
                    d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z"
                  />
                  <path
                    fill="#1abcfe"
                    d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z"
                  />
                </svg>
              </div>

              <h3 className="text-center text-gray-800 dark:text-white font-bold text-2xl mb-4">
                Figma frame or file import
              </h3>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <InputGroup
                      type="text"
                      label=""
                      placeholder="Paste your Figma frame or file URL"
                      disabled={isLoading}
                      error={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="
                    bg-primary-500 hover:bg-primary-600 
                    transition py-3 px-6 w-full font-medium 
                    text-white text-sm rounded-full
                  "
                >
                  {isLoading ? "Importing..." : "Start Import"}
                </button>
              </form>

              <div className="text-center mt-6">
                <Link
                  href="#"
                  className="text-blue-600 dark:text-blue-400 underline text-sm cursor-pointer"
                >
                  How to get URL?
                </Link>

                <div className="mt-2">
                  <Link
                    href="#"
                    className="
                        flex items-center justify-center gap-1 
                        text-blue-600 dark:text-blue-400 underline 
                        text-sm cursor-pointer
                        "
                  >
                    <PiMagicWand className="text-[14px]" />
                    Get the best output from Figma design
                  </Link>
                </div>
              </div>

              <div
                className="
                    mt-8 text-yellow-800 dark:text-yellow-200 text-[11px]
                    px-5 py-4 rounded-xl grid grid-cols-[18px_1fr] gap-3
                "
                style={{ backgroundColor: "#fec84b33" }}
              >
                <span>
                  <FiInfo fontSize={16}/>
                </span>

                <p className="m-0">
                  Figma has recently introduced API rate limits based on your
                  subscription plan. Your request may be impacted due to this
                  rate limit.{" "}
                  <Link href="#" className="cursor-pointer">
                    More info
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
