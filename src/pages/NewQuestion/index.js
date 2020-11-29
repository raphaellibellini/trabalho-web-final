import React, { useState } from 'react';
import Header from '../../components/Header';
import MenuEnade from '../../components/MenuEnade';
import { useHistory } from 'react-router-dom';
import api from '../../service/api';
import logoAzul from '../../imgs/logoAzul.svg';
import { Input, Button, Select, Checkbox, TextArea } from 'semantic-ui-react';
import If from '../../components/If';
import './styles.css';

function NewQuestion() {
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaE, setAlternativaE] = useState('');
    const [correta, setCorreta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [estadoQuestao, setEstadoQuestao] = useState(true);
    const [idTpQuestao, setIdTpQuestao] = useState(1);

    // const history = useHistory();

    const tipoOptions = [
        { value: 1, text: 'Discursivas (formação geral)' },
        { value: 2, text: 'Objetivas (formação geral)' },
        { value: 3, text: 'Discursivas (componente específico)' },
        { value: 4, text: 'objetivas (componente específico)' }        
    ]

    async function handleRegister(e) {
        e.preventDefault(); 
        const data = {
            alternativaA,
            alternativaB,
            alternativaC,
            alternativaD,
            alternativaE,
            correta,
            descricao,
            estadoQuestao,
            idTpQuestao
        }
        console.log('data', data);

        try {
            const response = await api.post('questao/cadastrar', data);
            console.log('resp', response);
            alert(`Questão cadastrada com sucesso!`);
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className='divCadastroQuestao'>
            <section className='sectionQuestao'>
                <img src={logoAzul} alt="Logo do Enade" className='logo'/>
                <h1>Cadastro de questão</h1>
                <form onSubmit={handleRegister} className='formQuestao'>
                    <div className='inputs'>
                        <Select placeholder='Selecione o tipo da questão' options={tipoOptions} className='selectCadastro' value={idTpQuestao} onChange={(e, data) => setIdTpQuestao(data.value)}/>
                        <TextArea placeholder='Pergunta' style={{ minHeight: 100 }} className='inputCadastro' value={descricao} onChange={e => setDescricao(e.target.value)}/>
                        <TextArea placeholder='Resposta' style={{ minHeight: 80 }} className='inputCadastro' value={correta} onChange={e => setCorreta(e.target.value)}/>
                        <Button className='buttonCadastro' type='submit'>Cadastrar</Button>
                    </div>
                    <If condition={idTpQuestao === 2 || idTpQuestao === 4} >
                        <div className='alternativas'>
                            <Input placeholder='Alternativa A' className='inputCadastro' value={alternativaA} onChange={e => setAlternativaA(e.target.value)}/>
                            <Input placeholder='Alternativa B' className='inputCadastro' value={alternativaB} onChange={e => setAlternativaB(e.target.value)}/>
                            <Input placeholder='Alternativa C' className='inputCadastro' value={alternativaC} onChange={e => setAlternativaC(e.target.value)}/>
                            <Input placeholder='Alternativa D' className='inputCadastro' value={alternativaD} onChange={e => setAlternativaD(e.target.value)}/>
                            <Input placeholder='Alternativa E' className='inputCadastro' value={alternativaE} onChange={e => setAlternativaE(e.target.value)}/>
                        </div>
                    </If>
                </form>
            </section>
        </div>
    );
}

export default NewQuestion;