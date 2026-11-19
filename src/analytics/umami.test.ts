import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vite-plus/test'
import { eventAttributes, UMAMI_PROXY_PREFIX, umamiScript } from './umami'

const UMAMI_ORIGIN = 'https://analytics.gwydion.dev'

describe('The Umami proxy', () => {
  it('is rewritten to the Umami server in vercel.json, for the tracker and its endpoint', () => {
    const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as {
      rewrites?: { source: string; destination: string }[]
    }
    expect(config.rewrites).toEqual(
      expect.arrayContaining([
        { source: `${UMAMI_PROXY_PREFIX}/s.js`, destination: `${UMAMI_ORIGIN}/s.js` },
        // The server's COLLECT_API_ENDPOINT; the tracker sends to `<data-host-url>/api/e`.
        { source: `${UMAMI_PROXY_PREFIX}/api/e`, destination: `${UMAMI_ORIGIN}/api/e` },
      ]),
    )
  })

  it('is where the tracker loads from and sends to', () => {
    const script = umamiScript()
    expect(script.src).toBe(`${UMAMI_PROXY_PREFIX}/s.js`)
    expect(script['data-host-url']).toBe(UMAMI_PROXY_PREFIX)
  })
})

describe('Umami event attributes', () => {
  it('name the event and carry its data as one attribute per key', () => {
    expect(
      eventAttributes({ name: 'projekt-website-klick', data: { projekt: 'self-engine' } }),
    ).toEqual({
      'data-umami-event': 'projekt-website-klick',
      'data-umami-event-projekt': 'self-engine',
    })
    expect(eventAttributes({ name: 'github-klick' })).toEqual({
      'data-umami-event': 'github-klick',
    })
  })
})
