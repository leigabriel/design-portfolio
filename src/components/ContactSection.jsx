const socialLinks = [
    { name: 'Email', value: 'malibiranleigabriel@gmail.com', href: 'mailto:malibiranleigabriel@gmail.com', icon: '✉' },
    { name: 'Location', value: 'Oriental Mindoro, Philippines', href: null, icon: '◎' },
    { name: 'Tiktok', value: '@leimxnsquare', href: 'https://tiktok.com/leimxnsquare', icon: '♪' },
    { name: 'Instagram', value: '@leimxnsquare', href: 'https://instagram.com/leimxnsquare', icon: '◈' }
]

function ContactSection() {
    return (
        <section id="contact" className="folder-section relative min-h-[40vh] overflow-hidden bg-[#000000]">
            <div className="section-padding flex flex-col justify-between h-full">
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="section-title text-white">[.CONTACT]</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                        {socialLinks.map((link) => (
                            <div key={link.name} className="group">
                                <div className="flex items-start gap-3 md:gap-4">
                                    <span className="contact-icon flex-shrink-0 text-white/60 group-hover:text-[#7FB3D5] transition-colors">{link.icon}</span>
                                    <div className="min-w-0 flex-1">
                                        <span className="contact-label text-white/50">{link.name}</span>
                                        {link.href ? (
                                            <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="contact-value block text-white hover:text-[#7FB3D5] break-words transition-colors">{link.value}</a>
                                        ) : (
                                            <p className="contact-value text-white break-words">{link.value}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 md:mt-16">
                        <p className="intro-text text-white/50">Open for freelance projects and collaborations</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2 sm:gap-0 pt-6 md:pt-8">
                    <span className="section-footer-text text-white/60"></span>
                    <span className="section-footer-text text-white/60">© All Right Reserved 2026 Lei Gabriel</span>
                </div>
            </div>
        </section>
    )
}

export default ContactSection