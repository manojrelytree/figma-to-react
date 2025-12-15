"use client";

import { useRef, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { MdAttachFile } from "react-icons/md";
import FigmaAuthModal from "./FigmaAuthModal";

export default function ImportButton() {
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.endsWith(".fig")) {
      alert("Only Figma (.fig) files are allowed.");
      return;
    }

    console.log("Figma file selected:", file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
        <textarea
          placeholder="What can I build for you today?"
          className="
            w-full h-24 resize-none bg-transparent 
            outline-none text-lg text-gray-800 dark:text-gray-100
          "
        />

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAttachClick}
              className="
                flex items-center justify-center 
                w-8 h-8 rounded-lg 
                bg-gray-200 dark:bg-gray-700 
                hover:bg-gray-300 dark:hover:bg-gray-600
                transition
              "
            >
              <MdAttachFile className="text-gray-700 dark:text-gray-300" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".fig"
              className="hidden"
              onChange={handleFileSelect}
            />

            <button
              onClick={() => setOpenModal(true)}
              className="
                flex items-center gap-1 px-3 py-1.5
                rounded-lg bg-gray-200 dark:bg-gray-700 
                hover:bg-gray-300 dark:hover:bg-gray-600
                transition text-sm font-medium
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 300"
                width="14"
                height="14"
                className="w-4 h-4"
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
              Import
            </button>
          </div>

          <button
            className="
              w-8 h-8
              flex items-center justify-center
              rounded-lg
              bg-gray-200 dark:bg-gray-700
              text-gray-400 dark:text-gray-300
              hover:bg-gray-300 dark:hover:bg-gray-600
              transition
            "
          >
            <FaArrowUpLong />
          </button>
        </div>
      </div>

      <FigmaAuthModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
