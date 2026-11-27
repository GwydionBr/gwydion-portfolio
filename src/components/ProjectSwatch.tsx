import { Box } from '@mantine/core'

/** A small square in a Project's accent colour. */
export function ProjectSwatch({ accent, className = '' }: { accent: string; className?: string }) {
  return (
    <Box
      component="span"
      w={10}
      h={10}
      aria-hidden
      className={className}
      bg={accent}
      style={{ flexShrink: 0, borderRadius: 4 }}
    />
  )
}
