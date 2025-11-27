import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LatestNews = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const news = [
    {
      title: "Building Construction In A Giant Structure",
      date: "March 15, 2025",
      category: "Construction",
      image:
        "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&w=2400&q=100",
    },
    {
      title: "New Sustainable Building Technologies",
      date: "March 10, 2025",
      category: "Innovation",
      image:
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=2400&q=100",
    },
    {
      title: "Modern Architecture Trends 2025",
      date: "March 5, 2025",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2400&q=100",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
              Latest News
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Latest News Posts And Articles
            </h2>
          </div>

          <button className="hidden md:block bg-primary text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-semibold">
            View All
          </button>
        </motion.div>

        {/* NEWS CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              whileHover={{ y: -8, transition: {duration: 0.28} }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              {/* IMAGE */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {item.category}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4">{item.date}</p>

                <div className="flex items-center gap-2 text-primary font-semibold">
                  <span>Read More</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
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
              </div>
            </motion.article>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center md:hidden"
        >
          <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 font-semibold">
            View All
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;
