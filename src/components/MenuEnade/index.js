import React from 'react';
import logoBranco from '../../imgs/logoBranco.svg';
import { Menu, Button, Icon, Dropdown } from 'semantic-ui-react'
import './styles.css';
import HeaderEnade from '../HeaderEnade';

function MenuEnade() {
  return (
      <div>
          <Menu className='menu'>
              <Menu.Item 
                  className='itemMenu'
                  name='questoes'
                  // active={activeItem === 'editorials'}
                  // onClick={this.handleItemClick}
              >
                  Questões
              </Menu.Item>

              <Menu.Item
                  className='itemMenu'
                  name='alunos'
                  // active={activeItem === 'reviews'}
                  // onClick={this.handleItemClick}
              >
                  Alunos
              </Menu.Item>
              <Dropdown item text='Relatórios' className='itemMenu'>
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
              </Dropdown>
              <Menu.Menu position='right' color='#1351B4' >
                  <Menu.Item>
                      <Button className='buttonProva'>Gerar Prova</Button> 
                  </Menu.Item>  
              </Menu.Menu>
          </Menu>
      </div>
  );
}

export default MenuEnade;