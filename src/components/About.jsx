import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

const images = [
  "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80", 
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80", // NEW 100% WORKING
  "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1200&q=80"
];


  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  className={`${index === 0 ? 'col-span-2' : ''} aspect-video rounded-2xl overflow-hidden shadow-xl relative group`}
                >
                  <img
                    src={img}
                    alt="Construction work"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 bg-primary text-white px-6 py-3 rounded-full shadow-xl z-10"
            >
              <span className="font-bold text-lg">25+ Years</span>
            </motion.div>
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block"
            >
              About Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              The Largest Privately Held Real Estate Investors And Managers In The World
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              We are committed to delivering exceptional construction services with professional expertise.
              Our team brings decades of experience in creating structures that stand the test of time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="space-y-4 mb-8"
            >
              {[
                'Professional and experienced team',
                'Quality materials and construction',
                'On-time project delivery',
                'Customer satisfaction guaranteed'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Read More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
