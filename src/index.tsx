import './styles/main.scss';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import { CodeSplitProvider, rehydrateState } from 'code-split-component';

import App from './components/App';
import AppState from './stores/AppState';
// import ReactHotLoader from './components/ReactHotLoader';

declare var module: any;

const appState = new AppState();

const container = document.getElementById('root');

/*
// NOTE: #3
function renderApp(TheApp) {
    rehydrateState().then(codeSplitState =>
        render(
            <ReactHotLoader>
                <CodeSplitProvider state={codeSplitState}>
                        <TheApp />
                </CodeSplitProvider>
            </ReactHotLoader>,
            container,
        ),
    );
}

// The following is needed so that we can support hot reloading our application.
if (DEV && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    './components/App',
    () => renderApp(require('./components/App').default),
  );
}
// Execute the first render of our app.
renderApp(App);
*/



/*
// NOTE: #2
const rootEl = document.getElementById('root');
const render = () =>
    ReactDOM.render(
        <AppContainer>
            <App store={appState} />
        </AppContainer>,
        rootEl
    );

render();
if (module.hot) module.hot.accept('./components/App', () => render());
*/


/*
// NOTE: #1
ReactDOM.render(
    <AppContainer>
        <App store={appState} />
    </AppContainer>,
    document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/App', () => {
        ReactDOM.render(
            <AppContainer>
                <App store={appState} />
            </AppContainer>
            ,
            document.getElementById('root')
        );
    });
}*/

const renderApp = (TheApp) =>
    render(
        <AppContainer>
            <TheApp store={appState} />
        </AppContainer>,
        container
    );

if (DEV && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    './components/App',
    () => renderApp(require('./components/App').default),
  );
}

renderApp(App);