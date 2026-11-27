// What a Project story module exports besides its content: its sections,
// added by `remarkStorySections` (./storySections.ts) when it is compiled.
declare module '*.mdx' {
  export const sections: import('./storySections').StorySection[]
}
