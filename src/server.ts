import handler from '@tanstack/react-start/server-entry'
import { paraglideMiddleware } from '#/generated/paraglide/server'

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request))
  },
}
