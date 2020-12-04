import React, { useState, useEffect } from 'react';
import MenuEnade from '../../components/MenuEnade';
import { Button, Card, Checkbox, Modal, Select, TextArea, Input, Icon } from 'semantic-ui-react'
import api from '../../service/api';
import If from '../../components/If';
import './styles.css';
import HeaderEnade from '../../components/HeaderEnade';
import format from 'date-fns/format';


function Professor() {
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaE, setAlternativaE] = useState('');
    const [correta, setCorreta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [estadoQuestao, setEstadoQuestao] = useState(true);
    const [idTpQuestao, setIdTpQuestao] = useState(1);
    const [editing, setEditing] = useState(false);
    const [questionEditing, setQuestionEditing] = useState('')

    const [questoes, setQuestoes] = useState([]);
    const [open, setOpen] = useState(false);

    let questoesProva = [];

    useEffect(() => {
        api.get('questao/listar-all').then(response => {
            setQuestoes(response.data);
        })
    }, []);

    const tipoOptions = [
        { value: 1, text: 'Discursivas (formação geral)' },
        { value: 2, text: 'Objetivas (formação geral)' },
        { value: 3, text: 'Discursivas (componente específico)' },
        { value: 4, text: 'objetivas (componente específico)' }        
    ]

    const tipoOptionsResp = [
        { value: 'alternativaA', text: 'Alternativa A' },
        { value: 'alternativaB', text: 'Alternativa B' },
        { value: 'alternativaC', text: 'Alternativa C' },
        { value: 'alternativaD', text: 'Alternativa D' },     
        { value: 'alternativaE', text: 'Alternativa E' },  
    ]


    async function handleAdd(e) {
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

        try {
            const response = await api.post('questao/cadastrar', data);
            console.log('resp', response);
            alert(`Questão cadastrada com sucesso!`);

            api.get('questao/listar-all').then(response => {
                setQuestoes(response.data);
            });
            setOpen(false);
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }


    async function handleEdit(questao) {        
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

        try {
            const response = await api.put(`questao/atualizar/${questao.idQuestao}`, data);
            console.log('resp', response);
            alert(`Questão cadastrada com sucesso!`);

            api.get('questao/listar-all').then(response => {
                setQuestoes(response.data);
            })
            setOpen(false);
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }


    async function editQuestion(questao) {
        if(!open) {
            setOpen(true);
        }
        setDescricao(questao.descricao);
        setCorreta(questao.correta);
        switch(questao.tpQuestao) {
            case 'Discursivas (formação geral)':
                setIdTpQuestao(1);
                break;
            case 'Objetivas (formação geral)':
                setIdTpQuestao(2);
                break;
            case 'Discursivas (componente específico)':
                setIdTpQuestao(3);
                break;
            case 'objetivas (componente específico)':
                setIdTpQuestao(4);
                break;
        }
        
        setAlternativaA(questao.alternativaA);
        setAlternativaB(questao.alternativaB);
        setAlternativaC(questao.alternativaC);
        setAlternativaD(questao.alternativaD);
        setAlternativaE(questao.alternativaE);
        setQuestionEditing(questao);
        setEditing(true);
    }


    function handleRegister(e) {
        e.preventDefault(); 
        editing ? handleEdit(questionEditing) : handleAdd();
        setDescricao('');
        setCorreta('');
        setIdTpQuestao(1);
        setAlternativaA('');
        setAlternativaB('');
        setAlternativaC('');
        setAlternativaD('');
        setAlternativaE('');
    }


    async function anular(questao) {
        let tipo = null;

        switch(questao.tpQuestao) {
            case 'Discursivas (formação geral)':
                tipo = 1;
                break;
            case 'Objetivas (formação geral)':
                tipo = 2;
                break;
            case 'Discursivas (componente específico)':
                tipo = 3;
                break;
            case 'objetivas (componente específico)':
                tipo = 4;
                break;
        }

        const data = {
            alternativaA: questao.alternativaA,
            alternativaB: questao.alternativaB,
            alternativaC: questao.alternativaC,
            alternativaD: questao.alternativaD,
            alternativaE: questao.alternativaE,
            correta: questao.correta,
            descricao: questao.descricao,
            estadoQuestao: false,
            idTpQuestao: tipo
        }

        try {
            const response = await api.put(`questao/atualizar/${questao.idQuestao}`, data);
            console.log('resp', response);
            alert(`Questão anulada`);

            api.get('questao/listar-all').then(response => {
                setQuestoes(response.data);
            })
            setOpen(false);
        } catch (err) {
            alert('Erro ao alterar o estado da questão, tente novamente.');
        }
    }


    async function validar(questao) {
        let tipo = null;

        switch(questao.tpQuestao) {
            case 'Discursivas (formação geral)':
                tipo = 1;
                break;
            case 'Objetivas (formação geral)':
                tipo = 2;
                break;
            case 'Discursivas (componente específico)':
                tipo = 3;
                break;
            case 'objetivas (componente específico)':
                tipo = 4;
                break;
        }

        const data = {
            alternativaA: questao.alternativaA,
            alternativaB: questao.alternativaB,
            alternativaC: questao.alternativaC,
            alternativaD: questao.alternativaD,
            alternativaE: questao.alternativaE,
            correta: questao.correta,
            descricao: questao.descricao,
            estadoQuestao: true,
            idTpQuestao: tipo
        }

        try {
            const response = await api.put(`questao/atualizar/${questao.idQuestao}`, data);
            console.log('resp', response);
            alert(`Questão validada`);

            api.get('questao/listar-all').then(response => {
                setQuestoes(response.data);
            })
            setOpen(false);
        } catch (err) {
            alert('Erro ao alterar o estado da questão, tente novamente.');
        }
    }


    function selecionarQuestoesProva(data, questao) {        
        if(data.checked) {
            questoesProva.push(questao)
        } else {
            questoesProva = questoesProva.filter((questaoProva) => questaoProva.idQuestao !== data.id)
        }
    }


    async function gerarProva() {
        let day = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");

        const idQuestoes = questoesProva.map((questaoProva) => questaoProva.idQuestao);

        const data = {
            dataProva: day,
            idsQuestoes: idQuestoes
        }

        try {
            const response = await api.put('prova/atualizar/1', data);
            console.log('resp', response);
            alert(`Prova cadastrada com sucesso!`);
        } catch (err) {
            alert(`Erro no cadastro, verifique se selecionou 36 questões e tente novamente.`);
        }
    }

    return (
        <div>
            <HeaderEnade />
            <MenuEnade/> 
            <div className='alignButton'>
                <Button className='buttonGerarProva' onClick={() => gerarProva()} >Gerar Prova</Button> 
                <Button className='buttonCadastrarQuestao' onClick={() => setOpen(true)}>Cadastrar Questão</Button>           
            </div>
            {questoes && questoes.map((questao) => {
                return (
                    <Card.Group className='divCards' key={questao.idQuestao}>
                        <Card className={`${questao.estadoQuestao === true ? 'card' : 'cardAnulado'}`}>
                        <Card.Content>
                            <Icon name='edit' size='large' className='editIcon' type='button' onClick={() => editQuestion(questao)} />
                            <Card.Header className='cardContent'>{`Pergunta: ${questao.descricao}`}</Card.Header>
                            <Card.Meta className={`${questao.estadoQuestao === true ? 'cardContent' : 'cardContentAnulado'}`}>{`${questao.estadoQuestao === true ? 'Validada' : 'Anulada'}`}</Card.Meta>
                            <If condition={questao.tpQuestao === 'Objetivas (formação geral)' || questao.tpQuestao === 'objetivas (componente específico)'}>
                                <Card.Description className='cardContentAlt'>
                                {`A) ${questao.alternativaA}`}<br />
                                {`B) ${questao.alternativaB}`}<br />
                                {`C) ${questao.alternativaC}`}<br />
                                {`D) ${questao.alternativaD}`}<br />
                                {`E) ${questao.alternativaE}`}
                                </Card.Description>
                            </If>
                            <Card.Description className='cardContent'>
                            {`Resposta: ${questao.correta}`}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='cardActions'>
                                <div>
                                <Button negative className='actions1' disabled={questao.estadoQuestao === false} onClick={() => anular(questao)}>
                                    Anular
                                </Button>
                                <Button positive className='actions2' disabled={questao.estadoQuestao === true} onClick={() => validar(questao)}>
                                    Validar
                                </Button>
                                </div>
                                <Checkbox label='Adicionar a prova' className='actions2' id={questao.idQuestao} onChange={(e, data) => selecionarQuestoesProva(data, questao)} />
                            </div>
                        </Card.Content>
                        </Card>
                    </Card.Group>
                )
            })}


            <Modal
                className='modalCadastrarQuestao'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                >
                <Modal.Header>Cadastrar Questão</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <form onSubmit={handleRegister}>
                            <div  className='formQuestao'>
                                <div className='inputsPrincipal'>
                                    <Select placeholder='Selecione o tipo da questão' options={tipoOptions} className='selectCadastro' value={idTpQuestao} onChange={(e, data) => setIdTpQuestao(data.value)}/>
                                    <TextArea placeholder='Pergunta' style={{ minHeight: 100 }} className='inputCadastro' value={descricao} onChange={e => setDescricao(e.target.value)}/>
                                    <If condition={idTpQuestao === 1 || idTpQuestao === 3} >
                                        <TextArea placeholder='Resposta' style={{ minHeight: 80 }} className='inputCadastro' value={correta} onChange={e => setCorreta(e.target.value)}/>
                                    </If>
                                    <If condition={idTpQuestao === 2 || idTpQuestao === 4} >
                                        <Select placeholder='Selecione a alternativa correta' options={tipoOptionsResp} className='selectCadastro' value={correta} onChange={(e, data) => setCorreta(data.value)}/>
                                    </If>
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
                            </div>
                            
                            <div className='buttonsModalQuestao'>
                                <Button className='buttonCancelarModal' onClick={() => setOpen(false) && setEditing(false)} >Cancelar</Button>
                                <Button className='buttonCadastrarModal' type='submit'>Cadastrar</Button>
                            </div>
                        </form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default Professor;