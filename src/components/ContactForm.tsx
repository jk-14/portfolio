import { useState, useCallback } from 'react'
import { useForm, ValidationError } from '@formspree/react'

const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormValues {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validateField(field: keyof FormValues, value: string): string | undefined {
  const trimmed = value.trim()
  if (!trimmed) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
  if (field === 'name' && trimmed.length < 2) return 'Name must be at least 2 characters.'
  if (field === 'name' && trimmed.length > LIMITS.name)
    return `Name must be ${LIMITS.name} characters or fewer.`
  if (field === 'email' && !EMAIL_RE.test(trimmed)) return 'Please enter a valid email address.'
  if (field === 'email' && trimmed.length > LIMITS.email)
    return `Email must be ${LIMITS.email} characters or fewer.`
  if (field === 'message' && trimmed.length < 10) return 'Message must be at least 10 characters.'
  if (field === 'message' && trimmed.length > LIMITS.message)
    return `Message must be ${LIMITS.message.toLocaleString()} characters or fewer.`
}

export function ContactForm() {
  const formId = import.meta.env.VITE_FORMSPREE_ID as string
  const [state, handleSubmit] = useForm(formId)

  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})

  const handleChange = useCallback(
    (field: keyof FormValues, value: string) => {
      setValues((v) => ({ ...v, [field]: value }))
      if (touched[field]) {
        setErrors((e) => ({ ...e, [field]: validateField(field, value) }))
      }
    },
    [touched]
  )

  const handleBlur = useCallback(
    (field: keyof FormValues) => {
      setTouched((t) => ({ ...t, [field]: true }))
      setErrors((e) => ({ ...e, [field]: validateField(field, values[field]) }))
    },
    [values]
  )

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const allErrors: FormErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      message: validateField('message', values.message),
    }
    setErrors(allErrors)
    setTouched({ name: true, email: true, message: true })
    if (allErrors.name || allErrors.email || allErrors.message) {
      e.preventDefault()
      return
    }
    handleSubmit(e)
  }

  const inputClass = (field: keyof FormValues) =>
    `w-full bg-transparent border-0 border-b pb-3 text-text-primary text-base focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors placeholder-transparent ${
      errors[field] ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-accent'
    }`

  if (state.succeeded) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <p className="text-accent font-display font-semibold text-lg">Thanks for reaching out!</p>
        <p className="text-text-muted mt-2 text-sm">I&apos;ll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
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
          aria-describedby={errors.name ? 'name-error' : undefined}
          autoComplete="name"
          maxLength={LIMITS.name}
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={inputClass('name')}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-red-400 text-xs mt-1">
            {errors.name}
          </p>
        )}
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
          className="text-red-400 text-xs mt-1"
        />
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
          aria-describedby={errors.email ? 'email-error' : undefined}
          autoComplete="email"
          maxLength={LIMITS.email}
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={inputClass('email')}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-red-400 text-xs mt-1">
            {errors.email}
          </p>
        )}
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-400 text-xs mt-1"
        />
      </div>

      <div>
        <div className="flex justify-between items-baseline mb-3">
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-widest text-text-muted"
          >
            Message <span aria-hidden="true">*</span>
          </label>
          <span
            className={`text-xs tabular-nums ${values.message.length > LIMITS.message ? 'text-red-400' : 'text-text-muted'}`}
          >
            {values.message.length}/{LIMITS.message.toLocaleString()}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
          rows={5}
          maxLength={LIMITS.message}
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          className={inputClass('message') + ' resize-none'}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-red-400 text-xs mt-1">
            {errors.message}
          </p>
        )}
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-red-400 text-xs mt-1"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full px-8 py-4 rounded-lg bg-accent text-background font-display font-semibold text-sm uppercase tracking-widest hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background flex items-center justify-center gap-3"
      >
        {state.submitting ? (
          'Sending…'
        ) : (
          <>
            <span>Send Message</span>
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  )
}
