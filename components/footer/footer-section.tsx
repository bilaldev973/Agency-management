interface FooterSectionProps {
  title: string
  children: React.ReactNode
}

export function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )
}