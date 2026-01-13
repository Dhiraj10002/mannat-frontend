import { motion } from "framer-motion";
import { FaUniversity, FaQrcode, FaInfoCircle } from "react-icons/fa";

const Donate = () => {
  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Support Our <span className="text-green-700">Mission</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Your contribution helps us continue our work and reach more people
            in need. Every donation, big or small, makes a difference.
          </p>
        </motion.div>

        {/* Donation Methods */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">

          {/* QR Donation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-green-50 p-8 rounded-xl shadow-sm text-center"
          >
            <FaQrcode className="text-green-700 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Donate via UPI
            </h2>
            <p className="mt-3 text-gray-600">
              Scan the QR code using any UPI app to make a donation.
            </p>

            {/* QR IMAGE */}
            <img
              src="/donation-qr.webp"
              alt="UPI QR Code"
              className="w-56 mx-auto my-6 rounded-lg border"
              loading="lazy"
            />

            <p className="text-sm text-gray-500">
              Supported apps: Google Pay, PhonePe, Paytm, BHIM
            </p>
          </motion.div>

          {/* Bank Details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-xl shadow-sm"
          >
            <FaUniversity className="text-green-700 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Bank Transfer
            </h2>

            <div className="mt-6 space-y-3 text-gray-700">
              <p><strong>Account Name:</strong> Mannat Foundation</p>
              <p><strong>Account Number:</strong> XXXXXXXXXXXX</p>
              <p><strong>Bank Name:</strong> Your Bank Name</p>
              <p><strong>IFSC Code:</strong> XXXXXXXX</p>
              <p><strong>Branch:</strong> City Name</p>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Please mention <strong>“Donation”</strong> in the transfer remark.
            </p>
          </motion.div>

        </div>

        {/* Transparency Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white border rounded-xl p-6 flex gap-4 items-start"
        >
          <FaInfoCircle className="text-green-700 text-2xl mt-1" />
          <p className="text-gray-600">
            <strong>Transparency Notice:</strong> We do not use any online payment
            gateway. All donations are made directly to the NGO’s bank account or
            via UPI. For any queries, feel free to contact us on WhatsApp.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Donate;
