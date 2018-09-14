import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Combat from './Views/Combat/Combat';
import CreateCharacter from './Views/CreateCharacter/CreateCharacter';
import UserCharacters from './Views/UserCharacters/UserCharacters';
import CharacterDisplay from './Views/CharacterDisplay/CharacterDisplay';
import Locked from './Views/Locked/Locked';

export default (
    <Switch>
        <Route exact path='/' component={Combat} />
        <Route path='/createcharacter' component={CreateCharacter} />
        <Route path='/playercharacters' component={UserCharacters} />
        <Route path='/characterdisplay/:id/:name' component={CharacterDisplay} />
        <Route path='/locked' component={Locked} />
    </Switch>
)
