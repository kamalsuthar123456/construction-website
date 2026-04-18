import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Partners = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Load images from /public folder
  const partners = [
    { name: "Caterpillar", logo: "/caterpillar.png" },
    { name: "JCB", logo: "/jcb.png" },
    { name: "Tata Steel", logo: "/tata-steel.png" },
    { name: "UltraTech Cement", logo: "/ultratech.png" },
    { name: "L&T Construction", logo: "/lnt.png" },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl sm:text-4xl font-bold mb-12 text-gray-900"
        >
          Trusted By Industry Leaders
        </motion.h2>

        {/* Logos */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="bg-white h-28 w-56 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-4"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-full w-full object-contain"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;
