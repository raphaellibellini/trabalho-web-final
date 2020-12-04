import React, { useState } from 'react';
import ilustracaoLogin from '../../imgs/ilustracaoLogin.svg';
import logoAzul from '../../imgs/logoAzul.svg';
import { Input, Button } from 'semantic-ui-react'
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../service/api';

function Login() {
    const [emailUsuario, setEmailUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            emailUsuario,
            senhaUsuario
        }

        try {
            const resp = await api.post('usuario/logar', data);
            console.log('RESPOSTA LOGAR', resp);
            const alunologado = resp.data;

            localStorage.setItem('id', resp.data.id);
            localStorage.setItem('tipoUsuario', resp.data.tipoUsuario);

            if(alunologado.tipoUsuario === 'ALUNO') {
                history.push('/aluno');
            } else {
                history.push('/professor'); 
            }
            
        } catch (err) {
            alert('Erro no login, tente novamente.');
        }
    }

    return (
        <div className='divLogin'>
            <section className='login-form'>
                <img src={logoAzul} alt="Logo do Enade" className='logo'/>
                <h1 className='titleLogin'>Login</h1>
                <form onSubmit={handleLogin} className='formulario'>
                    <Input placeholder='Usuário' className='inputLogin' value={emailUsuario} onChange={e => setEmailUsuario(e.target.value)} />
                    <Input placeholder='Senha' className='inputLogin' value={senhaUsuario} onChange={e => setSenhaUsuario(e.target.value)} />
                    <Button className='buttonLogin' type='submit'>Entrar</Button>
                    <Link to="/register" className='cadastro'>Não tenho cadastro ainda? <strong>Cadastre-se!</strong></Link>
                </form>
            </section>
            <img src={ilustracaoLogin} alt="Pessoa pulando com beca de formatura" className='ilustracaoLogin' />
        </div>
    )
}

export default Login;