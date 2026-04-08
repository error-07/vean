import { Link } from "react-router";
import { motion } from "motion/react";
import { Navbar } from "./Navbar";

export function NotFound() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-950 text-zinc-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-8xl sm:text-9xl font-black text-blue-400 tracking-tighter mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Page not found</h2>
          <p className="text-zinc-400 mb-10 max-w-md mx-auto">
            We couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <Link
            to="/"
            className="bg-blue-400 text-zinc-950 px-8 py-4 rounded-full font-black text-lg hover:bg-blue-500 transition-colors inline-block"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
