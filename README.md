# React Project Skeleton

Production ready skeleton bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What is on the table

### Custom env

- `development` : Development build
- `staging` : Production build with configs loaded from `.env.staging`
- `production` : Production build with configs loaded from `.env.production`
- `staging-hydrate` : Production build with configs loaded from `.env.staging.hydrate` and hydrated dom with `react-snap`
- `production-hydrate` : Production build with configs loaded from `.env.production.hydrate` and hydrated dom with `react-snap`

### CSS module className config

Only use `hash` for className for production environment and default `fileNameOrFolder_localName__hash` className for other environments

### Build output versioning

Disable hash filename, instead, use version in `package.json` for versioning

### Linter

- ESLint with airbnb configs
- Stylelint with SCSS and SCSS module config
- Pre-commit hook to format, run test and lint committed files

### Baseline CSS preset

CSS normalize and global CSS classes preset in `src/styles`
