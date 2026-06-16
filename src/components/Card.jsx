function Card({ children, className = '', title, subtitle, actions, padded = true }) {
  return (
    <section
      className={[
        'rounded-xl border border-[#E5E7EB] bg-white shadow-[0_12px_30px_rgba(30,58,138,0.07)]',
        padded ? 'p-6' : '',
        className,
      ].join(' ')}
    >
      {(title || subtitle || actions) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-base font-semibold text-[#111827]">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-[#6B7280]">{subtitle}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}

      {children}
    </section>
  )
}

export default Card
