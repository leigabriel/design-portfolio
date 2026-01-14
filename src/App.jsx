import { ThemeProvider, useTheme } from './context/ThemeContext'
import { useSecurityProtection } from './hooks/useSecurityProtection'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ContentsSection from './components/ContentsSection'
import PosterTitleSection from './components/PosterTitleSection'
import PostersSection from './components/PostersSection'
import WebTitleSection from './components/WebTitleSection'
import WebProjectSection from './components/WebProjectSection'
import ContactSection from './components/ContactSection'

function AppContent() {
    const { isDarkMode } = useTheme()
    useSecurityProtection()

    return (
        <main className={isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]'}>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ContentsSection />
            <PosterTitleSection />
            <PostersSection />
            <WebTitleSection />
            <WebProjectSection />
            <ContactSection />
        </main>
    )
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    )
}

export default App
