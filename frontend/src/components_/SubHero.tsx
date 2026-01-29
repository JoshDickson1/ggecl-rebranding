const SubHero = () => {
  return (
    <div>
        <div className="bg-[#1e2a44] w-full py-5 md:py-10 flex items-center justify-center">
            {/* SubHero Images (flexbox) */}
            <div className="w-full px-4 flex flex-wrap gap-6 md:gap-8 justify-center md:justify-evenly items-center animate-fade-in">
                <img 
                  src="/image1.svg" 
                  alt="" 
                  className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer" 
                />
                <img 
                  src="/image2.svg" 
                  alt="" 
                  className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer" 
                />
                <img 
                  src="/image3.svg" 
                  alt="" 
                  className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer" 
                />
                <img 
                  src="/image4.svg" 
                  alt="" 
                  className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer" 
                />
                <img 
                  src="/image5.svg" 
                  alt="" 
                  className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer" 
                />
            </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `}</style>
    </div>
  )
}

export default SubHero