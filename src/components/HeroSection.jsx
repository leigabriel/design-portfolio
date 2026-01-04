const portfolioItems = [
  { 
    id: 1, 
    image: '../../public/img/01.png',
    rotate: -6
  },
  { 
    id: 2, 
      image: '../../public/img/02.png',
    rotate: -2
  },
  { 
    id: 3, 
    image: '../../public/img/03.png',
    rotate: 3
  },
  { 
    id: 4, 
    image: '../../public/img/04.png',
    rotate: -1
  },
  { 
    id: 5, 
    image: '../../public/img/05.png',
    rotate: 2
  },
  { 
    id: 6, 
    image: '../../public/img/06.png',
    rotate: 5
  },
]

function HeroSection() {
  return (
    <section className="relative h-screen bg-[#f2f2f2] overflow-hidden">
      <header className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 md:top-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex justify-between items-start z-50">
        <h1 className="text-[10px] sm:text-xs md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.25em] text-black uppercase">
          Lei Gabriel
        </h1>
        <span className="text-[10px] sm:text-xs md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.25em] text-black uppercase">
          Design.Portfolio
        </span>
      </header>

      <div className="absolute inset-0 flex items-center justify-center z-10 translate-y-[-10%]">
        <h2 className="font-[Timetwist] text-[40px] sm:text-[70px] md:text-[120px] lg:text-[130px] xl:text-[150px] font-black tracking-[-0.02em] text-black leading-none select-none">
          PORTFOLIO
        </h2>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="flex items-end justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 translate-y-[25%]">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="portfolio-card relative w-12 sm:w-16 md:w-32 lg:w-40 xl:w-44 aspect-[3/4] rounded-md sm:rounded-lg overflow-hidden shadow-2xl cursor-pointer"
              style={{ 
                transform: `rotate(${item.rotate}deg)`,
              }}
            >
              <img 
                src={item.image} 
                alt={`Project ${item.id}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex justify-between items-end z-50">
        <div className="text-[8px] sm:text-[10px] md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] text-black uppercase leading-relaxed">
          <p>Graphic, Poster, Web Design</p>
          <p>Photography</p>
        </div>
        <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-black">
          2026
        </span>
      </footer>
    </section>
  )
}

export default HeroSection
