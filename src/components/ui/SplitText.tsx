import React, { useRef, useEffect, useState } from 'react'

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  splitType?: 'chars' | 'words'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  textAlign?: React.CSSProperties['textAlign']
  onLetterAnimationComplete?: () => void
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  splitType = 'chars',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement>(null)
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
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const parts = splitType === 'chars' ? text.split('') : text.split(' ')
  const Tag = tag as React.ElementType

  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={`inline-block whitespace-normal ${className}`}
      style={{ textAlign, wordWrap: 'break-word' }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          aria-hidden
          className={`inline-block transition-all duration-500 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ transitionDelay: visible ? `${i * delay}ms` : '0ms' }}
          onTransitionEnd={
            i === parts.length - 1 && visible ? onLetterAnimationComplete : undefined
          }
        >
          {part === '' ? '\u00A0' : part}
          {splitType === 'words' && i < parts.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}

export default SplitText
