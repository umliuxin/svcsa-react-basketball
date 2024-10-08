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
API URL is `http://svcsa-tf-api.westus.azurecontainer.io:3030/`
BUT given the unstable nature of Beta, it is expected to be up and down sometimes

To know more about the available APIs, check <http://svcsa-tf-api.westus.azurecontainer.io:3030/docs/>

### Connect to your local API

1. Run your local API server and make sure it is accessible through browser.
2. Create a file called `env.local`
3. Put `NEXT_PUBLIC_REACT_APP_API_DOMAIN = "{:YOUR_LOCAL_API_URL}"`
4. Restart Server

## Development

### JavaScript/TypeScript

### CSS

### Design

[TailWindCss](https://tailwindcss.com/docs/utility-first) is embedded in the Next.js.
Please use TailWindCss's utilities as much as possible.

For components, Please based on the component UI listed in [NextUI](https://nextui.org/docs/components/button)

## Testing

**Testing is not OPTIONAL**

## Deployment

Deployment is automatic after PullRequest merged to `master` branch
The change will be deployed to `beta` environment.


## How to contribute and collaborate

TBD
