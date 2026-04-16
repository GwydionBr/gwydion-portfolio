import type { ElementType, ReactNode } from 'react'
import { Box, Container, Paper, Text, Title, type PaperProps } from '@mantine/core'

interface PageMainProps {
  children: ReactNode
  pt?: number | string
}

export function PageMain({ children, pt = 100 }: PageMainProps) {
  return (
    <Box component="main" pt={pt} style={{ position: 'relative', zIndex: 1 }}>
      {children}
    </Box>
  )
}

interface PageContainerProps {
  children: ReactNode
  pb?: number | string
}

export function PageContainer({ children, pb }: PageContainerProps) {
  return (
    <Container size={1080} px={28} pb={pb}>
      {children}
    </Container>
  )
}

interface EyebrowProps {
  children: ReactNode
  mb?: number | string
}

export function Eyebrow({ children, mb = 0 }: EyebrowProps) {
  return (
    <Text
      component="span"
      display="block"
      mb={mb}
      ff="var(--mantine-font-family-monospace)"
      fz="0.68rem"
      c="var(--app-text-muted)"
      style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
    >
      {children}
    </Text>
  )
}

interface DisplayTitleProps {
  children: ReactNode
  order?: 1 | 2 | 3
  size?: 'hero' | 'page' | 'section' | 'card' | string
  mb?: number | string
}

const titleSizes = {
  hero: 'clamp(3.5rem, 10vw, 9rem)',
  page: 'clamp(3rem, 7vw, 6rem)',
  section: 'clamp(2rem, 5vw, 3.5rem)',
  card: 'clamp(1.6rem, 3vw, 2.4rem)',
}

export function DisplayTitle({ children, order = 1, size = 'page', mb = 0 }: DisplayTitleProps) {
  const fontSize = size in titleSizes ? titleSizes[size as keyof typeof titleSizes] : size

  return (
    <Title
      order={order}
      className="display"
      mb={mb}
      style={{
        fontSize,
        lineHeight: size === 'hero' ? 0.95 : order === 1 ? 0.96 : 1.1,
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </Title>
  )
}

interface AccentRuleProps {
  my?: number | string
}

export function AccentRule({ my = 40 }: AccentRuleProps) {
  return (
    <Box
      component="span"
      display="block"
      my={my}
      style={{
        width: 40,
        height: 1,
        background: 'linear-gradient(90deg, var(--app-accent-gold), transparent)',
        border: 'none',
      }}
    />
  )
}

type AppCardProps = PaperProps & {
  children?: ReactNode
  className?: string
  component?: ElementType
  to?: string
  href?: string
  target?: string
  rel?: string
}

export function AppCard({ className, ...props }: AppCardProps) {
  const PaperComponent = Paper as ElementType<AppCardProps>

  return (
    <PaperComponent
      withBorder
      className={className ? `app-card ${className}` : 'app-card'}
      {...props}
    />
  )
}
