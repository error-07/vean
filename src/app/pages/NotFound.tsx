import { Link } from "react-router";
import { motion } from "motion/react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-zinc-950 text-zinc-50 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-9xl font-black text-lime-400 tracking-tighter mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page not found</h2>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link 
          to="/"
          className="bg-lime-400 text-zinc-950 px-8 py-4 rounded-full font-black text-lg hover:bg-lime-500 transition-colors inline-block"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
