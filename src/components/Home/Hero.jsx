import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import qrCode from "../../assets/qr/ngo-qr.png";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* Background Image */}
      <img
        src="/hero-bg.webp"
        alt="Helping communities"
        className="absolute inset-0 w-full h-full object-cover  brightness-125"
        loading="eager"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl px-6 md:px-10 lg:px-16">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
              Together, We Can <br />
              <span className="text-green-400">Make a Difference</span>
            </h1>

            <p className="mt-6 text-gray-200 text-lg md:text-md leading-relaxed">
              Supporting communities through compassion, education,
              and meaningful action. Your support helps us reach those
              who need it most.
            </p>
            <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
  {/* Donate Button */}
  <button className="px-8 py-3 border-1 text-gray-100 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-700 transition">
    Donate Now
  </button>

  {/* QR Card */}
  <div className="relative bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-green-100">
    {/* Glow */}
    <div className="absolute inset-0  rounded-2xl ring-5 ring-green-400/30"></div>
        <motion.div
  animate={{ y: [0, -6, 0] }}
  transition={{ repeat: Infinity, duration: 3 }}
>
  {/* QR Card here */}
</motion.div>
    <img
      src={qrCode}
      alt="Donate QR Code"
      className="w-36 h-38 bg-white rounded-xl overflow-hidden shadow-inner flex items-center justify-center"
    />

    <p className="mt-1 text-center text-sm font-semibold text-gray-800">
      Scan to Donate
    </p>

    
  </div>
</div>


          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
