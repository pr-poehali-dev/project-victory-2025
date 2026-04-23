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

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  sports?: SportCard[]
  athletes?: AthleteCard[]
}

export interface SectionProps extends Section {
  isActive: boolean
}