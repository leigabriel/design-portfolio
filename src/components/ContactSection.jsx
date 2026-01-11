import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const socialLinks = [
  { name: 'Email', value: 'malibiranleigabriel@gmail.com', href: 'mailto:malibiranleigabriel@gmail.com', icon: '✉' },
  { name: 'Phone', value: '+639918771305', href: 'tel:+639918771305', icon: '☎' },
  { name: 'Instagram', value: '@leimxnsquare', href: 'https://instagram.com/leimxnsquare', icon: '◈' },
  { name: 'Location', value: 'Oriental Mindoro, Philippines', href: null, icon: '◎' }
]

function ContactSection() {
  const { isDarkMode } = useTheme()
  const titleRef = useScrollAnimation({ animation: 'fadeLeft', delay: 0 })
  const contactRef = useStaggerAnimation({ selector: '.contact-item', animation: 'rotateIn', stagger: 120, delay: 200 })

  const textColor = isDarkMode ? 'text-white' : 'text-black'
  const textMuted = isDarkMode ? 'text-white/50' : 'text-black/50'
  const footerText = isDarkMode ? 'text-white/60' : 'text-black/80'
  const iconMuted = isDarkMode ? 'text-white/60 group-hover:text-[#7FB3D5]' : 'text-black/50 group-hover:text-[#7FB3D5]'

  return (
    <section id="contact" className={`relative min-h-[70vh] overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]'}`}>
      <div className="section-padding flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <h2 ref={titleRef} className={`section-title transition-colors duration-500 ${textColor}`}>[.CONTACT]</h2>

          <div ref={contactRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {socialLinks.map((link) => (
              <div key={link.name} className="contact-item group">
                <div className="flex items-start gap-4">
                  <span className={`contact-icon transition-colors duration-300 ${iconMuted}`}>{link.icon}</span>
                  <div>
                    <span className={`contact-label block transition-colors duration-500 ${textMuted}`}>{link.name}</span>
                    {link.href ? (
                      <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={`contact-value block transition-all duration-300 hover:translate-x-1 ${textColor} hover:text-[#7FB3D5]`}>{link.value}</a>
                    ) : (
                      <p className={`contact-value transition-colors duration-500 ${textColor}`}>{link.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 sm:mt-16">
            <p className={`intro-text transition-colors duration-500 ${textMuted}`}>Open for freelance projects and collaborations</p>
          </div>
        </div>

        <div className="flex justify-between items-end pt-8">
          <span className={`section-footer-text transition-colors duration-500 ${footerText}`}>© 2026 Lei Gabriel</span>
          <span className={`section-footer-text transition-colors duration-500 ${footerText}`}>Crafted with passion</span>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
