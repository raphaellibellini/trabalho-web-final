import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Professor from './pages/Professor';
import Aluno from './pages/Aluno';
import Prova from './pages/Prova';
import RelacaoAlunos from './pages/RelacaoAlunos';
import { isAuthenticated, checkRole } from './auth';


const PrivateRoute = ({ component: Component, role,...rest }) => (
    <Route 
        {...rest} 
        render={
            props => 
        ( isAuthenticated() && checkRole(role) )
         ? ( <Component {...props} /> ) 
         : ( role !== 'PROFESSOR' ) ? ( <Redirect to={{ pathname: '/professor', state: { from: props.location } }} /> ) : ( <Redirect to={{ pathname: '/aluno', state: { from: props.location } }} /> )
        } 
    />
)


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/register' component={Register} />
                <PrivateRoute role="PROFESSOR" path='/professor' component={Professor} />
                <PrivateRoute role="ALUNO" path='/aluno' component={Aluno} />
                <PrivateRoute role="ALUNO" path='/prova' component={Prova} />
                <PrivateRoute role="PROFESSOR" path='/relacaoalunos' component={RelacaoAlunos}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;