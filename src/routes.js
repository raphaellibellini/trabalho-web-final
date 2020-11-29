import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NewQuestion from './pages/NewQuestion';
import Professor from './pages/Professor';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/newquestion' component={NewQuestion} />
                <Route path='/professor' component={Professor} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;