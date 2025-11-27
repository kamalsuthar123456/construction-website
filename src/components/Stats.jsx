import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { number: '48', label: 'Years Of Experience', suffix: '+' },
    { number: '52', label: 'Project Completed', suffix: 'K+' },
    { number: '2.3', label: 'Global Revenue', suffix: 'b+' },
    { number: '38', label: 'Staff Members', suffix: 'm+' },
  ]

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                className="text-4xl lg:text-5xl font-bold text-primary mb-2"
              >
                {stat.number}
                <span className="text-3xl">{stat.suffix}</span>
              </motion.div>
              <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats

