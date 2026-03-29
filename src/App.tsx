import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HomeSection } from '@/components/sections/HomeSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ContactSection } from '@/components/sections/ContactSection'

const SITE_URL = 'https://jk-14.github.io/portfolio'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export default function App() {
  return (
    <>
      <Helmet>
        <title>Jatin Kapil — Senior Full Stack Developer</title>
        <meta
          name="description"
          content="[PLACEHOLDER — 155 chars max: compelling description of Jatin's expertise and value]"
        />
        <meta property="og:title" content="Jatin Kapil — Senior Full Stack Developer" />
        <meta
          property="og:description"
          content="[PLACEHOLDER — OG description]"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jatin Kapil — Senior Full Stack Developer" />
        <meta name="twitter:description" content="[PLACEHOLDER — Twitter description]" />
        <meta name="twitter:image" content={OG_IMAGE} />
        <link rel="canonical" href={SITE_URL} />
      </Helmet>

      <Navbar />

      <main>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
