## Overview

This is an early version and temporary site for the Filecoin Foundation for the Decentralized Web (FFDW). 

In the interest of time, this current version simply reflects the design and is implemented with a single SVG object, and minimal interactivity. This implementation is designed to only be a stopgap, and will need to be updated in favor of an accessible, portable, and extensible alternative.

## Build

- `develop` is the staging branch which deploys to [staging-mmfpfrmycb.ffdweb.org](//staging-mmfpfrmycb.ffdweb.org)
- `main` is the staging production branch which _will_ deploy to [ffdweb.org](//ffdweb.org)

No build necessary at the moment. This is a simple static site requiring no compilation.

Eventually this will be turned into a `nuxt` static app.

## Content

At this time, content is not abstracted from the SVG object.

The content within the `develop` branch is treated as not indexable by search, so a `noindex, nofollow` attribute is used. This value should not be retained for the production site, or the `main` branch.
