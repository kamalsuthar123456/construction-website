import React from 'react'
import { easeInOut, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      title: 'General Construction',
      description: 'Complete construction services for residential and commercial projects.',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Property Maintenance',
      description: 'Regular maintenance and repair services to keep your property in top condition.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Residence Engineering',
      description: 'Expert engineering solutions for residential construction projects.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Architecture Design',
      description: 'Innovative architectural designs tailored to your vision.',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Interior Design',
      description: 'Beautiful and functional interior spaces that reflect your style.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Exterior Design',
      description: 'Stunning exterior designs that enhance curb appeal.',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-white smooth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ----------------------------
            SECTION HEADER
        ----------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 smooth"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Our Services
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Construction Service To Our Clients
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive construction services with professional expertise and a commitment to high-quality construction & design.
          </p>
        </motion.div>

        {/* ----------------------------
            SERVICE CARDS
        ----------------------------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02, transition: {duration: 0.28}}}
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer smooth"
            >
              
              {/* IMAGE */}
              <div className="h-48 w-full overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300 mb-6">
                  {service.description}
                </p>

                {/* LEARN MORE BUTTON */}
                <div className="flex items-center gap-2 text-primary group-hover:text-white transition-colors font-semibold">
                  <span>Learn More</span>
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services
