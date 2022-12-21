# CRA Custom Template

Production ready template bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What is on the table

### Remove source-map and image inline in production

Remove webpack source-map ([`GENERATE_SOURCEMAP=false`](/.env)) and image-inline ([`IMAGE_INLINE_SIZE_LIMIT=0`](/.env)).

### Custom env

- `development` : Development build
- `staging` : Production build with configs loaded from `.env.staging`
- `production` : Production build with configs loaded from `.env.production`
- `staging-hydrate` : Production build with configs loaded from `.env.staging.hydrate` and hydrated dom with [`react-snap`](https://www.npmjs.com/package/react-snap) to boost LCP speed
- `production-hydrate` : Production build with configs loaded from `.env.production.hydrate` and hydrated dom with [`react-snap`](https://www.npmjs.com/package/react-snap) to boost LCP speed

### Static path for built files

Adjust static resourses public path using `REACT_APP_PUBLIC_PATH` key in any desired .env file

### CSS module class name config

- Default `fileNameOrFolder_localName__hash` class name for development and staging environments for debugging, but only use `hash` for production environment to reduce final CSS file size.
- Hash length can be configured in any desired .env file using `CSS_MODULE_HASH_LENGTH` key.
- Support class name pre-fix using `CSS_MODULE_PREFIX` key in any desired .env file. By default, `hash` is generate based on class name and css file path, so it's guaranteed to have unique hash for each class name **ONLY ON CURRENT PROJECT**. Sometimes, hashes can still clash on websites built with micro front-end architecture. With micro front-end architecture, unique class name and css file path is not something we can guarantee, so, for safety, we can add different pre-fix for each micro front-ends, which will allow us to have unique hashes.

### Build output versioning

Disable hash filename, instead, use version in [`package.json`](/package.json) for versioning.

### Linter

- ESLint with airbnb configs
- Stylelint with SCSS and SCSS module configs
- Pre-commit hook to format, run test and lint committed files

### Baseline CSS preset

CSS normalize and global utilities CSS classes preset in [`src/styles`](/src/styles/).

### Local server for testing build output

Local [Expressjs](https://expressjs.com/) server to serve file in build folder for testing staging/production build.

Configure server in [server.js](./server.js) file.

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

console.log(formatDate(1669620413128)); // 28/11/2022
```

#### [fetchJson](/src/utils/fetchJson.ts)

Handle HTTP request and process response

```ts
import fetchJson from './utils/fetchJson';

fetchJson<string>({
  path: '/my/api/path',
  method: 'POST',
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

const data = await fetchJson<string>({
  path: '/my/api/path',
  method: 'POST',
  body: { payload },
});
// if an exception is thrown, or error_code < 0, helper will return undefined
console.log(data); // data will have string | undefined type
```

#### [safeArr](/src/utils/safeArr.ts)

Make sure output is always an array (best used for type guarding when fetching data)

```ts
import safeArr from './utils/safeArr';

console.log(safeArr([1, 2, 3, 4])); // [1, 2, 3, 4]
console.log(safeArr(['a', 'b', 'c', 'd'])); // ['a', 'b', 'c', 'd']
console.log(safeArr(undefined)); // []
console.log(safeArr(1)); // []
```

```tsx
// this component will not throw render exception even if server responds with null or undefined as data
import { useEffect, useState } from 'react';
import fetchJson from './utils/fetchJson';
import safeArr from './utils/safeArr';

const MyList = () => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    void fetchJson<string[]>({
      path: '/my/api/path',
      success: (data) => {
        // prevent non-array data
        setList(safeArr(data));
      },
      fail: (resp) => {
        console.error(resp.error_message);
      },
    });
  }, []);

  // safe to use array methods and properties
  return (
    <>
      <h2>Total: {list.length}</h2>
      {list.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </>
  );
};

export default MyList;
```
