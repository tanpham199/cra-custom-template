# React Project Skeleton

Production ready skeleton bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What is on the table

### Remove source-map and image inline in production

Remove webpack source-map ([`GENERATE_SOURCEMAP=false`](/.env)) and image-inline ([`IMAGE_INLINE_SIZE_LIMIT=0`](/.env)).

### Custom env

- `development` : Development build
- `staging` : Production build with configs loaded from `.env.staging`
- `production` : Production build with configs loaded from `.env.production`
- `staging-hydrate` : Production build with configs loaded from `.env.staging.hydrate` and hydrated dom with `react-snap` to boost LCP speed
- `production-hydrate` : Production build with configs loaded from `.env.production.hydrate` and hydrated dom with `react-snap` to boost LCP speed

### CSS module className config

Only use `hash` for className for production environment and default `fileNameOrFolder_localName__hash` className for other environments.

Hash length can be configured in [`.env`](/.env) using `CSS_MODULE_HASH_LENGTH` key.

### Build output versioning

Disable hash filename, instead, use version in [`package.json`](/package.json) for versioning

### Linter

- ESLint with airbnb configs
- Stylelint with SCSS and SCSS module config
- Pre-commit hook to format, run test and lint committed files

### Baseline CSS preset

CSS normalize and global utilities CSS classes preset in [`src/styles`](/src/styles/)

### Utilities functions

Utilities functions in [`src/utils`](/src/utils/)

#### [cx](/src/utils/cx.ts)

Conveniently join css classes and filter falsy values

```tsx
import cx from './utils/cx';
import styles from './Fancy.module.css';

const Fancy = () => (
  <div className={cx(styles.fancy, true && 'take', false && 'ignore', true ? 'foo' : 'bar')}>
    My Fancy Div
  </div>
);

export default Fancy;

/* expected render element
<div class="_fancy_hash take foo">
  My Fancy Div
</div>
*/
```

#### [formatDate](/src/utils/formatDate.ts)

Format date string or date mili-second into human readable string using native Date constructor

```ts
import formatDate from './utils/formatDate';

console.log(formatDate(1669620413128));

/* expected console output
28/11/2022
*/
```

#### [safeArr](/src/utils/safeArr.ts)

Make sure output is always an array (best used for type guarding when fetching data)

```tsx
import safeArr from './utils/safeArr';

console.log(safeArr([1, 2, 3, 4]));
console.log(safeArr(['a', 'b', 'c', 'd']));
console.log(safeArr(undefined));
console.log(safeArr(1));

/* expected console output
[1, 2, 3, 4]
['a', 'b', 'c', 'd']
[]
[]
*/

safeArr(response.data).map((item) => <div key={item}>{item}</div>); // this will not throw render exception even if server return undefined as data
```

#### [getJson](/src/utils/apis/getJson.ts)

Handle get request and process response

```ts
import getJson from './utils/apis/getJson';

getJson<string>({
  path: '/my/api/path',
  success: (data) => {
    console.log(data); // data will have string type
  },
  fail: (resp) => {
    console.error(resp.error_message);
  },
  finished: () => {
    console.log('All done');
  },
});

// OR

const data = await getJson<string>({
  path: '/my/api/path',
});
// if an exception is thrown, or error_code < 0, helper will return undefined
console.log(data); // data will have string | undefined type
```

#### [postJson](/src/utils/apis/postJson.ts)

Handle post request and process response

```ts
import postJson from './utils/apis/postJson';

postJson<string>({
  path: '/my/api/path',
  body: { payload },
  success: (data) => {
    console.log(data); // data will have string type
  },
  fail: (resp) => {
    console.error(resp.error_message);
  },
  finished: () => {
    console.log('All done');
  },
});

// OR

const data = await postJson<string>({
  path: '/my/api/path',
  body: { payload },
});
// if an exception is thrown, or error_code < 0, helper will return undefined
console.log(data); // data will have string | undefined type
```
