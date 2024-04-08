# Learning Projects Monorepo

This is a [Nx monorepo](https://nx.dev/getting-started/intro)

It contains projects where I'm learning and trying out new technologies, experimenting with various libraries and frameworks. It's a playground for everything from React and Next.js to Node.js.

## Prerequisites

To ensure consistency across development environments, this project uses a specific Node.js version. I recommend using [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) to install and manage Node.js versions.

- Node.js v20
- npm v10.2.4 (or newer)

## Getting Started

First, make sure you have the prerequisites installed. Then, clone the repository and install dependencies with `npm`:

```bash
git clone https://github.com/labikmartin/learning-projects-monorepo.git
cd learning-projects-monorepo
nvm use
npm install
```

## Available Scripts

In this project, you can run the following scripts using npm:

### Nx

- `npm run graph`: Visualizes the dependency graph of the monorepo.

### Apps

#### Eshop Express app

- `npm run eshop-express-app:serve`: Serves Express Eshop API App in development mode.

#### Recipes app

- `npm run recipes-app:start`: Starts the Recipes App.
- `npm run recipes-app:serve`: Serves the Recipes App in development mode.
- `npm run recipes-app:build`: Builds the Recipes App for production.
- `npm run recipes-app:test`: Runs tests for the Recipes App.
- `npm run recipes-app:e2e`: Runs end-to-end tests for the Recipes App.
- `npm run recipes-app:lint`: Lints the Recipes App.

### Libs

#### Common React components

- `npm run ui-react-components:test`: Runs tests for the UI React components.
- `npm run ui-react-components:test:watch`: Runs tests for the UI React components in watch mode.

#### Recipes app React components

- `npm run ui-recipes-app-components:test`: Runs tests for the UI Recipes app components.
- `npm run ui-recipes-app-components:test:watch`: Runs tests for the UI Recipes app components in watch mode.

There are also additional scripts available from [Nx Packages](https://nx.dev/nx-api). Check `Executors` or `Generators` for available scripts.

## Visualise monorepo dependencies and tasks

To help you navigate around the monorepo, you can run `npm run graph` or `npx nx graph` commands to visualise dependencies and available Nx tasks.

## Recommendations

I recommend using [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension for your IDE, if available.
