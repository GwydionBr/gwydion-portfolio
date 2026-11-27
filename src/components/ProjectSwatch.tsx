import { Box, type MantineSpacing } from '@mantine/core'

/** A small square in a Project's accent colour. */
export function ProjectSwatch({ accent, mt }: { accent: string; mt?: MantineSpacing }) {
  return (
    <Box
      component="span"
      w={10}
      h={10}
      aria-hidden
      mt={mt}
      bg={accent}
      style={{ flexShrink: 0, borderRadius: 4 }}
    />
  )
}
