import { useLingui } from '@lingui/react/macro'
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

/** What a toast says: `id` names what it reports, `message` says it. */
export interface Toast {
  /** While a toast with the same `id` shows, another isn't added (a second copy of the same address). */
  id: string
  message: string
  tone?: ToastTone
}

/** Shows toasts, their close button named in the Site language. */
export function useToast(): (toast: Toast) => void {
  const { t } = useLingui()
  const dismiss = t`Dismiss`
  return ({ id, message, tone = 'success' }) => {
    const { icon: Icon, color } = TONES[tone]
    notifications.show({
      id,
      message,
      color,
      icon: <Icon aria-hidden size={20} weight="fill" />,
      closeButtonProps: { 'aria-label': dismiss },
    })
  }
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
