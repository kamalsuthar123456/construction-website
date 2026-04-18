import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WorkTogether = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      title: "Call Us",
      description: "+1 234 567 890",
      image:
        "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Email Us",
      description: "info@construct.com",
      image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Visit Us",
      description: "123 Business Ave",
      image:
        "https://images.unsplash.com/photo-1505842465776-3b4953ca4f44?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Live Chat",
      description: "Chat with us",
      image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gray-900 text-white relative overflow-hidden smooth"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center text-4xl md:text-5xl font-bold mb-4"
        >
          Let's Work Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center text-gray-300 max-w-2xl mx-auto mb-16 text-lg"
        >
          Connect with our team for the best construction and engineering experience.
        </motion.p>

        {/* Unique Section Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover group-hover:scale-110 transition-all duration-700"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>

              {/* Text Content */}
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center mt-12"
        >
          <button className="bg-primary text-white px-10 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 font-semibold text-lg">
            Get In Touch
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkTogether;
