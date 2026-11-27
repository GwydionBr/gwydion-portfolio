import type { StaticDataRouteOption } from '@tanstack/react-router'

/** What the second sidebar can list: a route names one in its `secondaryNavigation`. */
export type SecondaryNavigation = 'projects'

/**
 * What the second sidebar lists for a page, given its matched routes'
 * static data, outermost first: the first route that names a list; none
 * when no route does.
 */
export function secondaryNavigationOf(
  staticData: readonly (StaticDataRouteOption | undefined)[],
): SecondaryNavigation | undefined {
  return staticData.find((data) => data?.secondaryNavigation)?.secondaryNavigation
}
