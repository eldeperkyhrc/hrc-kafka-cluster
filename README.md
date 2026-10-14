# HRC Kafka Cluster

An interactive React presentation and visualization for the HRC Kafka cluster.
The project uses Vite for local development and production builds.

## Requirements

- Node.js 20.19+ or 22.12+ (Vite 8 requirement)
- npm

## First-time setup

From the project root, install the dependencies:

```powershell
npm install
```

## Run locally

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The server
serves on port 3000 and listens on all network interfaces.

## Stop and re-run

- **Stop:** In the terminal running the dev server, press `Ctrl+C`.
- **Re-run:** From the project root, run `npm run dev` again. You only need to
  run `npm install` again if dependencies have changed or `node_modules` is
  missing.
- **Port already in use:** Stop the process using port 3000, or change the
  port in the `dev` script in `package.json`, then run `npm run dev`.

## Build and preview

Create a production build:

```powershell
npm run build
```

The generated static files are written to `dist/`. To serve that build locally:

```powershell
npm run preview
```

Open the URL printed by Vite (by default, http://localhost:4173). Stop the
preview server with `Ctrl+C`.

## Type-check

Run the TypeScript check:

```powershell
npm run lint
```
