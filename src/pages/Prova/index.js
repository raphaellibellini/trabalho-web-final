import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Checkbox, Modal, Select, TextArea, Input, Icon, Form } from 'semantic-ui-react'
import api from '../../service/api';
import If from '../../components/If';
import { RESPOSTAS } from './enums';
import { useHistory } from 'react-router-dom';
import './styles.css';
import HeaderEnade from '../../components/HeaderEnade';

function Prova() {
    const [prova, setProva] = useState({});
    const [listaQuestoesProva, setListaQuestoesProva] = useState([]);
    const [open, setOpen] = useState(false);
    const [resultado, setResultado] = useState('');

    const history = useHistory();

    const buscarQuestoes = useCallback(async () => {
        const { data: nextProva } = await api.get('prova/listar/1')
        setProva(nextProva);

        setListaQuestoesProva( 
             nextProva.listaQuestoes
             .map((questao) => {
                return {
                    idQuestao: questao.idQuestao,
                    resposta: ''
                }
            })
        );
    }, []);

    function goToAluno() {
        setOpen(false);
        history.push('/aluno');
    }

    const finalizarProva = useCallback(async (provaAtual, questoes)=> {
        const provaFinalizada = {            
            idProva: 1,
            idUsuario: 2,
            questoes
        };
        console.log({
            provaFinalizada
        });
        try{
            const response = await api.post('/resultado/cadastrar', provaFinalizada);
            console.log('resultado', response.data.valorObtido);
            setResultado(response.data.valorObtido);
            setOpen(true);
        }catch (e) {
            console.error({e});
        }
    }, []);

    useEffect(() => {
        buscarQuestoes();
    }, [buscarQuestoes]);


    const onClickResponse = useCallback((idQuestao, resposta) => {
        setListaQuestoesProva(questoes => questoes.map((questao) => {
            if(questao.idQuestao !== idQuestao ){
                return questao;
            }
            return {...questao, resposta }
        }));
    }, []);

    const isChecked = useCallback((idQuestao, resposta) => {
        const questao = listaQuestoesProva.find(q => q.idQuestao ===idQuestao);
        if(!questao){
            return false
        }
        return questao.resposta === resposta;
    }, [listaQuestoesProva]);

    return (
        <div>
            <HeaderEnade />
            <h1 className='titleProva'>Prova</h1>
                <form 
                    onSubmit={(e)=>{
                        e.preventDefault();
                        finalizarProva(prova, listaQuestoesProva);
                    }}>
                {prova.listaQuestoes && prova.listaQuestoes.map((questao, index) => {
                    return (
                        <Card.Group className='divCards' key={index}>
                            <Card className='card'>
                            <Card.Content>
                                <Card.Header className='cardContent'>{`Pergunta: ${questao.descricao}`}</Card.Header>
                                <If condition={questao.tpQuestao === 'Objetivas (formação geral)' || questao.tpQuestao === 'objetivas (componente específico)'}>
                                    <Card.Description className='cardContentAlt'>
                                    <Form.Group>
                                        <Form.Radio label={`A) ${questao.alternativaA}`} checked={isChecked(questao.idQuestao, RESPOSTAS.ALTERNATIVA_A)} value={RESPOSTAS.ALTERNATIVA_A} onClick={() => onClickResponse(questao.idQuestao, RESPOSTAS.ALTERNATIVA_A)} id={`${questao.idQuestao}${RESPOSTAS.ALTERNATIVA_A}`}/>
                                        <Form.Radio label={`B) ${questao.alternativaB}`} checked={isChecked(questao.idQuestao, RESPOSTAS.ALTERNATIVA_B)} value={RESPOSTAS.ALTERNATIVA_B} onClick={() => onClickResponse(questao.idQuestao, RESPOSTAS.ALTERNATIVA_B)} id={`${questao.idQuestao}${RESPOSTAS.ALTERNATIVA_B}`}/>
                                        <Form.Radio label={`C) ${questao.alternativaC}`} checked={isChecked(questao.idQuestao, RESPOSTAS.ALTERNATIVA_C)} value={RESPOSTAS.ALTERNATIVA_C} onClick={() => onClickResponse(questao.idQuestao, RESPOSTAS.ALTERNATIVA_C)} id={`${questao.idQuestao}${RESPOSTAS.ALTERNATIVA_C}`}/>
                                        <Form.Radio label={`D) ${questao.alternativaD}`} checked={isChecked(questao.idQuestao, RESPOSTAS.ALTERNATIVA_D)} value={RESPOSTAS.ALTERNATIVA_D} onClick={() => onClickResponse(questao.idQuestao, RESPOSTAS.ALTERNATIVA_D)} id={`${questao.idQuestao}${RESPOSTAS.ALTERNATIVA_D}`}/>
                                        <Form.Radio label={`E) ${questao.alternativaE}`} checked={isChecked(questao.idQuestao, RESPOSTAS.ALTERNATIVA_E)} value={RESPOSTAS.ALTERNATIVA_E} onClick={() => onClickResponse(questao.idQuestao, RESPOSTAS.ALTERNATIVA_E)} id={`${questao.idQuestao}${RESPOSTAS.ALTERNATIVA_E}`}/>
                                    </Form.Group>
                                    </Card.Description>
                                </If>
                                <If condition={questao.tpQuestao === 'Discursivas (formação geral)' || questao.tpQuestao === 'Discursivas (componente específico)'}>
                                    <Card.Description className='cardContent'>
                                        <TextArea 
                                            placeholder='Resposta' 
                                            className='resp' 
                                            value={questao.resposta} 
                                            onChange={(e) => onClickResponse(questao.idQuestao, e.target.value)} 
                                            id={questao.idQuestao} 
                                        />
                                    </Card.Description>
                                </If>
                            </Card.Content>
                            </Card>
                        </Card.Group>
                    )
                })}
                <Button className='buttonFinalizarProva' type='submit' >Finalizar Prova</Button> 
            </form>


            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                closeOnDimmerClick={false}
                >
                <Modal.Header>Resultado da prova</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <p>{`Sua nota foi ${resultado}`}</p>
                        <Button className='buttonOk' onClick={() => goToAluno()}>OK</Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default Prova;