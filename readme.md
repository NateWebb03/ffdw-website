# Filecoin Foundation for the Decentralized Web

> Note: these docs will be expanded upon in a future iteration of the site

## Overview

- This is the repository for the _Filecoin Foundation for the Decentralized Web_ website ([ffdweb.org](https://ffdweb.org))
- This repo represents a static site which requires compilation, but can then be served as a static resource
- This site is hosted on IPFS and is compatible with relative URLs, for IPFS and IPNS gateway paths
- The site's resources are served statically, but internal navigation is virtualized: in other words, the site acts as an SPA when browsed on the client
- While a static site, this app can be extended at any time to a full application by changing the `target` in settings

## Stack
- Requires nodeJS and has been tested on node 16
- Uses a Vue framework, [nuxtJS](https://nuxtjs.org/), deployed in static mode

## Build
To build this site locally
- Clone this repo
- Make sure NodeJS 14 or newer is installed
- To build a static site
    - Run `npm ci && npm run generate`
    - A directory `dist` is created, which contains the static site output
- To run locally, for features like hot reload
    - Run `npm ci && npm run dev`
    - The site will be available in real time via a localhost URL

## URLs
- Staging - `develop` builds to `a non public url`
- Production - `main` builds to `ffdweb.org`
- Each PR will also generate an IPFS build preview link, so it can be validated before being merged

## Managing Content
- Areas to edit content
    - Structured content can be found in `json` files
    - Written paragraph-type content can be found in `md` files, in markdown format
    - See the `content/pages/` directory
    - _(As a future step these data structures will be integrated into a CMS)_
