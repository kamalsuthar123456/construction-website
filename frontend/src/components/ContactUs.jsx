import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { 
  Mail, Phone, MapPin, Globe, Send, CheckCircle2, XCircle,
  Building2, Users, MessageSquare, Briefcase, ArrowRight, 
  Sparkles, Award, Target
} from 'lucide-react';

const ContactUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiry: 'General Inquiry',
    region: 'North America',
    description: '',
    subscribe: false
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        inquiry: formData.inquiry,
        region: formData.region,
        description: formData.description || 'No description provided',
        subscribe: formData.subscribe ? 'Yes ✅' : 'No ❌'
      };

      console.log('📧 Sending email with params:', templateParams);
      
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Email sent successfully!', response);
      
      showToast('success', 'Message sent successfully! We\'ll get back to you soon.');
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiry: 'General Inquiry',
        region: 'North America',
        description: '',
        subscribe: false
      });
      
    } catch (error) {
      console.error('❌ EmailJS Error:', error);
      showToast('error', 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="relative overflow-hidden -mt-24 pt-24">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed top-20 left-0 right-0 z-[9999] flex justify-center px-4"
          >
            <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md ${
              toast.type === 'success' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                : 'bg-gradient-to-r from-red-500 to-rose-500'
            } min-w-[320px] max-w-md w-full`}>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                  {toast.type === 'success' ? (
                    <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                  ) : (
                    <XCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                  )}
                </div>
              </div>
              <p className="text-white font-bold text-base flex-1">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 ULTRA PREMIUM HERO SECTION - NO WHITE SPACE */}
      <div className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Advanced Background with Multiple Layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070)',
          }}
        >
          {/* Primary Blur and Dark Overlay */}
          <div className="absolute inset-0 backdrop-blur-[10px] bg-gradient-to-br from-slate-900/90 via-gray-900/85 to-neutral-900/90"></div>
          
          {/* Animated Mesh Gradient Overlay */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Diagonal Accent Lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>

          {/* Floating Orbs with Better Animation */}
          <motion.div 
            className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          
          <motion.div 
            className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, -50, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-xl border border-orange-500/30 shadow-xl">
                <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                <span className="text-orange-300 font-bold text-sm tracking-widest uppercase">Contact Our Expert Team</span>
              </div>
            </motion.div>

            {/* Main Heading with Premium Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.05] tracking-tight"
            >
              <span className="text-white">Ready to work</span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  together?
                </span>
                {/* Glow Effect */}
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 blur-3xl opacity-50"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                {/* Underline Accent */}
                <motion.div 
                  className="absolute -bottom-4 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </span>
            </motion.h1>

            {/* Enhanced Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-14 leading-relaxed font-light"
            >
              Whether you have a project in mind and you're looking for a{' '}
              <span className="font-bold text-orange-300 relative">
                reliable construction partner
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400/50"></span>
              </span>{' '}
              or you're looking to take the next step in your career, we want to hear from you!
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-6 mb-16"
            >
              {/* Primary Button */}
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold rounded-full shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-sm">
                  Build a project with us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                {/* Animated Shine */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {/* Glow on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              </motion.button>

              {/* Secondary Button */}
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-bold rounded-full border-2 border-white/30 shadow-2xl overflow-hidden hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-sm">
                  Build a career with us
                  <Briefcase className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </motion.button>
            </motion.div>

            {/* Premium Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.9 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                { icon: Target, number: '500+', label: 'Projects Completed', color: 'from-orange-400 to-amber-400' },
                { icon: Award, number: '25+', label: 'Years Experience', color: 'from-blue-400 to-cyan-400' },
                { icon: Sparkles, number: '98%', label: 'Client Satisfaction', color: 'from-purple-400 to-pink-400' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="relative group"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
                    <div className="flex flex-col items-center">
                      <stat.icon className={`w-8 h-8 mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                      <div className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-300 font-semibold uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Premium Wave Divider - Smoother */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto" preserveAspectRatio="none">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,50 C320,90 420,10 720,50 C1020,90 1120,10 1440,50 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </div>

      {/* Form Section - Clean White Background */}
      <div className="bg-white py-24 relative">
        {/* Subtle Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="mb-10">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                >
                  How can we help?
                </motion.h3>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="w-24 h-1.5 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full origin-left"
                />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry & Region */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Select Inquiry *
                    </label>
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 group-focus-within:text-orange-600 transition-colors" />
                      <select 
                        name="inquiry"
                        value={formData.inquiry}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all appearance-none cursor-pointer hover:border-orange-300"
                        required
                      >
                        <option>General Inquiry</option>
                        <option>Project Bid</option>
                        <option>Careers</option>
                        <option>Media</option>
                        <option>Partnership</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Select Region *
                    </label>
                    <div className="relative group">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 group-focus-within:text-orange-600 transition-colors" />
                      <select 
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all appearance-none cursor-pointer hover:border-orange-300"
                        required
                      >
                        <option>North America</option>
                        <option>Europe</option>
                        <option>Asia Pacific</option>
                        <option>Middle East</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* First & Last Name */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      First Name *
                    </label>
                    <div className="relative group">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                      <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all hover:border-orange-300" 
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Last Name *
                    </label>
                    <div className="relative group">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                      <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all hover:border-orange-300" 
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all hover:border-orange-300" 
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Email *
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all hover:border-orange-300" 
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Description
                  </label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                    <textarea 
                      rows={5}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none hover:border-orange-300" 
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                </div>

                {/* Subscribe Checkbox */}
                <div className="flex items-start gap-3 py-4">
                  <input 
                    type="checkbox"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-600 cursor-pointer" 
                    id="subscribe" 
                  />
                  <label htmlFor="subscribe" className="text-gray-600 cursor-pointer text-sm font-medium">
                    Sign me up for access to exclusive content and the latest news
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col md:flex-row items-center gap-8 pt-4">
                  <motion.button 
                    type="submit" 
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="group relative w-full md:w-auto px-12 py-5 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold rounded-full transition-all shadow-2xl shadow-orange-600/30 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Submit</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-orange-700 to-amber-600"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </>
                    )}
                  </motion.button>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    By clicking Submit you have read and understood our{' '}
                    <a href="#" className="text-orange-600 underline hover:text-orange-700 font-semibold">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </form>
            </motion.div>

            {/* Info Section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 space-y-12 lg:pl-12 lg:border-l-2 border-gray-200"
            >
              {/* Links */}
              <div className="group">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">View Our Offices</h4>
                <p className="text-gray-600 mb-4">Contact your local office.</p>
                <a href="#" className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                  Explore our offices 
                  <motion.div 
                    className="h-px bg-orange-600"
                    initial={{ width: 32 }}
                    whileHover={{ width: 48 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </div>

              <div className="group">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Build a Career with Us</h4>
                <p className="text-gray-600 mb-4">View open opportunities at Construct.</p>
                <a href="#" className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                  Visit our careers page 
                  <motion.div 
                    className="h-px bg-orange-600"
                    initial={{ width: 32 }}
                    whileHover={{ width: 48 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </div>

              <div className="group">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Recruitment Fraud</h4>
                <p className="text-gray-600 mb-4">Beware of false recruitment offers.</p>
                <a href="#" className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                  Read More 
                  <motion.div 
                    className="h-px bg-orange-600"
                    initial={{ width: 32 }}
                    whileHover={{ width: 48 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </div>

              {/* Contact Info */}
              <div className="pt-8 space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-gray-600 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-lg shadow-orange-100">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                    <p className="font-bold text-gray-900">contact@construct.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-gray-600 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-lg shadow-orange-100">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                    <p className="font-bold text-gray-900">+1 (800) CONSTRUCT</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 text-gray-600 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-lg shadow-orange-100">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global HQ</p>
                    <p className="font-bold text-gray-900">Bikaner, Rajasthan, IN</p>
                  </div>
                </motion.div>
              </div>

              {/* Premium CTA Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 rounded-3xl p-8 text-white overflow-hidden mt-8 shadow-2xl shadow-orange-600/30"
              >
                {/* Animated Background Shapes */}
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"
                  animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>
                
                <div className="relative">
                  <Sparkles className="w-8 h-8 mb-4 text-yellow-300" />
                  <h3 className="text-2xl font-bold mb-3">Ready to Start?</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Schedule a free consultation with our experts and get your project estimate today.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-orange-600 hover:bg-gray-50 font-bold rounded-full px-6 py-3 inline-flex items-center gap-2 group transition-all shadow-xl"
                  >
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
