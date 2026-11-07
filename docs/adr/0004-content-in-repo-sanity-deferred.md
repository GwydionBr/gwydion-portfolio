# Content lives in the repo; Sanity waits for the first Post

Profile, Projects and Career entries are typed, bilingual content files in the repository, not CMS documents, and the site stays a single app (no monorepo, no Studio). Gwydion is the only author and a developer: a commit plus automatic deploy is no burden, and it brings versioning, review and type checks. Sanity would have cost a second app, CMS-side translation, webhook-driven cache invalidation, draft preview and another processor in the privacy policy, for content that rarely changes. Pages read content through a narrow content interface whose shapes could map one-to-one onto a Sanity schema. Whether Posts then come from Sanity or from files in the repo is decided when the first Post is written; until then Writing is hidden.

The one thing lost: switching the Availability shown on the site takes a commit.
