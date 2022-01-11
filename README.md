# BBRoster

A simple web app to keep track of Bloodbowl 2020 teams made with [Svelte](https://svelte.dev). I never intended to keep adding to this but here we are a year later. Initially it was exploration into svelte; apparently I've settled down. I haven't consciously adheared to any software development principles as it has been a form of relaxation for me. Feel free to fork and all that open source good stuff however open source was never a consideration!

## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see the app running.

If you're using [Visual Studio Code](https://code.visualstudio.com/) [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) is pretty handy.

If you want to serve your development build to the local network use:

```bash
npm run dev:serve
```

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`.

## Unit tests

There are limited unit tests using jest which can be run with:

```bash
npm run test
```

test:watch:

```bash
npm run test:watch
```

## E2E

Cypress e2es are run with each deploy.

Run against bbroster.com

```bash
npm run e2e
```

Run against local:

```bash
npm run e2e:local
```


## BBRoster.com status

[![Netlify Status](https://api.netlify.com/api/v1/badges/5f0ba70f-60e1-4d76-8f38-23841f127619/deploy-status)](https://app.netlify.com/sites/bbroster/deploys)
