import classes from './SelfEngineStage.module.css'

const LEAVES =
  'M64 5C83 22 84 45 64 61 44 45 45 22 64 5ZM123 64c-17 19-40 20-56 0 16-20 39-19 56 0ZM64 123c-19-17-20-40 0-56 20 16 19 39 0 56ZM5 64c17-19 40-20 56 0-16 20-39 19-56 0Z'

interface NorthstarMarkProps {
  size?: 'md' | 'lg'
}

/**
 * Self-Engine's Northstar mark on the round chip of the app header. The geometry is the
 * self-engine repo's `assets/brand/source/northstar.svg`; its colors come from that
 * repo's brand tokens through the stage's `--ns-*` variables, per color scheme.
 */
export function NorthstarMark({ size = 'md' }: NorthstarMarkProps) {
  return (
    <span className={classes.logoChip} data-size={size} aria-hidden>
      <svg viewBox="0 0 128 128">
        <path
          d={LEAVES}
          fill="var(--ns-leaves)"
          stroke="var(--ns-border)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d={LEAVES}
          transform="translate(64 64) rotate(45) scale(.78) translate(-64 -64)"
          fill="var(--ns-leaves-front)"
          stroke="var(--ns-border)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="64" cy="64" r="10" fill="var(--ns-center)" />
      </svg>
    </span>
  )
}
