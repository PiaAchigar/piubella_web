'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { validateEmail, validatePhone } from '@/lib/calendar-utils'

interface ContactFormProps {
  onSubmit: (data: {
    contactName: string
    contactEmail: string
    contactPhone: string
  }) => void
  loading?: boolean
}

interface FormErrors {
  contactName?: string
  contactEmail?: string
  contactPhone?: string
}

export function ContactForm({ onSubmit, loading = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'El nombre es requerido'
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'El email es requerido'
    } else if (!validateEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Email inválido'
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'El teléfono es requerido'
    } else if (!validatePhone(formData.contactPhone)) {
      newErrors.contactPhone = 'Teléfono inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        label="Nombre completo"
        name="contactName"
        value={formData.contactName}
        onChange={handleChange}
        error={errors.contactName}
        required
        disabled={loading}
      />

      <Input
        label="Email"
        name="contactEmail"
        type="email"
        value={formData.contactEmail}
        onChange={handleChange}
        error={errors.contactEmail}
        required
        disabled={loading}
      />

      <Input
        label="Teléfono"
        name="contactPhone"
        value={formData.contactPhone}
        onChange={handleChange}
        error={errors.contactPhone}
        placeholder="+54 9 1234 56789"
        required
        disabled={loading}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Procesando...' : 'Confirmar'}
      </Button>
    </form>
  )
}
