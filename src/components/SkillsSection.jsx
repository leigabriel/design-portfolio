import { useEffect, useState } from 'react'

const softwareIcon = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20id%3D%22Coding-Apps-Websites--Streamline-Pixel%22%3E%3Cdesc%3ECoding%20Apps%20Websites%20Streamline%20Icon%3A%20https%3A%2F%2Fstreamlinehq.com%3C%2Fdesc%3E%3Ctitle%3Ecoding-apps-websites%3C%2Ftitle%3E%3Cg%3E%3Cpath%20d%3D%22M30.48%201.53H32v28.95h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M1.52%2030.48h28.96V32H1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M28.95%203.05H3.05v25.91h25.9ZM15.24%206.1h1.52v6.09h-1.52Zm-6.1%200h4.57v6.09H9.14Zm-3.04%200h1.52v6.09H6.1Zm0%207.62h4.57v6.09H6.1Zm6.09%2012.19h-1.52v1.52H9.14v-1.52h1.53v-3.05H9.14v-1.52h1.53v1.52h1.52Zm0%20-12.19h1.52v6.09h-1.52Zm6.1%2013.71h-4.58v-1.52h4.58Zm-3.05%20-7.62v-6.09h4.57v6.09Zm7.62%203.05h-1.53v3.05h1.53v1.52h-1.53v-1.52h-1.52v-3.05h1.52v-1.52h1.53Zm0%20-3.05h-1.53v-6.09h1.53Zm0%20-7.62h-4.57V6.1h4.57Zm3.04%207.62h-1.52v-6.09h1.52Zm0%20-7.62h-1.52V6.1h1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M19.81%207.62h1.52v3.05h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M16.76%2015.24h1.53v3.05h-1.53Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M10.67%207.62h1.52v3.05h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M7.62%2015.24h1.52v3.05H7.62Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M1.52%200h28.96v1.53H1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M0%201.53h1.52v28.95H0Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E"

const coreSkillsIcon = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20id%3D%22User-Single-Aim--Streamline-Pixel%22%3E%3Cdesc%3EUser%20Single%20Aim%20Streamline%20Icon%3A%20https%3A%2F%2Fstreamlinehq.com%3C%2Fdesc%3E%3Ctitle%3Euser-single-aim%3C%2Ftitle%3E%3Cg%3E%3Cpath%20d%3D%22m30.47%2012.19%20-1.52%200%200%203.05%20-1.52%200%200%201.52%201.52%200%200%203.05%201.52%200%200%20-3.05%201.53%200%200%20-1.52%20-1.53%200%200%20-3.05z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M27.43%2019.81h1.52v3.05h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M27.43%209.14h1.52v3.05h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M25.9%2022.86h1.53v3.04H25.9Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M25.9%206.09h1.53v3.05H25.9Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m24.38%2024.38%20-1.53%200%200%203.05%203.05%200%200%20-1.53%20-1.52%200%200%20-1.52z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M22.85%204.57h3.05v1.52h-3.05Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M19.81%2027.43h3.04v1.52h-3.04Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M19.81%2022.86h3.04v1.52h-3.04Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M19.81%2019.81h1.52v1.52h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M19.81%203.05h3.04v1.52h-3.04Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M18.28%2013.71h1.53v3.05h-1.53Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m16.76%2027.43%20-1.53%200%200%201.52%20-3.04%200%200%201.53%203.04%200%200%201.52%201.53%200%200%20-1.52%203.05%200%200%20-1.53%20-3.05%200%200%20-1.52z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M12.19%2021.33h7.62v1.53h-7.62Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M13.71%2018.28h4.57v1.53h-4.57Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m15.23%204.57%201.53%200%200%20-1.52%203.05%200%200%20-1.53%20-3.05%200%200%20-1.52%20-1.53%200%200%201.52%20-3.04%200%200%201.53%203.04%200%200%201.52z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M12.19%2013.71h1.52v3.05h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M9.14%2027.43h3.05v1.52H9.14Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M9.14%2022.86h3.05v1.52H9.14Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M10.66%2019.81h1.53v1.52h-1.53Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M9.14%203.05h3.05v1.52H9.14Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m10.66%2012.19%201.53%200%200%20-1.52%207.62%200%200%201.52%201.52%200%200%207.62%201.52%200%200%20-10.67%20-1.52%200%200%20-1.52%20-1.52%200%200%20-1.53%20-7.62%200%200%201.53%20-1.53%200%200%201.52%20-1.52%200%200%2010.67%201.52%200%200%20-7.62z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m7.62%2024.38%200%201.52%20-1.53%200%200%201.53%203.05%200%200%20-3.05%20-1.52%200z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M6.09%204.57h3.05v1.52H6.09Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M4.57%2022.86h1.52v3.04H4.57Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M4.57%206.09h1.52v3.05H4.57Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M3.04%2019.81h1.53v3.05H3.04Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M3.04%209.14h1.53v3.05H3.04Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m4.57%2016.76%200%20-1.52%20-1.53%200%200%20-3.05%20-1.52%200%200%203.05%20-1.52%200%200%201.52%201.52%200%200%203.05%201.52%200%200%20-3.05%201.53%200z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E"

