import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
   
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/Star-wars-logo.webp')",
        }}
      ></div>

      {/* Dark overlay for readability - Accessiblity */}
      <div className="absolute inset-0 bg-black/80"></div>

     
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center"
      >
       
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-yellow-400 text-4xl md:text-6xl font-extrabold drop-shadow-lg"
        >
          Welcome to the Galaxy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 max-w-xl text-gray-300 text-lg md:text-xl leading-relaxed px-6"
        >
          Explore characters, planets, and starships from the Star Wars universe
          with our interactive API explorer.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={() => navigate("/people")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold text-lg shadow-xl hover:shadow-yellow-500/50 transition"
        >
          Enter the Galaxy
        </motion.button>
      </motion.div>
    </div>
  );
}
