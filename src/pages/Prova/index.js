import React, { useState, useEffect } from 'react';
import { Button, Card, Checkbox, Modal, Select, TextArea, Input, Icon, Form } from 'semantic-ui-react'
import api from '../../service/api';
import If from '../../components/If';
import './styles.css';

function Prova() {
    const [prova, setProva] = useState({});
    // const [listaRespostasAluno, setListaRespostasAluno] = useState([]);
    const [listaQuestoesProva, setListaQuestoesProva] = useState([]);
    const [questao1, setQuestao1] = useState([]);
    const [questao2, setQuestao2] = useState([]);


    // async function getQuestions() {
    //     await api.get('prova/listar/1').then(response => {
    //         const teste = response.data;
    //         setProva(teste);
    //         console.log('TESTANDO A PROVA', prova);
    //     })
        
    //     // console.log('TESTE PROVA', prova);
    //     const listaQuestoesTemp = prova.listaQuestoes;
    //     const listaNew = listaQuestoesTemp.map((questao) => {
    //         return {
    //             alternativaA: questao.alternativaA,
    //             alternativaB: questao.alternativaB,
    //             alternativaC: questao.alternativaC,
    //             alternativaD: questao.alternativaD,
    //             alternativaE: questao.alternativaE,
    //             descricao: questao.descricao,
    //             estadoQuestao: true,
    //             idTpQuestao: questao.tpQuestao,
    //             respostaAluno: ''
    //         }
    //     })

    //     setListaQuestoesProva(listaNew);    
    // }

    useEffect(() => {
            api.get('prova/listar/1').then(response => {
                setProva(response.data);
                console.log('PROVA USE EFFECT', prova);

                // const listaQuestoesTemp = prova.listaQuestoes;
                // console.log('TESTE1', listaQuestoesTemp);
            })
                // const listaNew = listaQuestoesTemp.map((questao) => {
                //     return {
                //         alternativaA: questao.alternativaA,
                //         alternativaB: questao.alternativaB,
                //         alternativaC: questao.alternativaC,
                //         alternativaD: questao.alternativaD,
                //         alternativaE: questao.alternativaE,
                //         descricao: questao.descricao,
                //         estadoQuestao: true,
                //         idTpQuestao: questao.tpQuestao,
                //         respostaAluno: ''
                //     }
                // })
        
                // setListaQuestoesProva(listaNew);
    


        // getQuestions();
        // api.get('prova/listar/1').then(response => {
        //     setProva(response.data);
        // })
    }, []);


    function handleAnswer(e) {
        e.preventDefault();
        console.log('e', e.target);
        console.log('questao1', questao1);
        console.log('questao2', questao2);
    }

    return (
        <div>
            <h1>Prova</h1>
                {console.log('PROVA RENDER', prova)}
                <form onSubmit={handleAnswer}>
                {prova.listaQuestoes && prova.listaQuestoes.map((questao) => {
                    return (
                        <Card.Group className='divCards' key={questao.idQuestao}>
                            <Card className='card'>
                            <Card.Content>
                                <Card.Header className='cardContent'>{`Pergunta: ${questao.descricao}`}</Card.Header>
                                <If condition={questao.tpQuestao === 'Objetivas (formação geral)' || questao.tpQuestao === 'objetivas (componente específico)questao'}>
                                    <Card.Description className='cardContentAlt'>
                                    <Form.Group>
                                        <Form.Radio label={`A) ${questao.alternativaA}`} checked={questao1 === 'alternativaA'} value='alternativaA' onClick={() => setQuestao1('alternativaA')} name={`alternativaA${questao.idQuestao}`} />
                                        <Form.Radio label={`B) ${questao.alternativaB}`} checked={questao1 === 'alternativaB'} value='alternativaB' onClick={() => setQuestao1('alternativaB')} name={`alternativaB${questao.idQuestao}`}/>
                                        <Form.Radio label={`C) ${questao.alternativaC}`} checked={questao1 === 'alternativaC'} value='alternativaC' onClick={() => setQuestao1('alternativaC')} name={`alternativaC${questao.idQuestao}`}/>
                                        <Form.Radio label={`D) ${questao.alternativaD}`} checked={questao1 === 'alternativaD'} value='alternativaD' onClick={() => setQuestao1('alternativaD')} name={`alternativaD${questao.idQuestao}`}/>
                                        <Form.Radio label={`E) ${questao.alternativaE}`} checked={questao1 === 'alternativaE'} value='alternativaE' onClick={() => setQuestao1('alternativaE')} name={`alternativaE${questao.idQuestao}`}/>
                                    </Form.Group>
                                    </Card.Description>
                                </If>
                                <If condition={questao.tpQuestao === 'Discursivas (formação geral)' || questao.tpQuestao === 'Discursivas (componente específico)'}>
                                    <Card.Description className='cardContent'>
                                        <TextArea placeholder='Resposta' className='resp' value={questao2} onChange={(e) => setQuestao2(e.target.value)}></TextArea>
                                    </Card.Description>
                                </If>
                            </Card.Content>
                            </Card>
                        </Card.Group>
                    )
                })}
                <Button className='buttonFinalizarProva' type='submit' >Finalizar Prova</Button> 
                </form>
        </div>
  );
}

export default Prova;