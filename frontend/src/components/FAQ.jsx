import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // FINAL — 100% working images
  const faqs = [
  {
    question: "How to check the reputation of a company?",
    icon: "🏢",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  },
  {
    question: "Why must clients trust our construction team?",
    icon: "🛠️",
    image:
      "https://images.pexels.com/photos/3862371/pexels-photo-3862371.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    question: "Why must I invest in my real estate business?",
    icon: "📈",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
  },
  {
    question: "What job opportunities will be available?",
    icon: "👷‍♂️",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
];

  return (
    <section ref={ref} className="py-20 bg-white smooth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* --------------------- IMAGE/ICON SECTION --------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative z-10"
            >
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-50 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                <div className="relative h-full">

                  {/* Building Background Image */}
                  <img
                    src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Building Construction"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-90"
                  />

                  {/* Floating Circle Animation */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-primary/30 rounded-full mix-blend-soft-light"
                  />

                  {/* Bottom Animated Icon */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-4 right-4 w-24 h-24 bg-primary rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                  >
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --------------------- FAQ LIST --------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Regular Question For Customer
            </motion.h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02,}}
                  className="relative flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group overflow-hidden"
                >
                  {/* Background Image (Hover Reveal) */}
                  <img
                    src={faq.image}
                    alt={faq.question}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-all duration-500"
                  />

                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary group-hover:bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 relative z-10">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {faq.icon}
                    </span>
                  </div>

                  {/* Text */}
                  <p className="font-medium text-gray-900 group-hover:text-white transition-colors relative z-10">
                    {faq.question}
                  </p>

                  {/* Arrow */}
                  <div className="ml-auto relative z-10">
                    <svg
                      className="w-6 h-6 text-primary group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
