# Daymark Todo

A simple React todo app with a demo login and browser-based todo storage.

## Getting started

```sh
npm install
npm run dev
```

Sign in with the demo account:

- Email: `student@example.com`
- Password: `password123`

Todos are stored in this browser's localStorage. The login is a client-side demo and does not provide real authentication.

## Available commands

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run lint` — check the source with Oxlint

## Project structure

```text
src/
  App.jsx        App state, demo navigation, and todo persistence
  LoginPage.jsx  Demo login form and validation
  TodoPage.jsx   Todo list, filters, and task actions
  index.css      Responsive application styles
  main.jsx       React entry point
index.html       Page metadata and app mount point
```
