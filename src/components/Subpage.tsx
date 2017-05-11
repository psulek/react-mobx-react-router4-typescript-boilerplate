import * as React from 'react';
import { inject, observer } from 'mobx-react';
// import { Match, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { match } from 'react-router';

import AppState from '../stores/AppState';
import Protected from './Protected';
import DataWrapper from './DataWrapper';

@Protected @DataWrapper @inject('store') @observer
export default class Subpage extends React.Component<{ store?: AppState, match: match<any> }, any> {
    store: AppState;

    constructor(props) {
        super(props);
        this.store = this.props.store;
    }
    render() {
        return (
            <div className='page posts'>
                <h1>Posts</h1>
                <p className='subheader'>Posts are fetched from jsonplaceholder.typicode.com</p>
                <hr />
                <ul>
                    {this.store.items && this.store.items.length ? this.store.items.slice(6, 12).map(post => {
                        return <li key={post.id}>
                            <Link to={`${this.props.match.path}/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{post.body.substring(0, 120)}</p>
                        </li>;
                    }) : 'Loading...'}
                </ul>
            </div>
        );
    }
}