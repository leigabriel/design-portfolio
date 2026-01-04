function ContentsSection() {
  const contentsData = [
    { number: '01', title: 'Posters', items: ['soon', ''] }
  ]

  const leftColumn = contentsData.slice(0, 3)
  const rightColumn = contentsData.slice(3, 6)

  return (
    <section className="relative min-h-screen bg-[#f2f2f2] overflow-hidden">
      <div className="absolute top-4 bottom-4 left-4 right-4 sm:top-6 sm:bottom-6 sm:left-6 sm:right-6 md:top-8 md:bottom-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex flex-col justify-between">
        
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="font-[Timetwist] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-12 sm:mb-16 md:mb-20">
            [.CONTENTS]
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-32 gap-y-8 sm:gap-y-10 md:gap-y-12">
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {leftColumn.map((item) => (
                <div key={item.number}>
                  <div className="flex items-baseline gap-3 sm:gap-4 mb-2 sm:mb-3">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold">{item.number}.</span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                  {item.items.length > 0 && (
                    <ul className="ml-10 sm:ml-12 space-y-0.5 sm:space-y-1">
                      {item.items.map((subItem) => (
                        <li key={subItem} className="text-lg sm:text-xl md:text-2xl font-medium">
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {rightColumn.map((item) => (
                <div key={item.number}>
                  <div className="flex items-baseline gap-3 sm:gap-4 mb-2 sm:mb-3">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold">{item.number}.</span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                  {item.items.length > 0 && (
                    <ul className="ml-10 sm:ml-12 space-y-0.5 sm:space-y-1">
                      {item.items.map((subItem) => (
                        <li key={subItem} className="text-lg sm:text-xl md:text-2xl font-medium">
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] text-black uppercase">
            Contents / Portfolio 2026
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] text-black uppercase">
            Lei Gabriel
          </span>
        </div>
      </div>
    </section>
  )
}

export default ContentsSection
