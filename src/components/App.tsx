import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';
import LazyRoute from 'lazy-route';
import DevTools from 'mobx-react-devtools';

import AppState from '../stores/AppState';
import TopBar from './TopBar';

/*function asyncImport(file) {
  return (nextState, cb) =>
    System.import(file)
      .then((m: any) => cb(null, m.default))
      .catch(err => console.log(err));
}*/

/*if (DEV) {
    require('./Home');
    require('./Subpage');
    require('./Subitem');
    require('./Login');
}
*/
@observer
export default class App extends React.Component<{ store: AppState }, any> {
    store: AppState;

    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    componentDidMount() {
        this.authenticate();

    }

    authenticate(e?: React.SyntheticEvent<HTMLElement>) {
        if (e) e.preventDefault();
        this.props.store.authenticate();
    }

    render() {
        // const { authenticated, authenticating, timeToRefresh, refreshToken } = this.store;
        const { authenticated, authenticating } = this.store;

        return (
            <Router>
                <Provider store={this.store}>
                    <div className='wrapper'>
                        {/*<DevTools />*/}
                        <TopBar />

                        <Route
                            exact
                            path='/'
                            render={(props) => <LazyRoute {...props} component={System.import('./Home')} />} />
                        <Route
                            exact
                            path='/posts'
                            render={(props) => <LazyRoute {...props} component={System.import('./Subpage')} />} />
                        <Route
                            exact
                            path='/posts/:id'
                            render={(props) => <LazyRoute {...props} component={System.import('./Subitem')} />} />
                        <Route
                            exact
                            path='/login'
                            render={(props) => <LazyRoute {...props} component={System.import('./Login')} />} />
                        {/*{!!(timeToRefresh && timeToRefresh <= 4) && this.store.refreshToken()}*/}
                        <footer>
                            Cobbled together by <a href='https://twitter.com/mhaagens' target='_blank'>
                                @mhaagens</a> | github: <a href='https://github.com/mhaagens' target='_blank'>mhaagens
                            </a>
                        </footer>
                    </div>
                </Provider>
            </Router>
        );
    }
}