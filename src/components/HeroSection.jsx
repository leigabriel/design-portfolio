import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import anime from 'animejs'
import { useTheme } from '../context/ThemeContext'

const portfolioItems = [
  { 
    id: 1, 
    image: '/img/01.png',
    rotate: -6,
    dominantColor: '#E84A5F',
    glowColor: 'rgba(232, 74, 95, 0.4)'
  },
  { 
    id: 2, 
    image: '/img/02.png',
    rotate: -2,
    dominantColor: '#4A90A4',
    glowColor: 'rgba(74, 144, 164, 0.4)'
  },
  { 
    id: 3, 
    image: '/img/03.png',
    rotate: 3,
    dominantColor: '#F5A623',
    glowColor: 'rgba(245, 166, 35, 0.4)'
  },
  { 
    id: 4, 
    image: '/img/04.png',
    rotate: -1,
    dominantColor: '#7B68EE',
    glowColor: 'rgba(123, 104, 238, 0.4)'
  },
  { 
    id: 5, 
    image: '/img/05.png',
    rotate: 2,
    dominantColor: '#50C878',
    glowColor: 'rgba(80, 200, 120, 0.4)'
  },
  { 
    id: 6, 
    image: '/img/06.png',
    rotate: 5,
    dominantColor: '#FF6B6B',
    glowColor: 'rgba(255, 107, 107, 0.4)'
  },
]

function ImagePopup({ item }) {
  return createPortal(
    <div 
      className="fixed inset-0 pointer-events-none hidden md:flex items-center justify-center"
      style={{ zIndex: 99999 }}
    >
      <div 
        className="relative rounded-lg overflow-hidden"
        style={{
          boxShadow: `0 40px 80px ${item.glowColor}, 0 0 60px ${item.glowColor}`,
          animation: 'popupFade 0.3s ease-out forwards'
        }}
      >
        <img 
          src={item.image} 
          alt={`Project ${item.id} Preview`}
          className="w-[400px] h-auto object-contain"
          draggable="false"
        />
      </div>
    </div>,
    document.body
  )
}

function PortfolioCard({ item, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        translateY: [100, 0],
        opacity: [0, 1],
        rotate: [0, item.rotate],
        duration: 800,
        delay: 200 + (index * 100),
        easing: 'easeOutCubic'
      })
    }
  }, [index, item.rotate])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        scale: 1.15,
        rotate: 0,
        duration: 400,
        easing: 'easeOutCubic'
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        scale: 1,
        rotate: item.rotate,
        duration: 400,
        easing: 'easeOutCubic'
      })
    }
  }

  return (
    <div className="relative">
      <div
        ref={cardRef}
        className="portfolio-card relative w-16 sm:w-16 md:w-32 lg:w-40 xl:w-44 aspect-[5/7] overflow-hidden cursor-pointer opacity-0"
        style={{ 
          transform: `rotate(${item.rotate}deg)`,
          boxShadow: isHovered 
            ? `0 30px 60px ${item.glowColor}, 0 0 40px ${item.glowColor}`
            : '0 25px 50px rgba(0, 0, 0, 0.25)',
          transition: 'box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '2px'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${item.dominantColor}20, transparent)`,
            opacity: isHovered ? 0.6 : 0,
            transition: 'opacity 0.4s'
          }}
        />
        <img 
          src={item.image} 
          alt={`Project ${item.id}`}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable="false"
        />
      </div>

      {isHovered && <ImagePopup item={item} />}
    </div>
  )
}

function HeroSection() {
  const { isDarkMode, toggleTheme } = useTheme()
  const titleRef = useRef(null)
  const headerRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
        easing: 'easeOutCubic'
      })
    }

    if (headerRef.current) {
      anime({
        targets: headerRef.current.children,
        opacity: [0, 1],
        translateY: [-20, 0],
        delay: anime.stagger(100, { start: 600 }),
        duration: 600,
        easing: 'easeOutCubic'
      })
    }

    if (footerRef.current) {
      anime({
        targets: footerRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100, { start: 800 }),
        duration: 600,
        easing: 'easeOutCubic'
      })
    }
  }, [])

  return (
    <section 
      className={`relative h-screen overflow-visible transition-colors duration-500 ${
        isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]'
      }`}
    >
      <style>{`
        @keyframes popupFade {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <header 
        ref={headerRef}
        className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 md:top-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex justify-between items-start z-50"
      >
        <h1 
          className={`text-[10px] sm:text-xs md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase opacity-0 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Lei Gabriel
        </h1>
        <span 
          className={`text-[10px] sm:text-xs md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-right opacity-0 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Design.Portfolio <br />
          <button 
            onClick={toggleTheme}
            className="hover:underline cursor-pointer transition-all duration-300 hover:opacity-80"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            [.{isDarkMode ? 'Light' : 'Dark'} Mode]
          </button>
        </span>
      </header>

      <div className="absolute inset-0 flex items-center justify-center z-10 translate-y-[-10%]">
        <h2 
          ref={titleRef}
          className={`font-[Timetwist] text-[45px] sm:text-[70px] md:text-[120px] lg:text-[130px] xl:text-[150px] font-black tracking-[-0.02em] leading-none select-none opacity-0 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          PORTFOLIO
        </h2>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div 
          className="flex items-end justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 translate-y-[25%]"
          style={{ perspective: '1000px' }}
        >
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <footer 
        ref={footerRef}
        className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex justify-between items-end z-50"
      >
        <span 
          className={`text-[10px] sm:text-xs md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase opacity-0 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Portfolio 2025
        </span>
        <span 
          className={`text-[10px] sm:text-xs md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase opacity-0 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Graphic Designer / <br className="sm:hidden" />
          Web Developer
        </span>
      </footer>
    </section>
  )
}

export default HeroSection
