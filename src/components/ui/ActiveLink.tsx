import * as React from 'react';
import { Route, Link, LinkProps } from 'react-router-dom';

const ActiveLink = ({ to, activeOnlyWhenExact, ...rest }: { to: string, activeOnlyWhenExact?: boolean, children?: any }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
            <Link to={to} {...rest} className={match ? 'active' : ''} />
        )}
    />
);

export default ActiveLink;