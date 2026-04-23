import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { SectionProps, SportCard, AthleteCard } from "@/types"

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3c04807e-961f-4570-953e-f2409e527828/files/068b9e53-d71e-4cf8-82d4-d125a79b7414.jpg"

function SportCardItem({ card, index, isActive }: { card: SportCard; index: number; isActive: boolean }) {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:bg-white/10 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      <div className="text-4xl">{card.emoji}</div>
      <h3 className="text-white font-bold text-xl">{card.name}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{card.description}</p>
      <p className="text-[#FF4D00] text-xs font-medium mt-auto pt-2 border-t border-white/10">{card.fact}</p>
    </motion.div>
  )
}

function AthleteCardItem({ card, index, isActive }: { card: AthleteCard; index: number; isActive: boolean }) {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:bg-white/10 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      <div className="text-4xl">{card.emoji}</div>
      <div>
        <h3 className="text-white font-bold text-lg leading-tight">{card.name}</h3>
        <span className="text-[#FF4D00] text-xs font-medium">{card.sport}</span>
      </div>
      <ul className="flex flex-col gap-2 mt-1">
        {card.facts.map((fact, i) => (
          <li key={i} className="text-neutral-400 text-xs leading-relaxed flex gap-2">
            <span className="text-white/30 mt-0.5">—</span>
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, sports, athletes }: SectionProps) {
  const isHero = id === 'hero'
  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      {isHero && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />
      )}
      <div className="relative z-10">
      {subtitle && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}
      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {content && (
        <motion.p
          className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}
      {sports && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
          {sports.map((card, i) => (
            <SportCardItem key={card.name} card={card} index={i} isActive={isActive} />
          ))}
        </div>
      )}
      {athletes && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
          {athletes.map((card, i) => (
            <AthleteCardItem key={card.name} card={card} index={i} isActive={isActive} />
          ))}
        </div>
      )}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 md:mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-colors"
          >
            {buttonText}
          </Button>
        </motion.div>
      )}
      </div>
    </section>
  )
}