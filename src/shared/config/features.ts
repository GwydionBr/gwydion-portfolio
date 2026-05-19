const isBlogExplicitlyEnabled = import.meta.env.VITE_ENABLE_BLOG === 'true'

export const BLOG_ENABLED = import.meta.env.DEV || isBlogExplicitlyEnabled
