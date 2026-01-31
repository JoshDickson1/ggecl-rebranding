import { Play, ArrowRight } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AboutSect = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-[#1e3a5f] dark:text-blue-400 font-black uppercase tracking-[0.3em] text-xs">
              Documentation
            </h4>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter uppercase">
              Welcome to our <br />
              <span className="text-[#1e3a5f] dark:text-blue-500">Platform!</span>
            </h2>
          </div>

          <div className="space-y-6 text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
            <p>
              We are dedicated to providing top-quality educational experiences to empower learners around the world. Our programs are designed to nurture curiosity, foster innovation, and build a global community of passionate leaders.
            </p>
            <p className="text-sm border-l-4 border-slate-100 dark:border-slate-800 pl-6 italic">
              Through us, you are not just studying; you are joining a professional ecosystem designed to help individuals excel in their career paths and personal lives!
            </p>
          </div>

          {/* Buttons Side by Side */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button className="h-14 flex flex-row items-center px-8 rounded-full bg-[#1e3a5f] hover:bg-[#152a45] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest transition-all hover:translate-x-1 group">
              <span>Learn More</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Video Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-14 px-8 rounded-full border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-full h-full bg-blue-500/20 rounded-full animate-ping" />
                    <Play size={16} className="fill-[#1e3a5f] text-[#1e3a5f] dark:fill-blue-400 dark:text-blue-400 relative z-10" />
                  </div>
                  Play Video
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black rounded-[2rem] border-none">
                <DialogHeader className="p-6 bg-white dark:bg-slate-900 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
                  <DialogTitle className="text-sm font-black uppercase tracking-widest text-[#1e3a5f] dark:text-blue-400">
                    Discover Our Campus
                  </DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video ID
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Right Content - Image Collage */}
        <div className="relative">
          <div className="relative z-10 rounded-[3rem] overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
            <img 
              src="/about-sect.png" 
              alt="Campus main" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#1e3a5f]/5 rounded-full blur-2xl -z-10" />
          
        </div>

      </div>
    </section>
  );
};

export default AboutSect;