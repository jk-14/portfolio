import { GithubIcon, LinkedInIcon } from '@/components/ui/Icons'

interface SocialLink {
  href: string
  label: string
  icon: React.ReactNode
}

const socials: SocialLink[] = [
  {
    href: 'https://www.linkedin.com/in/jatin-kapil',
    label: 'Jatin Kapil on LinkedIn',
    icon: <LinkedInIcon size={24} />,
  },
  {
    href: 'https://github.com/jk-14',
    label: 'Jatin Kapil on GitHub',
    icon: <GithubIcon size={24} />,
  },
]

export function SocialButtons() {
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-14 h-14 flex items-center justify-center rounded-lg border border-accent text-accent bg-transparent transition-all duration-200 hover:scale-110 hover:shadow-[0_0_14px_rgba(72,142,212,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {icon}
        </a>
      ))}
    </div>
  )
}
