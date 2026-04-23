import type { ReactNode } from "react"

export interface SportCard {
  emoji: string
  name: string
  description: string
  fact: string
}

export interface AthleteCard {
  emoji: string
  name: string
  sport: string
  facts: string[]
}

export interface MomentCard {
  emoji: string
  year: string
  title: string
  description: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  sports?: SportCard[]
  athletes?: AthleteCard[]
  moments?: MomentCard[]
  quiz?: QuizQuestion[]
}

export interface SectionProps extends Section {
  isActive: boolean
}