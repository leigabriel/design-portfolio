import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

function ContactSection() {
  const { isDarkMode } = useTheme()
  const titleRef = useScrollAnimation({ animation: 'fadeUp', delay: 0 })
  const contactRef = useStaggerAnimation({ 
    selector: '.contact-item', 
    animation: 'fadeUp', 
    stagger: 100,
    delay: 200 
  })

  const socialLinks = [
    { 
      name: 'Email', 
      value: 'malibiranleigabriel@gmail.com', 
      href: 'mailto:malibiranleigabriel@gmail.com',
      icon: '✉'
    },
    { 
      name: 'Phone', 
      value: '+639918771305', 
      href: 'tel:+639918771305',
      icon: '☎'
    },
    { 
      name: 'Instagram', 
      value: '@leimxnsquare', 
      href: 'https://instagram.com/leimxnsquare',
      icon: '◈'
    },
    { 
      name: 'Location', 
      value: 'Oriental Mindoro, Philippines', 
      href: null,
      icon: '◎'
    }
  ]

  return (
    <section 
      id="contact"
      className={`relative min-h-[70vh] overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]'
      }`}
    >
      <div className="absolute top-4 bottom-4 left-4 right-4 sm:top-6 sm:bottom-6 sm:left-6 sm:right-6 md:top-8 md:bottom-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex flex-col justify-between">
        
        <div className="flex-1 flex flex-col justify-center">
          <h2 
            ref={titleRef}
            className={`font-[Timetwist] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-10 sm:mb-14 md:mb-16 transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            [.CONTACT]
          </h2>

          <div ref={contactRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {socialLinks.map((link) => (
              <div 
                key={link.name}
                className="contact-item group"
              >
                <div className="flex items-start gap-4">
                  <span 
                    className={`text-2xl sm:text-3xl transition-colors duration-300 ${
                      isDarkMode ? 'text-white/60 group-hover:text-[#7FB3D5]' : 'text-black/50 group-hover:text-[#7FB3D5]'
                    }`}
                  >
                    {link.icon}
                  </span>
                  <div>
                    <span 
                      className={`block text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-1 transition-colors duration-500 ${
                        isDarkMode ? 'text-white/50' : 'text-black/50'
                      }`}
                    >
                      {link.name}
                    </span>
                    {link.href ? (
                      <a 
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`block text-lg sm:text-xl md:text-2xl font-semibold transition-all duration-300 hover:translate-x-1 ${
                          isDarkMode 
                            ? 'text-white hover:text-[#7FB3D5]' 
                            : 'text-black hover:text-[#7FB3D5]'
                        }`}
                      >
                        {link.value}
                      </a>
                    ) : (
                      <p 
                        className={`text-lg sm:text-xl md:text-2xl font-semibold transition-colors duration-500 ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                      >
                        {link.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16">
            <p 
              className={`text-sm sm:text-base md:text-lg font-medium uppercase tracking-[0.15em] transition-colors duration-500 ${
                isDarkMode ? 'text-white/60' : 'text-black/60'
              }`}
            >
              Open for freelance projects and collaborations
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end pt-8">
          <span 
            className={`text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-white/60' : 'text-black/80'
            }`}
          >
            © 2025 Lei Gabriel
          </span>
          <span 
            className={`text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-white/60' : 'text-black/80'
            }`}
          >
            Crafted with passion
          </span>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