const languagesIcon = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20id%3D%22Interface-Essential-Translate--Streamline-Pixel%22%3E%3Cdesc%3EInterface%20Essential%20Translate%20Streamline%20Icon%3A%20https%3A%2F%2Fstreamlinehq.com%3C%2Fdesc%3E%3Ctitle%3Einterface-essential-translate%3C%2Ftitle%3E%3Cg%3E%3Cpath%20d%3D%22M30.47%2018.29H32v10.66h-1.53Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M28.95%2028.95h1.52v1.53h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M28.95%2016.76h1.52v1.53h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M28.95%207.62h1.52v4.57h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M27.42%206.09h1.53v1.53h-1.53Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M18.28%2030.48h10.67V32H18.28Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m25.9%2024.38%20-4.57%200%200%20-4.57%20-1.53%200%200%209.14%201.53%200%200%20-3.05%204.57%200%200%203.05%201.52%200%200%20-9.14%20-1.52%200%200%204.57z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M21.33%2018.29h4.57v1.52h-4.57Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M18.28%2015.24h10.67v1.52H18.28Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m21.33%201.52%200%201.53%20-1.53%200%200%201.52%20-1.52%200%200%201.52%201.52%200%200%201.53%201.53%200%200%201.52%201.52%200%200%20-3.05%204.57%200%200%20-1.52%20-4.57%200%200%20-3.05%20-1.52%200z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M16.76%2028.95h1.52v1.53h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M16.76%2016.76h1.52v1.53h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M15.23%2018.29h1.53v10.66h-1.53Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M15.23%203.05h1.53v10.66h-1.53Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M13.71%2013.71h1.52v1.53h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M13.71%201.52h1.52v1.53h-1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m10.66%207.62%201.53%200%200%20-1.53%201.52%200%200%20-1.52%20-4.57%200%200%20-1.52%20-1.53%200%200%201.52%20-4.57%200%200%201.52%207.62%200%200%201.53z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22m10.66%2030.48%200%20-1.53%201.53%200%200%20-1.52%201.52%200%200%20-1.53%20-1.52%200%200%20-1.52%20-1.53%200%200%20-1.52%20-1.52%200%200%203.04%20-4.57%200%200%201.53%204.57%200%200%203.05%201.52%200z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M3.04%2015.24h10.67v1.52H3.04Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M10.66%2012.19h1.53v1.52h-1.53Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M9.14%2010.67h1.52v1.52H9.14Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M9.14%207.62h1.52v1.52H9.14Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M7.61%209.14h1.53v1.53H7.61Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M6.09%2010.67h1.52v1.52H6.09Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M6.09%207.62h1.52v1.52H6.09Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M4.57%2012.19h1.52v1.52H4.57Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M3.04%200h10.67v1.52H3.04Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M3.04%2024.38h1.53v1.52H3.04Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M1.52%2019.81h1.52v4.57H1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M1.52%2013.71h1.52v1.53H1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M1.52%201.52h1.52v1.53H1.52Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M0%203.05h1.52v10.66H0Z%22%20fill%3D%22%23000000%22%20stroke-width%3D%221%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E"

function SkillsSection() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  const skillsData = [
    {
      icon: softwareIcon,
      title: 'Software Skills',
      items: ['Affinity by Canva', 'Canva', 'Capcut', 'VS Code', 'Ibis Paint']
    },
    {
      icon: coreSkillsIcon,
      title: 'Core Skills',
        items: ['Graphic Design', 'Poster Design', 'Typography Design', 'Web Design', 'Photography']
    },
    {
      icon: languagesIcon,
      title: 'Languages',
      items: ['English', 'Filipino']
    }
  ]

  return (
    <section className="relative min-h-screen bg-[#f2f2f2] overflow-hidden">
      <div className="absolute top-4 bottom-4 left-4 right-4 sm:top-6 sm:bottom-6 sm:left-6 sm:right-6 md:top-8 md:bottom-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex flex-col justify-between">
        
        <div>
          <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <h2 className="font-[Timetwist] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              [.CONTACT]
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-32">
            <div className="space-y-2 sm:space-y-3">
              <a href="tel:+639918771305" className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold hover:text-blue-400 transition-colors">+639918771305</a>
              <a href="mailto:malibiranleigabriel@gmail.com" className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold hover:text-blue-400 transition-colors underline">malibiranleigabriel@gmail.com</a>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Oriental Mindoro, Philippines</p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                <span className="text-black/50">instagram:</span>&nbsp;&nbsp;&nbsp;<a href="https://instagram.com/leimxnsquare" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors underline">@leimxnsquare</a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-black/40 w-full"></div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-16 lg:gap-24">
            {skillsData.map((skill) => (
              <div key={skill.title} className="flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <img src={skill.icon} alt="" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                  <h3 className="font-[Timetwist] text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold uppercase tracking-[0.05em]">
                    {skill.title}
                  </h3>
                </div>
                
                <ul className="space-y-1 sm:space-y-2">
                  {skill.items.map((item) => (
                    <li 
                      key={item} 
                      className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
