function Input({ className = '', error, label, id, ...props }) {
  const inputId = id || props.name

  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-medium text-[#111827]">
          {label}
        </span>
      )}
      <input
        id={inputId}
        className={[
          'h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] shadow-sm shadow-blue-900/5 outline-none placeholder:text-[#6B7280] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100',
          error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : '',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  )
}

export default Input
