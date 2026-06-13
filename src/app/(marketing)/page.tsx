import {
  HeroSection,
  CategoriesSection,
  FeaturesSection,
  TrendingSection,
  StatsSection,
  CharactersSection,
  GamesSection,
  VideosSection,
  TestimonialsSection,
  AchievementsSection,
  ParentsSection,
  CTASection,
  PartnersSection,
  NewsletterSection,
} from '@/components/home'
import { FunFactSection } from '@/components/ai/fun-fact-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturesSection />
      <TrendingSection />
      <StatsSection />
      <CharactersSection />
      <FunFactSection />
      <GamesSection />
      <VideosSection />
      <TestimonialsSection />
      <AchievementsSection />
      <ParentsSection />
      <CTASection />
      <PartnersSection />
      <NewsletterSection />
    </>
  )
}
