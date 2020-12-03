import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'semantic-ui-react';
import HeaderEnade from '../../components/HeaderEnade';
import MenuEnade from '../../components/MenuEnade';
import api from '../../service/api';
import './styles.css';
import { render } from 'react-dom';
import { Pie, Bar } from 'react-chartjs-2';

function RelacaoAlunos() {
    const [alunosCadastrados, setAlunosCadastrados] = useState([]);
    const [alunosProva, setAlunosProva] = useState([]);
    const [alunosSemProva, setAlunosSemProva] = useState([]);
    const [notas, setNotas] = useState([]);

    const [percentage, setPercentage] = useState(1);
    const [percentageBar, setPercentageBar] = useState(1);
    const [data, setData] = useState([]);
    const [dataNota, setDataNota] = useState([]);


    const buscarNotasAlunos = useCallback(async () => {
        const resp = await api.get('relatorio/resultados-last10')
        const provas =  resp.data
            .map((prova) => {
               return {
                   nomeUsuario: prova.usuarioDto.nomeUsuario,
                   valorObtido: prova.valorObtido
               }
           });
        
        setNotas(provas);
        return provas;
    }, []);


    const buscarAlunosCadastrados = useCallback(async () => {
        const resp = await api.get('relatorio/alunos')
        const alunosCadastrados =  resp.data
            .map((aluno) => {
               return {
                   nomeUsuario: aluno.nomeUsuario,
                   emailUsuario: aluno.emailUsuario
               }
           });
        
        setAlunosCadastrados(alunosCadastrados);
        return alunosCadastrados;
    }, []);


    const buscarAlunosProva = useCallback(async () => {
        const resp = await api.get('relatorio/alunos-com-prova');
        const alunoProva = (resp.data || [])
            .map((aluno) => {
               return {
                   nomeUsuario: aluno.usuarioDto.nomeUsuario,
                   emailUsuario: aluno.usuarioDto.emailUsuario,
                   valorObtido: aluno.valorObtido
               }
           })
        setAlunosProva(alunoProva);
        return alunoProva;
    }, []);

    
    const buscarAlunosSemProva = useCallback(async () => {
        const resp = await api.get('relatorio/alunos-sem-prova')
        const alunoSemProva  = (resp.data || [])
        .map((aluno) => {
            return {
                nomeUsuario: aluno.nomeUsuario,
                emailUsuario: aluno.emailUsuario
            }
        });
        setAlunosSemProva(alunoSemProva);
        return alunoSemProva;
    }, []);

        
    const gerarGrafico = useCallback(async () => {
        setPercentage(80);
        const nextAlunosProva = await buscarAlunosProva();
        const nextAlunosSemProva = await buscarAlunosSemProva(); 
        setData({
            labels: ['Alunos que fizeram a prova', 'Alunos que não fizeram a prova'],
            datasets: [
                {
                    data: [nextAlunosProva.length, nextAlunosSemProva.length],
                    backgroundColor: [ '#0C326F', '#1351B4'  ]
                }
            ]
        })
    }, [buscarAlunosProva, buscarAlunosSemProva]);


    const gerarGraficoBarra = useCallback(async () => {
        setPercentageBar(80);
        const nextProvas = await buscarNotasAlunos();
        const nomeAlunos = nextProvas.map((prova) => prova.nomeUsuario);
        const notaAlunos = nextProvas.map((prova) => prova.valorObtido);
        setDataNota({
            labels: nomeAlunos,
            datasets: [
                {
                    label: 'Notas',
                    data: notaAlunos,
                    backgroundColor: ['#1351B4', '#1351B4', '#1351B4','#1351B4', '#1351B4', '#1351B4', '#1351B4', '#1351B4','#1351B4', '#1351B4']
                }
            ]
        })
    }, [buscarNotasAlunos]);


    useEffect(() => {
        buscarAlunosCadastrados();
        gerarGrafico();
        gerarGraficoBarra();
    }, [gerarGrafico, buscarAlunosCadastrados, gerarGraficoBarra]);


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
            <div className='grafico'>
                <Pie data={data} />
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
                    <Table className='tableAlunosSemProva'>
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
                    </Table>
                </div>
            </div>
            <h1 className='title'>Notas dos últimos alunos que fizeram a prova</h1>
            <div className='grafico'>
                <Bar data={dataNota} />
            </div>
        </div>
    );
}

export default RelacaoAlunos;
