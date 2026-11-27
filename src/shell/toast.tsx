import { Notifications, notifications } from '@mantine/notifications'
import { CheckCircle, WarningCircle } from '@phosphor-icons/react'
import classes from './toast.module.css'

/**
 * Toasts: a short note that something the visitor did worked or failed,
 * where the page itself doesn't show it (an address copied to the
 * clipboard). One shows for a few seconds in the corner, above the phone's
 * tab bar, and screen readers announce it. Built on Mantine Notifications;
 * the look is the theme's (`Notification` in src/theme/components.ts).
 */

/** Whether what the toast reports worked or failed. */
export type ToastTone = 'success' | 'danger'

const TONES = {
  success: { icon: CheckCircle, color: 'available' },
  danger: { icon: WarningCircle, color: 'danger' },
} as const

/**
 * Shows a toast. `id` names what it reports: while one with the same `id`
 * shows, another isn't added (a second copy of the same address).
 */
export function showToast({
  id,
  message,
  tone = 'success',
}: {
  id: string
  message: string
  tone?: ToastTone
}) {
  const { icon: Icon, color } = TONES[tone]
  notifications.show({
    id,
    message,
    color,
    icon: <Icon aria-hidden size={20} weight="fill" />,
  })
}

/** Where the toasts show: rendered in the shell, so they keep clear of its bars. */
export function Toasts() {
  return (
    <Notifications
      withinPortal={false}
      position="bottom-right"
      containerWidth={360}
      limit={3}
      autoClose={4000}
      className={classes.toasts}
    />
  )
}
