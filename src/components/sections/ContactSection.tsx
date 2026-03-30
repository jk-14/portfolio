import FadeContent from '@/components/ui/FadeContent'
import SplitText from '@/components/ui/SplitText'
import { SocialButtons } from '@/components/ui/SocialButtons'
import { ContactForm } from '@/components/ContactForm'

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-24 px-6 bg-background-alt"
    >
      <div className="mx-auto max-w-7xl">
        <FadeContent>
          <h2
            id="contact-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-16 text-center"
          >
            <SplitText text="Contact" tag="span" />
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: message + social */}
          <FadeContent delay={100}>
            <div className="space-y-6">
              <p className="text-text-muted leading-relaxed">
                I&apos;m currently open to Senior Full Stack and Frontend opportunities in Toronto.
                Whether you have a role in mind or just want to talk shop about tech—my inbox is
                always open.
              </p>
              <SocialButtons />
            </div>
          </FadeContent>

          {/* Right: form */}
          <FadeContent delay={200}>
            <ContactForm />
          </FadeContent>
        </div>
      </div>

      {/* Scroll to top */}
      <a
        href="#home"
        className="absolute bottom-8 left-8 flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        aria-label="Scroll to top"
      >
        <svg
          className="animate-bounce"
          style={{ animationDirection: 'alternate' }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 13V3M3 8l5-5 5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs tracking-widest uppercase">Top</span>
      </a>
    </section>
  )
}
