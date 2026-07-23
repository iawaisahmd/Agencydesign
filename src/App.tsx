import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp,
  Play,
  BarChart3,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowUpRight,
  Star,
  Quote,
  Globe,
  Code,
  Layers,
  Smartphone,
  Monitor,
  Database,
  Cloud,
  Palette,
  Rocket,
  Building2,
  ShoppingCart,
  Heart,
  GraduationCap,
  Utensils,
  Briefcase,
  Home
} from 'lucide-react';
import { cn } from './utils/cn';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// Counter animation component
function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Industries', href: '#industries' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-4' : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.a 
              href="#" 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className={cn(
                'text-xl font-semibold tracking-tight transition-colors',
                isScrolled ? 'text-slate-900' : 'text-slate-900'
              )}>Vanguard Digital</span>
            </motion.a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-900 transition-all group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="#work"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                whileHover={{ y: -2 }}
              >
                View Portfolio
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/25"
              >
                Book Strategy Call
              </motion.button>
            </div>

            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white lg:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-semibold text-slate-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-200" />
              <button className="bg-slate-900 text-white px-6 py-4 rounded-lg text-lg font-semibold w-full">
                Book Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hero Section
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-700">Accepting New Projects for Q1 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8"
          >
            We Build Digital Experiences That{' '}
            <span className="relative">
              <span className="relative z-10">Drive Revenue</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-amber-200/60 -z-10" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Premium web design and development for businesses that refuse to compromise. 
            We transform your digital presence into a revenue-generating asset.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/25 flex items-center gap-3"
            >
              Book Your Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="#work"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 rounded-xl text-base font-semibold text-slate-700 hover:text-slate-900 transition-all flex items-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            >
              <Play className="w-4 h-4 fill-current" />
              View Our Work
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Trusted by 200+ industry leaders</span>
            </div>

            <div className="flex items-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>12+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>$50M+ Client Revenue Generated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>98% Client Retention</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-slate-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Trusted By / Social Proof Section
