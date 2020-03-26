import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Registrar from './pages/Registrar';
import Perfil from './pages/Perfil';
import NovoCaso from './pages/NovoCaso';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/registrar" component={Registrar} />
                <Route path="/perfil" component={Perfil} />
                <Route path="/casos/novo" component={NovoCaso} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;