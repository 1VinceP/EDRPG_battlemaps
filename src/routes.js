import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Combat from './Views/Combat/Combat';
import CharacterSheet from './Views/CharacterSheet/CharacterSheet';

export default (
    <Switch>
        <Route exact path='/' component={Combat} />
        <Route exact path='/character' component={CharacterSheet} />
    </Switch>
)
