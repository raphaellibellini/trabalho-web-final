import React, { useState } from 'react';
import ilustracaoCadastro from '../../imgs/ilustracaoCadastro.svg';
import logoAzul from '../../imgs/logoAzul.svg';
import { Input, Button, Select } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import api from '../../service/api';
import './styles.css';

function Register() {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [idTipoUsuario, setIdTipoUsuario] = useState(1);

    const history = useHistory();

    const tipoOptions = [
        { value: 1, text: 'Professor' },
        { value: 2, text: 'Estudante' }        
    ]

    async function handleRegister(e) {
        e.preventDefault(); 
        const data = {
            emailUsuario,
            idTipoUsuario,
            nomeUsuario,
            senhaUsuario
        }

        try {
            const response = await api.post('usuario/cadastrar', data);
            console.log('resp', response);
            alert(`Usuário cadastrado com sucesso!`);
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className='divCadastro'>
            <section className='cadastro-form'>
                <img src={logoAzul} alt="Logo do Enade" className='logo'/>
                <h1>Cadastro de usuário</h1>
                <form onSubmit={handleRegister} >
                    <Input placeholder='Nome' className='inputCadastro' value={nomeUsuario} onChange={e => setNomeUsuario(e.target.value)}/>
                    <Select placeholder='Professor ou estudante' options={tipoOptions} className='selectCadastro' value={idTipoUsuario} onChange={(e, data) => setIdTipoUsuario(data.value)} />
                    <Input placeholder='Usuário' className='inputCadastro' value={emailUsuario} onChange={e => setEmailUsuario(e.target.value)} />
                    <Input placeholder='Senha' className='inputCadastro' value={senhaUsuario} onChange={e => setSenhaUsuario(e.target.value)}/>
                    <Button className='buttonCadastro' type='submit'>Cadastrar</Button>
                </form>
            </section>
            <img src={ilustracaoCadastro} alt="Pessoa pulando com beca de formatura" className='ilustracaoCadastro' />
        </div>
    )
}

export default Register;