function TrustedBy() {
  const stats = [
    { value: 200, suffix: '+', label: 'Projects Delivered' },
    { value: 98, suffix: '%', label: 'Client Retention' },
    { value: 12, suffix: '+', label: 'Years Experience' },
    { value: 50, suffix: 'M+', label: 'Revenue Generated' },
  ];

  const logos = [
    'TechCorp', 'GlobalBank', 'HealthPlus', 'RetailMax', 'FinanceHub',
    'EduTech', 'BuildPro', 'AutoMotive', 'FoodChain', 'LegalEase'
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Trusted By Industry Leaders
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Companies That Choose Excellence
          </motion.h2>
        </motion.div>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
            >
              <div className="text-slate-400 group-hover:text-slate-600 transition-colors font-semibold text-lg">
                {logo}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 border border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100/50 transition-all"
            >
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section
function Services() {
  const services = [
    {
      icon: Palette,
      title: 'Brand & UI/UX Design',
      problem: 'Generic templates that don\'t reflect your brand',
      solution: 'Custom, research-driven design systems',
      outcome: 'Distinctive brand presence that commands premium pricing',
    },
    {
      icon: Code,
      title: 'Custom Web Development',
      problem: 'Slow, bloated websites that frustrate users',
      solution: 'Clean, performant code built for scale',
      outcome: 'Lightning-fast experiences that convert visitors',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Solutions',
      problem: 'Complex checkout processes losing sales',
      solution: 'Streamlined, conversion-optimized stores',
      outcome: 'Higher average order values and repeat purchases',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Development',
      problem: 'Poor mobile experiences driving users away',
      solution: 'Responsive designs that work flawlessly everywhere',
      outcome: 'Seamless experiences across all devices',
    },
    {
      icon: Database,
      title: 'CMS & Content Strategy',
      problem: 'Difficulty updating and managing content',
      solution: 'Intuitive content management systems',
      outcome: 'Empowered teams that can scale content effortlessly',
    },
    {
      icon: TrendingUp,
      title: 'SEO & Performance',
      problem: 'Invisible websites that don\'t rank',
      solution: 'Technical SEO built into every line of code',
      outcome: 'Top search rankings and organic growth',
    },
  ];

  return (
    <section id="services" className="py-32 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="max-w-3xl mb-20"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Our Expertise
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
            Services Built for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
              Business Growth
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-400 leading-relaxed">
            We don't just build websites. We build strategic digital assets that 
            solve real business problems and deliver measurable results.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <service.icon className="w-7 h-7 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400">{service.problem}</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{service.solution}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-emerald-300 font-medium">{service.outcome}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-800/50 backdrop-blur-sm px-8 py-6 rounded-2xl border border-slate-700">
            <div className="text-left">
              <p className="text-white font-semibold mb-1">Ready to discuss your project?</p>
              <p className="text-slate-400 text-sm">Let's explore how we can help you achieve your goals.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Industries Section
function Industries() {
  const industries = [
    { icon: Building2, name: 'Financial Services', description: 'Banks, fintech, investment firms' },
    { icon: Heart, name: 'Healthcare', description: 'Hospitals, clinics, health tech' },
    { icon: ShoppingCart, name: 'E-Commerce', description: 'DTC brands, retail, marketplaces' },
    { icon: GraduationCap, name: 'Education', description: 'Universities, edtech, online learning' },
    { icon: Utensils, name: 'Hospitality', description: 'Restaurants, hotels, travel' },
    { icon: Briefcase, name: 'Professional Services', description: 'Law firms, consultants, agencies' },
    { icon: Home, name: 'Real Estate', description: 'Brokerages, property tech, developers' },
    { icon: Rocket, name: 'Technology', description: 'SaaS, startups, enterprise software' },
  ];

  return (
    <section id="industries" className="py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Industries We Serve
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Deep Expertise Across{' '}
            <span className="relative">
              <span className="relative z-10">Sectors</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-amber-200/60 -z-10" />
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
            We've spent years mastering the unique challenges and opportunities 
            in each industry we serve.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-500 cursor-pointer"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors duration-500">
                <industry.icon className="w-6 h-6 text-slate-700 group-hover:text-amber-600 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{industry.name}</h3>
              <p className="text-sm text-slate-500">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Case Studies
function CaseStudies() {
  const caseStudies = [
    {
      client: 'TechFlow Inc.',
      industry: 'SaaS',
      challenge: 'Low conversion rates and outdated brand perception',
      solution: 'Complete rebrand with conversion-focused UX redesign',
      results: [
        { metric: '147%', label: 'Increase in conversions' },
        { metric: '3.2x', label: 'Higher demo bookings' },
        { metric: '$2.4M', label: 'Additional ARR' },
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    },
    {
      client: 'HealthFirst',
      industry: 'Healthcare',
      challenge: 'Complex patient portal with poor usability',
      solution: 'Intuitive patient experience with HIPAA-compliant infrastructure',
      results: [
        { metric: '89%', label: 'Patient satisfaction' },
        { metric: '65%', label: 'Reduction in support calls' },
        { metric: '4.8/5', label: 'App store rating' },
      ],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    },
    {
      client: 'Luxe Retail',
      industry: 'E-Commerce',
      challenge: 'High cart abandonment and slow load times',
      solution: 'Headless commerce with optimized checkout flow',
      results: [
        { metric: '43%', label: 'Cart abandonment reduction' },
        { metric: '2.1s', label: 'Average load time' },
        { metric: '156%', label: 'Revenue increase' },
      ],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    },
  ];

  return (
    <section id="work" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="max-w-3xl mb-20"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Featured Work
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Results That{' '}
            <span className="relative">
              <span className="relative z-10">Speak Volumes</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-amber-200/60 -z-10" />
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
            Every project is a partnership. Here's how we've helped businesses 
            transform their digital presence and achieve measurable growth.
          </motion.p>
        </motion.div>

        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={cn(
                'grid lg:grid-cols-2 gap-12 items-center',
                index % 2 === 1 ? 'lg:direction-rtl' : ''
              )}
            >
              <div className={cn(index % 2 === 1 ? 'lg:order-2' : '')}>
                <div className="relative group overflow-hidden rounded-2xl">
                  <img
                    src={study.image}
                    alt={study.client}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                    >
                      View Case Study
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className={cn(index % 2 === 1 ? 'lg:order-1' : '')}>
                <div className="inline-flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full mb-6">
                  <span className="text-xs font-semibold text-amber-700 uppercase">{study.industry}</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{study.client}</h3>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Challenge</h4>
                    <p className="text-slate-700">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Solution</h4>
                    <p className="text-slate-700">{study.solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {study.results.map((result) => (
                    <div key={result.label} className="text-center p-4 bg-slate-50 rounded-xl">
                      <div className="text-2xl font-bold text-slate-900 mb-1">{result.metric}</div>
                      <div className="text-xs text-slate-500">{result.label}</div>
                    </div>
                  ))}
                </div>

                <motion.a
                  href="#"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold group"
                >
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/25 inline-flex items-center gap-3"
          >
            View All Case Studies
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Process Section
function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      description: 'We dive deep into your business, audience, and goals. Through workshops and research, we uncover insights that shape the entire project.',
      duration: '1-2 weeks',
    },
    {
      number: '02',
      title: 'Design & Prototyping',
      description: 'Our designers craft pixel-perfect interfaces that balance aesthetics with usability. Interactive prototypes let you experience the final product before development.',
      duration: '2-4 weeks',
    },
    {
      number: '03',
      title: 'Development',
      description: 'Our engineers build with clean, scalable code. Regular updates and staging environments keep you informed and involved throughout the process.',
      duration: '4-8 weeks',
    },
    {
      number: '04',
      title: 'Testing & Launch',
      description: 'Rigorous QA across devices and browsers. We handle deployment, DNS configuration, and ensure a smooth go-live experience.',
      duration: '1-2 weeks',
    },
    {
      number: '05',
      title: 'Growth & Support',
      description: 'Launch is just the beginning. We provide ongoing optimization, analytics, and support to ensure your digital presence continues to perform.',
      duration: 'Ongoing',
    },
  ];

  return (
    <section id="process" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Our Process
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            A Proven Path to{' '}
            <span className="relative">
              <span className="relative z-10">Success</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-amber-200/60 -z-10" />
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
            We've refined our process over 12 years and 200+ projects. 
            Here's what working with us looks like.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-slate-200 lg:-translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'relative flex gap-8 lg:gap-0',
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                )}
              >
                {/* Content */}
                <div className={cn(
                  'flex-1 lg:w-1/2 pl-20 lg:pl-0',
                  index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                )}>
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100/30 transition-all duration-500">
                    <span className="text-5xl font-bold text-slate-100">{step.number}</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">{step.title}</h3>
                    <p className="text-slate-600 mb-4">{step.description}</p>
                    <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {step.duration}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 lg:left-1/2 top-10 w-4 h-4 bg-amber-400 rounded-full -translate-x-1/2 border-4 border-white shadow-lg" />

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Technologies Section
function Technologies() {
  const technologies = [
    { name: 'WordPress', icon: Globe, category: 'CMS' },
    { name: 'Shopify', icon: ShoppingCart, category: 'E-Commerce' },
    { name: 'React', icon: Code, category: 'Frontend' },
    { name: 'Next.js', icon: Monitor, category: 'Frontend' },
    { name: 'Node.js', icon: Database, category: 'Backend' },
    { name: 'Laravel', icon: Code, category: 'Backend' },
    { name: 'Tailwind CSS', icon: Palette, category: 'Styling' },
    { name: 'AWS', icon: Cloud, category: 'Infrastructure' },
    { name: 'Figma', icon: Layers, category: 'Design' },
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Technology Stack
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Built With Modern, Scalable Technologies
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
            We choose the right tools for each project, ensuring performance, 
            scalability, and maintainability.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group flex flex-col items-center p-6 bg-slate-50 rounded-xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100/50 hover:border-amber-200 border border-transparent transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                <tech.icon className="w-6 h-6 text-slate-700 group-hover:text-amber-600 transition-colors" />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">{tech.name}</span>
              <span className="text-xs text-slate-400">{tech.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: 'Award-Winning Quality',
      description: 'Our work has been recognized by industry leaders. We don\'t cut corners—we set new standards.',
    },
    {
      icon: Target,
      title: 'Business-First Approach',
      description: 'We start with your business goals, not design trends. Every decision drives measurable outcomes.',
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: "Your data and your customers' data are protected with industry-leading security practices.",
    },
    {
      icon: Zap,
      title: 'Lightning Performance',
      description: 'We optimize for speed. Fast sites rank better, convert better, and keep users engaged.',
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'You get a dedicated team, not a rotating cast. We invest in understanding your business deeply.',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Decisions',
      description: 'We use analytics and user research to inform every design and development decision.',
    },
  ];

  return (
    <section id="about" className="py-32 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="max-w-3xl mb-20"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Why Vanguard Digital
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
            The Difference Between{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
              Good & Great
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-400 leading-relaxed">
            Anyone can build a website. We build strategic assets that transform businesses. 
            Here's what sets us apart.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <reason.icon className="w-7 h-7 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-slate-400 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-800/50 backdrop-blur-sm px-8 py-6 rounded-2xl border border-slate-700">
            <div className="text-left">
              <p className="text-white font-semibold mb-1">See the Vanguard Digital difference</p>
              <p className="text-slate-400 text-sm">Schedule a call to discuss your project.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Book Your Call
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      quote: "Vanguard Digital transformed our entire digital presence. Our conversion rate increased by 147% within three months of launch. They're not just designers—they're strategic partners.",
      author: "Sarah Chen",
      role: "CEO, TechFlow Inc.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      quote: "The team's attention to detail and business acumen is unmatched. They understood our complex requirements and delivered a solution that exceeded our expectations.",
      author: "Michael Rodriguez",
      role: "CTO, HealthFirst",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      quote: "Working with Vanguard was the best investment we made this year. Our new e-commerce platform has generated $2M in additional revenue.",
      author: "Emma Thompson",
      role: "Founder, Luxe Retail",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Client Testimonials
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What Our{' '}
            <span className="relative">
              <span className="relative z-10">Clients Say</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-amber-200/60 -z-10" />
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-amber-200 transition-colors" />
              
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed mb-8">"{testimonial.quote}"</p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Our Presence Section (USA Map)
function OurPresence() {
  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Our Presence
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Serving Businesses{' '}
            <span className="relative">
              <span className="relative z-10">Across America</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-amber-200/60 -z-10" />
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
            While we're based in San Francisco, we proudly serve clients across all 50 states. 
            Distance is never a barrier to exceptional service.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* USA Map SVG */}
          <div className="aspect-[1.6/1] bg-white rounded-2xl border border-slate-200 p-8 shadow-lg shadow-slate-200/50">
            <svg viewBox="0 0 960 600" className="w-full h-full">
              {/* Simplified USA map outline */}
              <path
                d="M150,200 L200,180 L250,190 L300,170 L350,180 L400,160 L450,170 L500,150 L550,160 L600,140 L650,150 L700,130 L750,140 L800,120 L820,150 L840,200 L850,250 L840,300 L820,350 L800,400 L750,420 L700,440 L650,450 L600,460 L550,470 L500,460 L450,470 L400,460 L350,470 L300,460 L250,450 L200,430 L150,400 L120,350 L100,300 L110,250 Z"
                fill="#f1f5f9"
                stroke="#e2e8f0"
                strokeWidth="2"
              />
              
              {/* State-like regions */}
              <g className="opacity-30">
                <rect x="200" y="200" width="80" height="60" fill="#cbd5e1" rx="4" />
                <rect x="300" y="180" width="70" height="70" fill="#cbd5e1" rx="4" />
                <rect x="400" y="200" width="90" height="50" fill="#cbd5e1" rx="4" />
                <rect x="520" y="180" width="80" height="80" fill="#cbd5e1" rx="4" />
                <rect x="630" y="200" width="100" height="60" fill="#cbd5e1" rx="4" />
                <rect x="250" y="280" width="80" height="70" fill="#cbd5e1" rx="4" />
                <rect x="360" y="270" width="90" height="80" fill="#cbd5e1" rx="4" />
                <rect x="480" y="280" width="85" height="75" fill="#cbd5e1" rx="4" />
                <rect x="590" y="290" width="95" height="65" fill="#cbd5e1" rx="4" />
                <rect x="300" y="370" width="100" height="60" fill="#cbd5e1" rx="4" />
                <rect x="430" y="380" width="90" height="55" fill="#cbd5e1" rx="4" />
              </g>

              {/* Location markers */}
              {[
                { x: 180, y: 280, label: 'San Francisco, CA' },
                { x: 320, y: 240, label: 'Denver, CO' },
                { x: 560, y: 220, label: 'Chicago, IL' },
                { x: 720, y: 260, label: 'New York, NY' },
                { x: 680, y: 380, label: 'Atlanta, GA' },
                { x: 450, y: 400, label: 'Dallas, TX' },
                { x: 280, y: 350, label: 'Phoenix, AZ' },
                { x: 600, y: 320, label: 'Nashville, TN' },
              ].map((location, index) => (
                <motion.g
                  key={location.label}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <circle cx={location.x} cy={location.y} r="8" fill="#f59e0b" className="animate-pulse" />
                  <circle cx={location.x} cy={location.y} r="16" fill="#f59e0b" fillOpacity="0.2" />
                  <text
                    x={location.x + 14}
                    y={location.y + 4}
                    className="text-xs fill-slate-600 font-medium"
                    style={{ fontSize: '12px' }}
                  >
                    {location.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: '50', label: 'States Served' },
              { value: '25+', label: 'Major Cities' },
              { value: '100%', label: 'Remote Friendly' },
              { value: '24/7', label: 'Support Coverage' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center p-4 bg-white rounded-xl border border-slate-200"
              >
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is your typical project timeline?',
      answer: 'Most projects take 8-16 weeks from discovery to launch. Complex e-commerce or enterprise solutions may take longer. We provide detailed timelines during our initial consultation and keep you updated throughout the process.',
    },
    {
      question: 'What is your pricing structure?',
      answer: 'We work on a project basis with pricing typically ranging from $10,000 to $50,000+ depending on scope and complexity. We also offer retainer arrangements for ongoing work. During our strategy call, we\'ll discuss your specific needs and provide a tailored proposal.',
    },
    {
      question: 'Do you work with startups or only established businesses?',
      answer: 'We work with both. While we specialize in serving established businesses ready to scale, we also partner with well-funded startups who understand the value of premium digital experiences from day one.',
    },
    {
      question: 'What happens after the website launches?',
      answer: 'We provide 30 days of complimentary post-launch support. Beyond that, we offer various maintenance and optimization packages. Many clients continue working with us on an ongoing basis for updates, new features, and performance optimization.',
    },
    {
      question: 'How do you handle revisions and feedback?',
      answer: 'We build revision rounds into our process at key milestones. We believe in collaborative partnerships and work closely with you to ensure the final product exceeds your expectations. Clear communication is central to our approach.',
    },
    {
      question: 'Can you work with our existing brand guidelines?',
      answer: 'Absolutely. We respect and work within existing brand guidelines while ensuring the digital experience is optimized for the web. If you don\'t have brand guidelines, we can help develop them as part of our branding services.',
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            FAQ
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Common{' '}
            <span className="relative">
              <span className="relative z-10">Questions</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-amber-200/60 -z-10" />
            </span>
          </motion.h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTA() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p variants={fadeInUp} className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-6">
            Ready to Transform Your Digital Presence?
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Let's Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
              Extraordinary
            </span>
            <br />
            Together
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Schedule a free 30-minute strategy call. We'll discuss your goals, 
            challenges, and how we can help you achieve exceptional results.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-amber-400 text-slate-900 px-8 py-4 rounded-xl text-base font-semibold hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/25 flex items-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              Book Your Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-sm text-slate-500"
          >
            No pressure. No sales pitch. Just a conversation about your goals.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Let's Start a{' '}
              <span className="relative">
                <span className="relative z-10">Conversation</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-amber-200/60 -z-10" />
              </span>
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Have a project in mind? We'd love to hear about it. 
              Fill out the form and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Visit Us</div>
                  <div className="text-slate-500">123 Market Street, San Francisco, CA 94103</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Call Us</div>
                  <div className="text-slate-500">+1 (415) 555-0123</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Email Us</div>
                  <div className="text-slate-500">hello@vanguarddigital.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Business Hours</div>
                  <div className="text-slate-500">Mon - Fri: 9:00 AM - 6:00 PM PST</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                  placeholder="Your Company"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Project Budget</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all bg-white">
                  <option value="">Select budget range</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tell Us About Your Project</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all resize-none"
                  placeholder="Describe your project, goals, and timeline..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/25 flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: ['Brand & UI/UX Design', 'Web Development', 'E-Commerce', 'Mobile Apps', 'SEO & Performance'],
    Company: ['About Us', 'Careers', 'Blog', 'Press', 'Contact'],
    Resources: ['Case Studies', 'Industries', 'Technologies', 'FAQ', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">Vanguard Digital</span>
            </a>
            <p className="text-slate-400 mb-6 max-w-xs leading-relaxed">
              Premium web design and development for businesses that refuse to compromise.
            </p>
            <div className="flex items-center gap-4">
              {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors"
                >
                  <span className="text-xs font-semibold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Vanguard Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span>Made with precision in San Francisco</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navigation />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Industries />
        <CaseStudies />
        <Process />
        <Technologies />
        <WhyChooseUs />
        <Testimonials />
        <OurPresence />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
