This is a webshop website using [dummyJSON](https://dummyjson.com/)'s API.

## How to run

First run a `npm install`/`npm i`.

After that, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Since this projust uses GitHub authentication you will have to create a new OAuth application [here](https://github.com/settings/developers).

You will have to create a `.env.local` file in the `/src` folder. In this file you will have to insert the Client ID and the Client secret.

```
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...
```

Also run `npx auth secret` in your terminal for a Authetication key that you will have to paste as well to the `.env.local` file.

```
AUTH_SECRET=...
```

---

P.S. Don't pay too much attention to the comments. :)
