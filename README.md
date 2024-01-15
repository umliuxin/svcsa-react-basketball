# SVCSA React

This is a [Next.js](https://nextjs.org/) application for SVCSA website

## Getting Started

```bash
# Install dependency
npm install

# Start local server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prerequisite

[Nest.js](https://nextjs.org/docs)

## Connect to API

This application is a **front end** React application. Technically it can work with production API, beta API or your local served API.

**Please DO NOT directly access production API during development.**

### Connect to Beta API

This is the default behavior if you don't make any further changes.
API URL is `http://beta-svcsa-api.westus.azurecontainer.io:3030`
BUT given the unstable nature of Beta, it is expected to be up and down sometimes

### Connect to your local API

1. Run your local API server and make sure it is accessible through browser.
2. Create a file called `env.local`
3. Put `REACT_APP_API_DOMAIN = "{:YOUR_LOCAL_API_URL}"`
4. Restart Server

## Development

- Ocassionally update dependency

```
npm install
```

## Deployment

TBD

## How to contribute and collaborate

TBD
