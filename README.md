# nft-frontend
The frontend of the BCharity NFT website

## Desired Content / Functions
- Create a system to upload items that will be turned into NFTs
```
 -> Indicate their interest to create an NFT 
 -> Choose a file to turn into an NFT 
 -> Select a Category 
 -> (Adding Tags?) 
 -> Sent to server for nft processessing
```

- Marketplace
    - Categories
    > Music
    > Visual Arts

    ## Goal: Create a NFT marketplace similar to [opensea.io](http://opensea.io)

Languages and skills required

- ReactJS
    - NodeJS
    - HTML5
    - CSS3
- git

## Initialization

Pull the git repository with

```bash
git clone https://github.com/BCharity-Net/nft-frontend.git
```

Install all required NPM packages with

```bash
yarn install
```

## Hosting the Environment

Run the environment with

```bash
yarn start
```

Once compiled, the following will be displayed

```bash
Compiled successfully!

You can now view nft-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://<ip>:3000

Note that the development build is not optimized.
To create a production build, use yarn run build.
```

Connect to the hosted website via `[http://localhost:3000](http://localhost:3000)` if the server was deployed on the same machine you will connect with. Otherwise, connect with `http://<ip>:3000`.

## Resolving Issues

Typically, if the development environment fails to start, try (one at a time)

```bash
nvm use 12.18.4
```

```bash
rm -r node_modules
yarn install
yarn start
```

```bash
rm yarn.lock
yarn start
```

```bash
yarn add react-scripts
yarn start
```

WINDOWS ONLY: in `package.json`

Replace:

```json

{
...
  "scripts": {
    "start": "BROWSER=none react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
...
}
```

With:

```json
{
...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
...
}
```
