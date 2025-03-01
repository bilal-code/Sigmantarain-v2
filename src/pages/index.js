import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          🚧 Website is Under Construction 🚧
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          We’re working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </div>
  );
}
