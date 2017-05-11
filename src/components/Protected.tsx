import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import AppState from '../stores/AppState';

export default function Protected(Component: any): any {
    @inject('store') @observer
    class AuthenticatedComponent extends React.Component<{ store?: AppState, location: string }, any> {
        store: AppState;

        constructor(props) {
            super(props);
            this.store = this.props.store;
        }

        render() {
            const { authenticated, authenticating } = this.store;
            return (
                <div className='authComponent'>
                    {authenticated ? <Component {...this.props} /> : !authenticating && !authenticated ? <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} /> : null}
                </div>
            );
        }

    }

    return AuthenticatedComponent;
}