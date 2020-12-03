import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'semantic-ui-react';
import HeaderEnade from '../../components/HeaderEnade';
import MenuEnade from '../../components/MenuEnade';
import api from '../../service/api';
import './styles.css';
import { render } from 'react-dom';
import { Pie } from 'react-chartjs-2';

function RelacaoAlunos() {
    const [alunosCadastrados, setAlunosCadastrados] = useState([]);
    const [alunosProva, setAlunosProva] = useState([]);
    const [alunosSemProva, setAlunosSemProva] = useState([]);
    const [percentage, setPercentage] = useState(1);
    const [data, setData] = useState([])

    useEffect(() => {
        buscarAlunosCadastrados();
        buscarAlunosProva();
        // buscarAlunosSemProva();
        gerarGrafico();
    }, [data, percentage]);


    function gerarGrafico() {
        setPercentage(80);

        setData({
            labels: ['Alunos que fizeram a prova', 'Alunos que não fizeram a prova'],
            datasets: [{
                data: [alunosProva.length, alunosSemProva.length],
                backgroundColor: [
                '#0C326F',
                '#1351B4'
                ]
            }]
        })
    }

    const buscarAlunosCadastrados = useCallback(async () => {
        const resp = await api.get('relatorio/alunos')
        console.log('response', resp);
        
        setAlunosCadastrados( 
            resp.data
            .map((aluno) => {
               return {
                   nomeUsuario: aluno.nomeUsuario,
                   emailUsuario: aluno.emailUsuario
               }
           })
       );
    }, []);


    const buscarAlunosProva = useCallback(async () => {
        const resp = await api.get('relatorio/alunos-com-prova')
        console.log('response', resp);
        
        setAlunosProva( 
            resp.data
            .map((aluno) => {
               return {
                   nomeUsuario: aluno.usuarioDto.nomeUsuario,
                   emailUsuario: aluno.usuarioDto.emailUsuario,
                   valorObtido: aluno.valorObtido
               }
           })
       );
    }, []);


    // const buscarAlunosSemProva = useCallback(async () => {
    //     const resp = await api.get('relatorio/alunos-sem-prova')
    //     console.log('response', resp);
        
    //     setAlunosSemProva( 
    //         resp.data
    //         .map((aluno) => {
    //            return {
    //                nomeUsuario: aluno.usuarioDto.nomeUsuario,
    //                emailUsuario: aluno.usuarioDto.emailUsuario
    //            }
    //        })
    //    );
    // }, []);
    


    return (
        <div>
            {console.log('alunosCad', alunosCadastrados)}
            <HeaderEnade />
            <MenuEnade />
            <h1 className='title'>Alunos cadastrados</h1>
            <Table className='tableCadastrados'>
                <Table.Body>
                    <Table.Row className='tableHeader'>
                        <Table.Cell>Nome</Table.Cell>
                        <Table.Cell>Email</Table.Cell>
                    </Table.Row>
                {alunosCadastrados && alunosCadastrados.map((alunoCadastrado) => (
                    <Table.Row>
                        <Table.Cell>{`${alunoCadastrado.nomeUsuario}`}</Table.Cell>
                        <Table.Cell>{`${alunoCadastrado.emailUsuario}`}</Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
            <h1 className='title'>Alunos que fizeram a prova x alunos que não fizeram a prova</h1>


                <div>
                    <Pie data={data}>
                    </Pie>
                </div>


            <div className='divSubtitle'>
                <div>
                    <h2>Alunos que fizeram a prova</h2>
                    <Table className='tableAlunosProva'>
                        <Table.Body>
                            <Table.Row className='tableHeader'>
                                <Table.Cell>Nome</Table.Cell>
                                <Table.Cell>Email</Table.Cell>
                                <Table.Cell width={1}>Nota</Table.Cell>
                            </Table.Row>
                        {alunosProva && alunosProva.map((alunoProva) => (
                            <Table.Row>
                                <Table.Cell>{`${alunoProva.nomeUsuario}`}</Table.Cell>
                                <Table.Cell>{`${alunoProva.emailUsuario}`}</Table.Cell>
                                <Table.Cell width={1}>{`${alunoProva.valorObtido}`}</Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </div>
                <div>
                    <h2 className='subtitle2'>Alunos que não fizeram a prova</h2>
                    {/* <Table className='tableAlunosSemProva'>
                        <Table.Body>
                            <Table.Row className='tableHeader'>
                                <Table.Cell>Nome</Table.Cell>
                                <Table.Cell>Email</Table.Cell>
                            </Table.Row>
                        {alunosSemProva && alunosSemProva.map((alunoSemProva) => (
                            <Table.Row>
                                <Table.Cell>{`${alunoSemProva.nomeUsuario}`}</Table.Cell>
                                <Table.Cell>{`${alunoSemProva.emailUsuario}`}</Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table> */}
                </div>
            </div>
            <h1 className='title'>Notas dos últimos alunos que fizeram a prova</h1>
        </div>
    );
}

export default RelacaoAlunos;
