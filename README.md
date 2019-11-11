# NKNx - The NKN node and wallet tracker
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/00558c860d8c4482b3a586ccfaab1e7a)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=CrackDavid/nknx&amp;utm_campaign=Badge_Grade)

## About
This is the frontend of NKNx. It is used to communicate with the [NKNx API](https://github.com/crackDavid/nknx-api) and is also taking care of user authentication.

## Prerequisites
Before you fork and run this repo on your own you need to first contact us to get your personal ``CLIENT_SECRET`` and ``CLIENT_ID``. Sadly our API got bruteforced recently so take this as a little "security feature". 
After obtaining your secret you can fork the repo and add an ``.env`` file to the NKNx root directory:

```
CLIENT_ID = YOUR_CLIENT_ID
CLIENT_SECRET = YOUR_CLIENT_SECRET
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

## Donations
If you're not a developer you can support us by sending tips on our NKN Mainnet address: ``NKNXXXXXGKct2cZuhSGW6xqiqeFVd5nJtAzg``
