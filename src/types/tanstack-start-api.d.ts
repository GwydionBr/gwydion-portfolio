declare module '@tanstack/react-start/api' {
  type ApiHandlerContext = {
    request: Request
  }

  type ApiRouteOptions = Partial<
    Record<
      'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD',
      (context: ApiHandlerContext) => Response | Promise<Response>
    >
  >

  export function createAPIFileRoute<Path extends string>(
    path: Path,
  ): (options: ApiRouteOptions) => ApiRouteOptions
}
