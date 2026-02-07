import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, FileSearch, Image, ArrowRight, Shield, Zap, Users, CheckCircle, Download } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: PlayCircle,
      title: "Click or Cap Game",
      description: "Swipe through real vs fake headlines. Train your misinformation radar in a fun, addictive way.",
      color: "#e12320",
      link: "/dashboard/play"
    },
    {
      icon: FileSearch,
      title: "Text Analysis",
      description: "AI-powered detection of hate speech, misinformation, and toxic content in real-time.",
      color: "#000000",
      link: "/dashboard/analyze"
    },
    {
      icon: Image,
      title: "Image Analysis",
      description: "Detect manipulated images, deepfakes, and visual misinformation with advanced AI.",
      color: "#e12320",
      link: "/dashboard/image-analysis"
    }
  ];

  const stats = [
    { value: "10K+", label: "Headlines Analyzed" },
    { value: "95%", label: "Detection Accuracy" },
    { value: "Free", label: "No Signup Required" }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Choose Your Tool",
      description: "Pick from our suite of AI-powered detection and training tools."
    },
    {
      step: "2",
      title: "Upload or Play",
      description: "Input text, images, or start playing the Click or Cap game."
    },
    {
      step: "3",
      title: "Get Insights",
      description: "Receive instant AI analysis and actionable recommendations."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b-[3px] border-black z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_#e12320] rounded-xl overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter">
              Click or <span className="text-[#e12320]">Cap</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="#"
              className="px-6 py-2 bg-white text-black font-bold uppercase tracking-wide border-[3px] border-black shadow-[4px_4px_0px_0px_#e12320] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-lg flex items-center gap-2"
            >
              <Download size={20} />
              Download Extension
            </a>
            <Link 
              to="/dashboard"
              className="px-6 py-2 bg-black text-white font-bold uppercase tracking-wide border-[3px] border-black shadow-[4px_4px_0px_0px_#e12320] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-lg"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
              Stop the Spread of <span className="text-[#e12320]">Misinformation</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-700 mb-12 max-w-3xl mx-auto">
              AI-powered tools to detect hate speech, fake news, and toxic content. 
              Train your critical thinking. Build a better internet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/dashboard/play"
                className="group px-8 py-4 bg-[#e12320] text-white font-black uppercase tracking-widest border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all rounded-xl flex items-center gap-2 text-lg"
              >
                Start Playing
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
              <Link 
                to="/dashboard/analyze"
                className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] transition-all rounded-xl text-lg"
              >
                Try Analysis
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white border-[3px] border-black p-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                <div className="text-4xl font-black text-[#e12320] mb-2">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-wide text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
              Powerful <span className="text-[#e12320]">AI Tools</span>
            </h2>
            <p className="text-xl font-bold text-gray-600 max-w-2xl mx-auto">
              Everything you need to combat misinformation and build healthier online communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={feature.link}
                  className="group block bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all rounded-xl h-full"
                >
                  <div 
                    className="w-16 h-16 border-[3px] border-black flex items-center justify-center mb-6 rounded-lg"
                    style={{ backgroundColor: feature.color }}
                  >
                    <feature.icon size={32} className="text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-3">{feature.title}</h3>
                  <p className="text-gray-700 font-medium leading-relaxed">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-[#e12320] font-bold group-hover:translate-x-2 transition-transform">
                    Try it now <ArrowRight size={20} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
              How It <span className="text-[#e12320]">Works</span>
            </h2>
            <p className="text-xl font-bold text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#e12320] border-[3px] border-black text-white text-3xl font-black flex items-center justify-center mx-auto mb-6 rounded-full">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-3">{item.title}</h3>
                  <p className="text-gray-700 font-medium flex-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-6 bg-white border-y-[3px] border-black">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <Shield size={48} className="text-[#e12320]" strokeWidth={2.5} />
              <h3 className="font-black uppercase text-lg">AI-Powered</h3>
              <p className="text-gray-600 font-medium text-sm">Cutting-edge detection technology</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Zap size={48} className="text-[#e12320]" strokeWidth={2.5} />
              <h3 className="font-black uppercase text-lg">100% Free</h3>
              <p className="text-gray-600 font-medium text-sm">No hidden fees, no subscriptions</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Users size={48} className="text-[#e12320]" strokeWidth={2.5} />
              <h3 className="font-black uppercase text-lg">Community Driven</h3>
              <p className="text-gray-600 font-medium text-sm">Join thousands fighting misinformation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Ready to Make a <span className="text-[#e12320]">Difference?</span>
          </h2>
          <p className="text-xl font-bold text-gray-300 mb-10">
            Join the fight against misinformation. No signup required. Start now.
          </p>
          <Link 
            to="/dashboard"
            className="inline-block px-12 py-5 bg-[#e12320] text-white font-black uppercase tracking-widest border-[3px] border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all rounded-xl text-xl"
          >
            Launch Dashboard
          </Link>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-[#e12320]" />
              No Credit Card
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-[#e12320]" />
              No Signup
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-[#e12320]" />
              100% Free
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t-[3px] border-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-bold text-gray-600">
            © 2026 Click or Cap. Fighting misinformation with AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
