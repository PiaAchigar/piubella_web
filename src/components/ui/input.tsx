interface InputProps {
  label?: string
  name?: string
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'number' | 'password'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

export function Input({
  label,
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
}: InputProps) {
  const errorClass = error ? 'border-error' : 'border-outline'
  const inputId = name || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="font-sans text-sm font-medium text-on-surface">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`px-4 py-2 border rounded font-sans text-body-md transition-colors ${errorClass} focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      {error && <span className="text-error text-sm font-sans">{error}</span>}
    </div>
  )
}
