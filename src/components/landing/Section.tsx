import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { SectionProps, SportCard, AthleteCard, MomentCard, QuizQuestion } from "@/types"

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3c04807e-961f-4570-953e-f2409e527828/files/068b9e53-d71e-4cf8-82d4-d125a79b7414.jpg"

function SportCardItem({ card, index, isActive }: { card: SportCard; index: number; isActive: boolean }) {
  return (
    <motion.div
      className="bg-black/5 border border-black/10 rounded-2xl p-6 flex flex-col gap-3 hover:bg-black/10 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      <div className="text-4xl">{card.emoji}</div>
      <h3 className="text-neutral-900 font-bold text-xl">{card.name}</h3>
      <p className="text-neutral-500 text-sm leading-relaxed">{card.description}</p>
      <p className="text-[#FF4D00] text-xs font-medium mt-auto pt-2 border-t border-black/10">{card.fact}</p>
    </motion.div>
  )
}

function AthleteCardItem({ card, index, isActive }: { card: AthleteCard; index: number; isActive: boolean }) {
  return (
    <motion.div
      className="bg-black/5 border border-black/10 rounded-2xl p-6 flex flex-col gap-3 hover:bg-black/10 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
    >
      <div className="text-4xl">{card.emoji}</div>
      <div>
        <h3 className="text-neutral-900 font-bold text-lg leading-tight">{card.name}</h3>
        <span className="text-[#FF4D00] text-xs font-medium">{card.sport}</span>
      </div>
      <ul className="flex flex-col gap-2 mt-1">
        {card.facts.map((fact, i) => (
          <li key={i} className="text-neutral-500 text-xs leading-relaxed flex gap-2">
            <span className="text-black/20 mt-0.5">—</span>
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function QuizBlock({ questions, isActive }: { questions: QuizQuestion[]; isActive: boolean }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    if (i === q.correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <motion.div
      className="mt-10 max-w-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {finished ? (
        <div className="bg-black/5 border border-black/10 rounded-2xl p-8 flex flex-col gap-4 items-start">
          <div className="text-5xl">{score === questions.length ? '🏆' : score >= questions.length / 2 ? '🥈' : '💪'}</div>
          <h3 className="text-neutral-900 font-bold text-2xl">Результат: {score} из {questions.length}</h3>
          <p className="text-neutral-500 text-sm">
            {score === questions.length
              ? 'Великолепно! Ты настоящий знаток спорта!'
              : score >= questions.length / 2
              ? 'Хороший результат! Есть куда расти.'
              : 'Изучи наш сайт и попробуй снова — всё получится!'}
          </p>
          <Button
            onClick={handleRestart}
            variant="outline"
            className="mt-2 text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-white transition-colors"
          >
            Пройти ещё раз
          </Button>
        </div>
      ) : (
        <div className="bg-black/5 border border-black/10 rounded-2xl p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400 text-xs">Вопрос {current + 1} / {questions.length}</span>
            <span className="text-[#FF4D00] text-xs font-bold">Счёт: {score}</span>
          </div>
          <h3 className="text-neutral-900 font-bold text-xl leading-snug">{q.question}</h3>
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct
              const isWrong = selected === i && i !== q.correct
              const reveal = selected !== null

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={[
                    'text-left px-5 py-3 rounded-xl border text-sm transition-all',
                    reveal && isCorrect ? 'border-green-500 bg-green-500/10 text-green-700' :
                    isWrong ? 'border-red-500 bg-red-500/10 text-red-600' :
                    selected === null ? 'border-black/10 text-neutral-700 hover:border-black/30 hover:bg-black/5' :
                    'border-black/5 text-neutral-300'
                  ].join(' ')}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              <p className="text-neutral-500 text-sm italic">{q.explanation}</p>
              <Button
                onClick={handleNext}
                variant="outline"
                className="self-start text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-white transition-colors"
              >
                {current + 1 < questions.length ? 'Следующий вопрос →' : 'Посмотреть результат'}
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}

function MomentCardItem({ card, index, isActive }: { card: MomentCard; index: number; isActive: boolean }) {
  return (
    <motion.div
      className="bg-black/5 border border-black/10 rounded-2xl p-6 flex flex-col gap-3 hover:bg-black/10 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
    >
      <div className="text-3xl">{card.emoji}</div>
      <div className="text-[#FF4D00] text-xs font-bold tracking-widest uppercase">{card.year}</div>
      <h3 className="text-neutral-900 font-bold text-base leading-snug">{card.title}</h3>
      <p className="text-neutral-500 text-xs leading-relaxed">{card.description}</p>
    </motion.div>
  )
}

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, sports, athletes, moments, quiz }: SectionProps) {
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
            opacity: 0.08,
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
          className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-neutral-900"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        {content && (
          <motion.p
            className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-500"
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
        {moments && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {moments.map((card, i) => (
              <MomentCardItem key={card.title} card={card} index={i} isActive={isActive} />
            ))}
          </div>
        )}
        {quiz && <QuizBlock questions={quiz} isActive={isActive} />}
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
              className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-white transition-colors"
            >
              {buttonText}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
