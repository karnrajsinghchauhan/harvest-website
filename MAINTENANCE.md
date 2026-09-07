# Harvest website

Next.js on Vercel. Company positioning: US registered, operations in the United States.

## Documentation

GitBook remains the editorial source. Its active Git Sync exports to
`karnrajsinghchauhan/harvest-docs` on `main`.

`lib/docs.generated.json` is generated from the public GitBook space, not a
second editorial copy. Do not edit its prose manually. The native reader shows
the snapshot date and source revision and links back to GitBook. Pages under
`internal-not-for-publication/` are excluded from imports and website search.

To refresh, configure a scoped `GITBOOK_API_TOKEN` using your normal secrets
manager, run `npm run docs:sync`, inspect the diff, and build/deploy.
The refresh refuses nonpublic spaces or a revision that changes during import.
No token has been added to this checkout or to Vercel. Automatic refresh is
not configured. Do not claim that a GitBook edit immediately updates this site.

The renderer supports the current source's Markdown tables, code diagrams,
links, headings, and warning hints. Raw HTML is not executed. The current
source contains no image attachments or Mermaid blocks.

Run `node --experimental-strip-types scripts/check-docs.mjs` for source,
search, and internal link checks, then `npm run build`.

## Media

No photography or video was supplied for this release. Add approved media
under `public/` and entries to `lib/media.ts`. Image entries require dimensions,
alt text, and a caption. Video entries require a poster, captions URL (WebVTT),
title, caption, and transcript. The gallery is hidden while the list is empty.
Playback uses native controls, no autoplay, and no preloading of the video.

## Verification and release limits

The preview browser rendered desktop HTML/CSS but blocked Next.js JavaScript
with ERR_BLOCKED_BY_CLIENT. Full interactive and mobile-browser verification
remains outstanding. Do not report browser interactions as passed.

GitHub write access was denied previously; this task did not retry or bypass it.
Preserve these commits before enabling a Git-triggered redeployment.
GitBook AI response add-ons were disabled at inspection and remain disabled.
