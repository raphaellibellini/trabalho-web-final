import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import MenuEnade from '../../components/MenuEnade';
import { Button, Card, Checkbox } from 'semantic-ui-react'
import api from '../../service/api';
import If from '../../components/If';
import './styles.css';

function Professor() {
    const [questoes, setQuestoes] = useState([]);

    useEffect(() => {
        api.get('questao/listar').then(response => {
            setQuestoes(response.data);
        })
    }, []);

    return (
        <div>
            <Header />
            <MenuEnade/>            
            {console.log('quest', questoes)}
            {questoes && questoes.map((questao) => {
                return (
                    <Card.Group className='divCards'>
                        <Card className='card'>
                        <Card.Content>
                            <Card.Header className='cardContent'>{`Pergunta: ${questao.descricao}`}</Card.Header>
                            {/* <Card.Meta>{`${questao.estadoQuestao === true ? 'Ativa' : 'Anulada'}`}</Card.Meta> */}
                            <Card.Meta className='cardContent'>{`Ativa`}</Card.Meta>
                            <If condition={questao.tpQuestao === 'Objetivas (formação geral)' || questao.tpQuestao === 'objetivas (componente específico)questao.'}>
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
                            {/* Resposta: Essa é a resposta corrétissima */}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='cardActions'>
                                <Button negative className='actions' >
                                    Anular
                                </Button>
                                <Checkbox label='Adicionar a prova' className='actions'/>
                            </div>
                        </Card.Content>
                        </Card>
                    </Card.Group>
                )
            })}
        </div>
    );
}

export default Professor;