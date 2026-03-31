import * as React from 'react'
import { useRef, useEffect, useState } from 'react'

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  blur?: boolean
  delay?: number
  threshold?: number
  onComplete?: () => void
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  delay = 0,
  threshold = 0.1,
  onComplete,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  const visibleClasses = 'opacity-100 translate-y-0' + (blur ? ' blur-0' : '')
  const hiddenClasses = 'opacity-0 translate-y-4' + (blur ? ' blur-sm' : '')

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? visibleClasses : hiddenClasses} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      onTransitionEnd={visible && onComplete ? onComplete : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

export default FadeContent
