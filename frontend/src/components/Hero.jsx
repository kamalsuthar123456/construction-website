import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative flex items-center bg-gradient-to-br from-gray-50 to-gray-100 smooth 
      pt-4 md:pt-8 pb-10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ----------------------------- 
               LEFT SIDE: TEXT CONTENT
          ------------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="smooth"
          >
            {/* Tag */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full 
              text-xs sm:text-sm font-semibold mb-4 md:mb-6"
            >
              WELCOME TO CONSTRUCT
            </motion.span>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
              font-bold text-gray-900 leading-tight mb-4"
            >
              Your Trusted{" "}
              <span className="text-primary">Construction Partner</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed"
            >
              We deliver exceptional construction services with professional expertise 
              and commitment to quality. Building your dreams with precision and care.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <button className="bg-primary text-white px-6 py-3 rounded-full 
              hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:scale-105 
              text-sm sm:text-base font-semibold">
                Our Services
              </button>

              <button className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-full 
              hover:bg-gray-900 hover:text-white transition-all duration-300 
              text-sm sm:text-base font-semibold">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* ----------------------------- 
               RIGHT SIDE: IMAGE + ANIMATION
          ------------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative smooth"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden smooth"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                  alt="Construction Site"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
