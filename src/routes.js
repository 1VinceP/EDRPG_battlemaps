import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Combat from './Views/Space/Combat';

export default (
    <Switch>
        <Route exact path='/' component={Combat} />
    </Switch>
)
