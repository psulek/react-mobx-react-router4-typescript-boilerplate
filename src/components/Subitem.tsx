import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import AppState from '../stores/AppState';
import DataWrapper from './DataWrapper';
import Protected from './Protected';

@DataWrapper @Protected @inject('store') @observer
export default class Subitem extends React.Component<{ store?: AppState }, any> {
    store: AppState;

    constructor(props) {
        super(props);
        this.store = this.props.store;
    }
    render() {
        return (
            <div className='page post'>
                <Link to='/posts'>&larr; Back to Posts</Link>
                {!!this.store.item && (
                    <article>
                        <h1>{this.store.item.title}</h1>
                        <p>{this.store.item.body}</p>
                    </article>
                )}

            </div>
        );
    }
}