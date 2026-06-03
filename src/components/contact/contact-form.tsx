'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void
  loading?: boolean
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export function ContactForm({ onSubmit, loading = false }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const digitsOnly = phone.replace(/\D/g, '')
    return digitsOnly.length >= 10 && digitsOnly.length <= 15
  }

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Teléfono debe tener al menos 10 dígitos'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validate()) {
      onSubmit?.(formData)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        label="Nombre"
        name="name"
        placeholder="Tu nombre completo"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        disabled={loading}
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="tu@email.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={loading}
        required
      />

      <Input
        label="Teléfono"
        name="phone"
        type="tel"
        placeholder="+54 9 1234 56789"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        disabled={loading}
        required
      />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-sans text-sm font-medium text-on-surface"
        >
          Mensaje <span className="text-error ml-1">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Cuéntanos cómo te podemos ayudar..."
          value={formData.message}
          onChange={handleChange}
          disabled={loading}
          rows={5}
          className={`px-4 py-2 border rounded font-sans text-body-md transition-colors ${
            errors.message ? 'border-error' : 'border-outline'
          } focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {errors.message && (
          <span className="text-error text-sm font-sans">{errors.message}</span>
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Enviando...' : 'Enviar Mensaje'}
      </Button>
    </form>
  )
}
