function Button({
  as: Component = 'button',
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const variants = {
    primary: 'bg-[#1E3A8A] !text-white shadow-sm shadow-blue-900/15 hover:bg-[#1D4ED8] hover:!text-white focus-visible:outline-[#1E3A8A]',
    outline: 'border border-[#1E3A8A] bg-white text-[#1E3A8A] shadow-sm shadow-blue-900/5 hover:bg-[#EFF6FF] focus-visible:outline-[#1E3A8A]',
    ghost: 'bg-transparent text-[#1E3A8A] hover:bg-[#EFF6FF] focus-visible:outline-[#1E3A8A]',
  }
  const variantClass = variants[variant] || variants.outline

  return (
    <Component
      {...(Component === 'button' ? { type } : {})}
      className={[
        'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg px-4 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantClass,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
