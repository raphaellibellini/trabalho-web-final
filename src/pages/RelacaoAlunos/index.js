import React, { useState, useEffect, useCallback } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import HeaderEnade from '../../components/HeaderEnade';
import MenuEnade from '../../components/MenuEnade';
import api from '../../service/api';
import './styles.css';
import { Pie, Bar } from 'react-chartjs-2';
import jsPDF from "jspdf";
import "jspdf-autotable";

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


    function gerarPDFAlunosCadastrados() {
        const doc = new jsPDF();
        const usersCol = ["Nome", "Email"];
        const usersRows = alunosCadastrados.map(aluno => {
            const row = [aluno.nomeUsuario, aluno.emailUsuario];
            return row;
        });
        
        const startY = 50;


        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);
        doc.text("Alunos cadastrados", 35, 25);


        doc.autoTable(usersCol, usersRows, {
            startY,
            styles: {
            fontSize: 11
            }
        });

        doc.save("relatorioAlunosCadastrados.pdf");
    }


    function gerarPDFAlunosProva() {
        const doc = new jsPDF();
        const usersCol = ["Nome", "Email", "Nota"];
        const usersRows = alunosProva.map(aluno => {
            const row = [aluno.nomeUsuario, aluno.emailUsuario, aluno.valorObtido];
            return row;
        });
        
        const startY = 50;


        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);
        doc.text("Alunos que fizeram a prova", 35, 25);


        doc.autoTable(usersCol, usersRows, {
            startY,
            styles: {
            fontSize: 11
            }
        });

        doc.save("relatorioAlunosProva.pdf");
    }


    function gerarPDFAlunosSemProva() {
        const doc = new jsPDF();
        const usersCol = ["Nome", "Email"];
        const usersRows = alunosSemProva.map(aluno => {
            const row = [aluno.nomeUsuario, aluno.emailUsuario, aluno.valorObtido];
            return row;
        });
        
        const startY = 50;


        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);
        doc.text("Alunos que não fizeram a prova", 35, 25);


        doc.autoTable(usersCol, usersRows, {
            startY,
            styles: {
            fontSize: 11
            }
        });

        doc.save("relatorioAlunosSemProva.pdf");
    }


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
            <div className='alignIcon'>
                <h1 className='title'>Alunos cadastrados</h1>
                <Icon name='file pdf' size='large' className='iconPDF' onClick={() => gerarPDFAlunosCadastrados()} />Exportar PDF
            </div>
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
                    <div className='alignIcon'>
                        <h2 className='titleSemProva'>Alunos que fizeram a prova</h2>
                        <Icon name='file pdf' size='large' className='iconPDF' onClick={() => gerarPDFAlunosProva()} />Exportar PDF
                    </div>
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
                <div className='tableSemProva'>
                    <div className='alignIcon'>
                        <h2 className='titleSemProva'>Alunos que não fizeram a prova</h2>
                        <Icon name='file pdf' size='large' className='iconPDF' onClick={() => gerarPDFAlunosSemProva()} />Exportar PDF
                    </div>
                    <Table>
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
