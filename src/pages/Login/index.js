import React from 'react';
import ilustracaoLogin from '../../imgs/ilustracaoLogin.svg';
import logoAzul from '../../imgs/logoAzul.svg';
import { Input, Button } from 'semantic-ui-react'
import './styles.css';

function Login() {
    return (
        <div className='divLogin'>
            <section className='login-form'>
                <img src={logoAzul} alt="Logo do Enade" className='logo'/>
                <h1 className='titleLogin'>Login</h1>
                <Input placeholder='Usuário' className='inputLogin' />
                <Input placeholder='Senha' className='inputLogin' />
                <Button className='buttonLogin'>Entrar</Button>
            </section>
            <img src={ilustracaoLogin} alt="Pessoa pulando com beca de formatura" className='ilustracaoLogin' />
        </div>
    )
}

export default Login;