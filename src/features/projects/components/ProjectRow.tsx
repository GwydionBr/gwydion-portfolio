import type { ReactNode } from 'react'
import { Link, type LinkProps } from '@tanstack/react-router'
import { ArrowUpRightIcon } from '@phosphor-icons/react'

type ProjectLink = { label: string } & ({ to: LinkProps['to'] } | { href: string })

export interface ProjectRowProps {
  title: string
  description: string
  image: { src: string; alt: string }
  /** The whole row links here; rendered as the title link. */
  primaryLink: ProjectLink
  secondaryLinks?: ProjectLink[]
  tags?: string[]
}

export function ProjectRow({
  title,
  description,
  image,
  primaryLink,
  secondaryLinks = [],
  tags = [],
}: ProjectRowProps) {
  return (
    <article className="project-row">
      <img src={image.src} alt={image.alt} loading="lazy" />
      <div>
        <h3>
          <ProjectAnchor link={primaryLink} className="project-row-title">
            {title} <ArrowUpRightIcon size={14} aria-hidden />
          </ProjectAnchor>
        </h3>
        <p>{description}</p>
        {tags.length > 0 && (
          <ul className="home-chips">
            {tags.map((tag) => (
              <li key={tag} className="home-chip">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {secondaryLinks.length > 0 && (
          <div className="project-row-links">
            {secondaryLinks.map((link) => (
              <ProjectAnchor key={link.label} link={link}>
                {link.label}
              </ProjectAnchor>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

interface ProjectAnchorProps {
  link: ProjectLink
  className?: string
  children: ReactNode
}

function ProjectAnchor({ link, className, children }: ProjectAnchorProps) {
  if ('to' in link) {
    return (
      <Link to={link.to} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}
