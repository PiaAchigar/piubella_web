'use client'

import { useState } from 'react'
import Link from 'next/link'

interface SidebarSection {
  id: string
  name: string
  subcategories: { id: string; name: string }[]
}

export function SidebarNav({ sections }: { sections: SidebarSection[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <nav className="flex flex-col space-y-1 overflow-y-auto">
      {sections.map((section) => {
        const isOpen = openId === section.id
        const hasSubs = section.subcategories.length > 0

        return (
          <div key={section.id}>
            <button
              onClick={() => toggle(section.id)}
              className="w-full p-3 mx-2 my-1 flex items-center gap-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-all text-left"
              style={{ width: 'calc(100% - 1rem)' }}
            >
              <span className="material-symbols-outlined text-outline flex-shrink-0">spa</span>
              <span className="font-sans text-label-md flex-1">{section.name}</span>
              {hasSubs && (
                <span
                  className="material-symbols-outlined text-outline text-sm transition-transform duration-200"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  expand_more
                </span>
              )}
            </button>

            {hasSubs && isOpen && (
              <div className="ml-6 mb-1 flex flex-col space-y-1">
                {section.subcategories.map((sub) => (
                  <a
                    key={sub.id}
                    href={`#sub-${sub.id}`}
                    className="p-2 mx-2 flex items-center gap-2 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-all"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    <span className="font-sans text-label-md">{sub.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
