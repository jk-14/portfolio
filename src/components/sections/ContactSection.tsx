import { useForm, ValidationError } from '@formspree/react'
import FadeContent from '@/components/ui/FadeContent'
import SplitText from '@/components/ui/SplitText'
import { SocialButtons } from '@/components/ui/SocialButtons'

export function ContactSection() {
  const formId = import.meta.env.VITE_FORMSPREE_ID as string
  const [state, handleSubmit] = useForm(formId)

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
                Whether you have a role in mind or just want to talk shop about tech—my inbox is always open.
              </p>
              <SocialButtons />
            </div>
          </FadeContent>

          {/* Right: form */}
          <FadeContent delay={200}>
            {state.succeeded ? (
              <div className="glass rounded-xl p-8 text-center">
                <p className="text-accent font-display font-semibold text-lg">
                  Thanks for reaching out!
                </p>
                <p className="text-text-muted mt-2 text-sm">I&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-3"
                  >
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    aria-required="true"
                    autoComplete="name"
                    className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-text-primary text-base focus:outline-none focus:border-accent focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors placeholder-transparent"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-3"
                  >
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    aria-required="true"
                    autoComplete="email"
                    className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-text-primary text-base focus:outline-none focus:border-accent focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors placeholder-transparent"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-widest text-text-muted mb-3"
                  >
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    rows={5}
                    className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-text-primary text-base focus:outline-none focus:border-accent focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors resize-none placeholder-transparent"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full px-8 py-4 rounded-lg bg-accent text-background font-display font-semibold text-sm uppercase tracking-widest hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background flex items-center justify-center gap-3"
                >
                  {state.submitting ? 'Sending…' : <><span>Send Message</span><span aria-hidden="true">→</span></>}
                </button>
              </form>
            )}
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
