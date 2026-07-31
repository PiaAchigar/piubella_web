import type { ReactNode } from 'react'

export function LegalPageLayout({
  title,
  updatedAt,
  children,
}: {
  title: string
  updatedAt: string
  children: ReactNode
}) {
  return (
    <section className="pt-section-lg pb-section-lg">
      <div className="max-w-container mx-auto px-gutter">
        <div className="max-w-3xl mx-auto">
          <span className="font-sans text-label-md tracking-widest text-primary uppercase mb-4 block">
            Piu Bella Estética Pilates
          </span>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg mb-4 text-on-surface">
            {title}
          </h1>
          <p className="font-sans text-label-md text-on-surface-variant uppercase tracking-widest mb-12">
            Última actualización: {updatedAt}
          </p>

          <article className="space-y-10 font-sans text-body-md text-on-surface-variant leading-relaxed [&_h2]:font-serif [&_h2]:text-headline-sm [&_h2]:text-on-surface [&_h2]:mb-4 [&_h2]:mt-0 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:mb-0 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
            {children}
          </article>
        </div>
      </div>
    </section>
  )
}
