# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# COINOLOGI React - Architettura & Best Practices

## Struttura delle cartelle

```
src/
  features/           # Feature-based modules (pagine, logica specifica)
  hooks/              # Custom hooks riutilizzabili
  components/
    ui/               # Design system: Button, Input, Card, Modal, ecc.
    ErrorBoundary.js  # Error boundary globale
    ...               # Altri componenti
  pages/              # Pagine principali (lazy loaded)
  styles/             # CSS Modules e global.css
  utils/              # Funzioni di utilità
```

## Best Practices
- **CSS Modules** per isolamento degli stili
- **Feature-based architecture** per scalabilità
- **Custom hooks** per logica business riutilizzabile
- **Design system** con componenti base ottimizzati (React.memo)
- **Error boundaries** per gestione errori runtime
- **Lazy loading** e **Suspense** per performance
- **Testing** con Jest e React Testing Library

## Convenzioni
- I nomi dei file CSS Modules seguono il pattern `Component.module.css`
- I componenti UI sono riutilizzabili e documentati
- Tutta la logica business è estratta dai componenti di presentazione
- Le pagine sono caricate in modo asincrono

## Come estendere
- Per aggiungere una nuova feature, crea una cartella in `features/`
- Per nuovi componenti base, aggiungi in `components/ui/`
- Per nuova logica, crea un hook in `hooks/`

## Testing
- I test sono in file `.test.js` accanto ai componenti
- Usa `ErrorBoundary` per testare la resilienza dell'app

---
Questa architettura garantisce manutenibilità, performance e scalabilità a lungo termine.
