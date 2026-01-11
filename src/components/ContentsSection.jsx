import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const contentsData = [
  { number: '01', title: 'Posters', status: 'view below' },
  { number: '02', title: 'Web Projects', status: 'soon' },
  { number: '03', title: 'Photography', status: 'soon' },
  { number: '04', title: 'UI/UX Design', status: 'soon' }
]

function ContentsSection() {
  const { isDarkMode } = useTheme()
  const titleRef = useScrollAnimation({ animation: 'rotateIn', delay: 0 })
  const contentsRef = useStaggerAnimation({ selector: '.content-item', animation: 'slideIn', stagger: 150, delay: 200 })

  const textColor = isDarkMode ? 'text-white' : 'text-black'

  return (
    <section id="contents" className={'relative min-h-[50vh] overflow-hidden ' + (isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]')}>
      <div style={{ padding: '4rem 5rem' }}>
        <h2 ref={titleRef} className={'section-title mb-12 ' + textColor}>[.CONTENTS]</h2>
        <div ref={contentsRef} className="flex flex-col gap-6">
          {contentsData.map((item) => (
            <div key={item.number} className="content-item flex items-baseline gap-6 cursor-default">
              <span className={'content-number font-[Timetwist] ' + textColor}>{item.number}.</span>
              <span className={'content-title ' + textColor}>{item.title}</span>
              <span className="text-sm italic text-blue-400">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContentsSection
