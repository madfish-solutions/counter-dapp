# Tezos Counter Dapp: Truffle Box + React App

**Note: Experimental. Currently designed for demo purposes only.**

## Truffle Usage

- Install Truffle globally. Make sure you install `truffle@tezos`

  ```shell
  npm install -g truffle@tezos
  ```

- Compiling the example smart contracts

  ```shell
  truffle compile
  ```

- Starting the local sandbox Tezos node

  ```shell
  npm run start-sandbox
  ```

- Migrating contracts

  ```shell
  truffle migrate
  ```

- Running contract tests
  ```shell
  truffle test
  ```

## Sandbox Management

An archive mode sandbox Tezos node is provided in this box with RPC exposed at port `8732` and two accounts generously funded.

#### Commands

```shell
npm run start-sandbox
npm run kill-sandbox
npm run restart-sandbox
```

#### Available Accounts

| alias | pkh                                  | pk                                                     | sk                                                     |
| ----- | ------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| alice | tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb | edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn | edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq |
| bob   | tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6 | edpkurPsQ8eUApnLUJ9ZPDvu98E8VNj4KtJa1aZr16Cr5ow5VHKnz4 | edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt |

## Interacting with Live Networks

- A test faucet key can be obtained from https://faucet.tzalpha.net/. Once saved, it can be imported inside `truffle-config.js`:

  ```javascript
  const { mnemonic, secret, password, email } = require('./faucet.json');

  module.exports = {
    networks: {
      delphinet: {
        host: 'https://delphinet.smartpy.io',
        port: 443,
        network_id: '*',
        secret,
        mnemonic,
        password,
        email,
        type: 'tezos',
      },
    },
  };
  ```

- `truffle@tezos` also supports importing an activated account's secret key:

  ```javascript
  module.exports = {
    networks: {
      delphinet: {
        host: 'https://delphinet.smartpy.io',
        port: 443,
        network_id: '*',
        secretKey: 'edsk...', // private key
        type: 'tezos',
      },
    },
  };
  ```

  ```shell
  truffle migrate --network delphinet
  truffle test --network delphinet
  ```

## React App Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
