import { useForm, ValidationError } from '@formspree/react'
import FadeContent from '@/components/ui/FadeContent'
import SplitText from '@/components/ui/SplitText'

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export function ContactSection() {
  const formId = import.meta.env.VITE_FORMSPREE_ID as string
  const [state, handleSubmit] = useForm(formId)

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 px-6 bg-background-alt"
    >
      <div className="mx-auto max-w-7xl">
        <FadeContent>
          <h2
            id="contact-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-16 text-center"
          >
            <SplitText text="Get In Touch" tag="span" />
          </h2>
        </FadeContent>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: message + social */}
          <FadeContent delay={100}>
            <div className="space-y-6">
              <p className="text-text-muted leading-relaxed">
                I&apos;m currently open to Senior Full Stack and Frontend opportunities in Toronto.
                Whether you have a role in mind or just want to chat about tech — my inbox is always open.
              </p>
              <div className="space-y-3">
                <p className="text-text-primary font-medium text-sm">Find me on</p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/jatin-kapil"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jatin Kapil on LinkedIn"
                    className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    <LinkedInIcon />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jatin Kapil on GitHub [PLACEHOLDER — add GitHub URL]"
                    className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    <GithubIcon />
                    <span className="text-sm">GitHub</span>
                  </a>
                </div>
              </div>
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
    </section>
  )
}
