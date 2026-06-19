'use client'

import { useState } from 'react'
import { CategoryNode } from './types'

interface NavItemProps {
  node: CategoryNode
  depth: number
  openIds: Set<string>
  toggle: (id: string) => void
  onLinkClick?: () => void
}

function NavItem({ node, depth, openIds, toggle, onLinkClick }: NavItemProps) {
  const isOpen = openIds.has(node.id)
  const hasSubs = node.children.length > 0
  const indent = depth * 14

  return (
    <div>
      <div
        className="flex items-center gap-1 my-0.5 mx-2 rounded-lg hover:bg-surface-variant/50 transition-all"
        style={{ paddingLeft: `${8 + indent}px` }}
      >
        {depth === 0 && (
          <span className="material-symbols-outlined text-outline text-base flex-shrink-0">spa</span>
        )}
        {depth > 0 && (
          <span className="w-1 h-1 rounded-full bg-outline/50 flex-shrink-0" />
        )}

        <a
          href={`#cat-${node.id}`}
          onClick={onLinkClick}
          className={`flex-1 py-2 text-on-surface-variant hover:text-primary transition-colors ${
            depth === 0 ? 'font-sans text-label-sm' : 'font-sans text-body-md'
          }`}
        >
          {node.name}
        </a>

        {hasSubs && (
          <button
            onClick={() => toggle(node.id)}
            className="p-1 text-outline hover:text-primary transition-colors flex-shrink-0"
            aria-label={isOpen ? 'Colapsar' : 'Expandir'}
          >
            <span
              className="material-symbols-outlined text-sm block transition-transform duration-200"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              expand_more
            </span>
          </button>
        )}
      </div>

      {hasSubs && isOpen && (
        <div>
          {node.children.map((child) => (
            <NavItem
              key={child.id}
              node={child}
              depth={depth + 1}
              openIds={openIds}
              toggle={toggle}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function SidebarNav({
  tree,
  onLinkClick,
}: {
  tree: CategoryNode[]
  onLinkClick?: () => void
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <nav className="flex flex-col">
      {tree.map((node) => (
        <NavItem
          key={node.id}
          node={node}
          depth={0}
          openIds={openIds}
          toggle={toggle}
          onLinkClick={onLinkClick}
        />
      ))}
    </nav>
  )
}
