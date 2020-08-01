## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

# Deploy functions

```shell
firebase deploy --only functions
```

# Set up functions configuration

```shell
firebase functions:config:set line.user_id="XXX"
firebase functions:config:get > .runtimeconfig.json
```

# Run the emulator suite

```shell
firebase emulators:start
```
