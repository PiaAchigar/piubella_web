'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Servicios() {
  const [activeSection, setActiveSection] = useState('actividades')

  useEffect(() => {
    const sections = ['actividades', 'yoga', 'masajes', 'faciales']

    const handleScroll = () => {
      let current = 'actividades'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 160) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'actividades', label: 'Pilates Reformer', icon: 'fitness_center' },
    { id: 'yoga', label: 'Yoga Flow', icon: 'self_improvement' },
    { id: 'masajes', label: 'Masajes', icon: 'spa' },
    { id: 'faciales', label: 'Faciales', icon: 'face' },
  ]

  return (
    <main className="max-w-container mx-auto flex flex-col md:flex-row px-gutter py-12 gap-12">
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-[100px] h-[calc(100vh-120px)] flex flex-col py-8 space-y-2 bg-surface-container-low rounded-r-xl elegant-shadow">
          <div className="px-6 mb-8">
            <h2 className="font-serif text-headline-sm text-primary">Servicios</h2>
            <p className="font-sans text-label-md text-on-surface-variant">Bienestar Integral</p>
          </div>
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`p-3 mx-2 my-1 flex items-center gap-3 rounded-lg transition-all group ${
                  activeSection === item.id
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'text-on-surface-variant hover:bg-surface-variant/50'
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    activeSection === item.id ? 'text-primary' : 'text-outline'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-sans text-label-md">{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto px-6 pt-4 border-t border-outline-variant/30">
            <button className="text-primary italic font-serif text-body-md flex items-center gap-2 hover:opacity-70 transition-opacity">
              Ver todos{' '}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </aside>

      <section className="flex-grow space-y-24 md:pb-24">
        <header className="max-w-2xl">
          <span className="text-primary font-sans text-label-md tracking-widest uppercase mb-4 block">
            Nuestras Experiencias
          </span>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg mb-6">
            Equilibrio entre cuerpo, mente y estética.
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
            En Piu Bella, diseñamos cada tratamiento como un ritual de bienestar. Utilizamos técnicas
            avanzadas y un enfoque orgánico para resaltar tu belleza natural mientras fortalecemos tu
            núcleo vital.
          </p>
        </header>

        <div className="grid md:grid-cols-12 gap-8 items-center" id="actividades">
          <div className="md:col-span-7 overflow-hidden rounded-xl bg-surface-container aspect-[4/3] relative group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu-gMr9wDQMajushbJwIkDHMm7Zp5d9EgL0mGWdhQ4B4OuH7P5qmaVDarQgcp3BBpacJ2juCsHDSbLAwKFAPaavxd2d3RJoOodePh7sDvLmlPTOOlYQpfpdXHl8oM-CRRm-X-iULA93xOIi5n6vgtFxGZ8mU6j0UOqpH-I5a6HCSqtFAgjkhZEMPmVTpr8fBrDszFyUCPVP01HdJqKmjggsbc53OnfheL1zznr6fiuzNrok42UDolh4kaqejRrfiXD5CV001JIxWZE"
              alt="Pilates Reformer"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>
          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full w-fit mb-6 font-sans text-label-md">
              Fitness &amp; Balance
            </div>
            <h3 className="font-serif text-headline-md mb-4">Pilates Reformer</h3>
            <p className="font-sans text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Un entrenamiento integral que utiliza la resistencia de resortes para alinear el
              cuerpo, mejorar la postura y tonificar la musculatura profunda con movimientos fluidos
              y controlados.
            </p>
            <div className="h-px w-24 bg-secondary-container mb-6" />
            <ul className="space-y-3 font-sans text-body-md text-on-surface">
              {['Alineación postural', 'Fortalecimiento de core', 'Flexibilidad articular'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">
                      check_circle
                    </span>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center" id="yoga">
          <div className="md:col-span-5 order-2 md:order-1 flex flex-col justify-center">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full w-fit mb-6 font-sans text-label-md">
              Espiritualidad
            </div>
            <h3 className="font-serif text-headline-md mb-4">Yoga Flow</h3>
            <p className="font-sans text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Sincroniza tu respiración con el movimiento en una danza meditativa que libera
              tensiones y restaura la paz mental. Ideal para quienes buscan una conexión profunda
              con su ser.
            </p>
            <div className="h-px w-24 bg-secondary-container mb-6" />
            <button className="border border-primary text-primary px-6 py-2 rounded-lg font-sans text-label-md hover:bg-primary hover:text-on-primary transition-all duration-300 w-fit">
              Consultar Horarios
            </button>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 overflow-hidden rounded-xl bg-surface-container aspect-[4/3] relative group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ1p0UIk2Dz79_dxDVYUdanQrqxb1C8sLdKnCJnIcaYjgSL9WNztx6XZfbaR0YhwT6QixOuFY_ge8U0vRALBNzHR7ZENcBYMq-VthZLA0YPw9lK6JIKkc3LxPG8ELgyX4KmnNc-ZDY8VO-XdPK5cnAHWtVqquizo-eO4xJvEsAi_7VJt-931OB-uuuJC0bMVtZY4sZRS09wf60lEI8CGcKMOALNBlvOG_jc_CNfh_H2hjmuKq1uiCIPiS8rmF9yDYAP-BnSFPDooP1"
              alt="Yoga Flow"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="pt-12" id="masajes">
          <h3 className="font-serif text-headline-md mb-8 text-center">Terapias Manuales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'spa',
                title: 'Masaje Descontracturante',
                desc: 'Alivia la tensión muscular acumulada por el estrés diario y mejora la circulación sanguínea.',
              },
              {
                icon: 'water_drop',
                title: 'Drenaje Linfático',
                desc: 'Técnica suave que estimula el sistema linfático para eliminar toxinas y reducir la retención de líquidos.',
              },
              {
                icon: 'electric_bolt',
                title: 'Piedras Calientes',
                desc: 'Una experiencia termal que combina el calor de piedras volcánicas con masajes relajantes.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-surface-container-lowest p-8 rounded-xl elegant-shadow border border-surface-container hover:border-primary/20 transition-all"
              >
                <span className="material-symbols-outlined text-primary mb-4 text-4xl block">
                  {card.icon}
                </span>
                <h4 className="font-serif text-headline-sm mb-3">{card.title}</h4>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 space-y-12" id="faciales">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 aspect-square rounded-full overflow-hidden bg-surface-container-high relative flex-shrink-0">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCgd_V2JDotuEtzA02GVTdZSUzavhrqVMcqzxL556ghsZ5hsxHJtfsRIZ91plBEY69uMCiNtnpbrHktbd6jjvvj_enkII2Md465YyRuoSacdXm8uvftrc7z15jArk78tQo-ZVSjw-TUK4rXQZB73B-mr3d5XPqgT_TaDMMrMLgAnQeL5jcSjFRwO_b3PbGb6ImLYt-yLBFW-pvgmxeEmQ6xsEAMIA1CbAwroZVt6JOH_hF4kdZBWbAxaghTuirsrTj4n3D98N7kBX3"
                alt="Tratamiento Facial"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="font-serif text-display-lg-mobile md:text-display-lg mb-6">
                Estética Facial Premium
              </h3>
              <div className="space-y-8">
                {[
                  {
                    num: '01',
                    title: 'Higiene Facial Profunda',
                    desc: 'Eliminación de impurezas y puntos negros para una piel luminosa y oxigenada.',
                    border: true,
                  },
                  {
                    num: '02',
                    title: 'Peeling Químico Orgánico',
                    desc: 'Renovación celular controlada para atenuar manchas y líneas de expresión.',
                    border: true,
                  },
                  {
                    num: '03',
                    title: 'Radiofrecuencia Facial',
                    desc: 'Efecto lifting inmediato mediante la estimulación de colágeno y elastina.',
                    border: false,
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className={`flex gap-6 ${item.border ? 'pb-6 border-b border-outline-variant/30' : ''}`}
                  >
                    <span className="text-primary font-serif text-headline-sm flex-shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <h5 className="font-sans text-label-md uppercase tracking-widest text-on-surface mb-2">
                        {item.title}
                      </h5>
                      <p className="font-sans text-body-md text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
