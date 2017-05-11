import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import AppState from '../stores/AppState';

import TopNav from './TopNav';
import Button from './ui/Button';

@inject('store') @observer
export default class TopBar extends React.Component<{ store?: AppState }, any> {
    store: AppState;

    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    authenticate(e) {
        if (e) e.preventDefault();
        console.log('CLICKED BUTTON');
        this.store.authenticate();
    }

    render() {
        const { authenticated } = this.store;
        return (
            <div className='topbar'>
                <TopNav />
                <Button onClick={this.authenticate.bind(this)} title={authenticated ? 'Log out' : 'Sign in'} />
            </div>
        );
    }

}