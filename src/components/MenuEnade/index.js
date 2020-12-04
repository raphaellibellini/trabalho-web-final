import React from 'react';
import { Menu } from 'semantic-ui-react'
import './styles.css';
import { useHistory } from 'react-router-dom';

function MenuEnade() {
    const history = useHistory();

    function goToQuestions() {
        history.push('/professor')
    }

    function goToReportsAndGraphs() {
        history.push('/relacaoalunos');
    }

    return (
        <div>
            <Menu className='menu'>
                <Menu.Item 
                    className='itemMenu'
                    name='questoes'
                    // active={activeItem === 'editorials'}
                    onClick={() => goToQuestions()}
                >
                    Questões
                </Menu.Item>

                <Menu.Item
                    className='itemMenu'
                    name='alunos'
                    // active={activeItem === 'reviews'}
                    onClick={() => goToReportsAndGraphs()}
                >
                    Relátorios e Gráficos
                </Menu.Item>
                {/* <Dropdown item text='Relatórios' className='itemMenu'>
                    <Dropdown.Menu className='itemSubMenu'>
                        <Dropdown.Item className='lastItem'>
                            <Dropdown item text='Alunos que fizeram a prova x Alunos que não fizeram'>
                                <Dropdown.Menu className='itemSubMenu'>
                                    <Dropdown.Item>Visualizar</Dropdown.Item>
                                    <Dropdown.Item>Exportar PDF</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Dropdown.Item>

                        <Dropdown.Item className='lastItem'>
                            <Dropdown item text='Últimos 10 alunos que fizeram a prova'>
                                <Dropdown.Menu className='itemSubMenu'>
                                    <Dropdown.Item>Visualizar</Dropdown.Item>
                                    <Dropdown.Item>Exportar PDF</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
            </Menu>
        </div>
    );
}

export default MenuEnade;