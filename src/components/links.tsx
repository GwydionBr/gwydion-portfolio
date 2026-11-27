import type { ComponentPropsWithRef } from 'react'
import {
  Anchor,
  Button,
  NavLink,
  UnstyledButton,
  type AnchorProps,
  type ButtonProps,
  type NavLinkProps,
  type UnstyledButtonProps,
} from '@mantine/core'
import { createLink } from '@tanstack/react-router'

/**
 * Mantine components as router links: typed `to`/`params`, preloading and
 * `aria-current="page"` from TanStack Router, the look from Mantine. Every
 * in-site link that looks like a Mantine component goes through one of these.
 */

type AnchorAttributes = Omit<ComponentPropsWithRef<'a'>, 'color' | 'style'>

/** A text link. */
export const RouterAnchor = createLink((props: AnchorProps & AnchorAttributes) => (
  <Anchor component="a" {...props} />
))

/** A link that looks like a button: `filled` for a place's one main action, `default` beside it. */
export const RouterButton = createLink((props: ButtonProps & AnchorAttributes) => (
  <Button component="a" {...props} />
))

/** A navigation row with an icon and a label (the sidebar). */
export const RouterNavLink = createLink(
  (props: Omit<NavLinkProps, 'component'> & Omit<AnchorAttributes, 'children'>) => (
    <NavLink component="a" {...props} />
  ),
)

/** A link with no look of its own: a card, a tab, a row styled by its CSS Module. */
export const RouterUnstyled = createLink((props: UnstyledButtonProps & AnchorAttributes) => (
  <UnstyledButton component="a" {...props} />
))
