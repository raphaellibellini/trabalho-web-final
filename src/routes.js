import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import NewQuestion from './pages/NewQuestion';
import Professor from './pages/Professor';
import Aluno from './pages/Aluno';
import Prova from './pages/Prova';
import RelacaoAlunos from './pages/RelacaoAlunos';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/register' component={Register} />
                {/* <Route path='/newquestion' component={NewQuestion} /> */}
                <Route path='/professor' component={Professor} />
                <Route path='/aluno' component={Aluno} />
                <Route path='/prova' component={Prova} />
                <Route path='/relacaoalunos' component={RelacaoAlunos} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;