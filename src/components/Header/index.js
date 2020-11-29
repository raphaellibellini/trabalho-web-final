import React from 'react';
import logoBranco from '../../imgs/logoBranco.svg';
import { Icon } from 'semantic-ui-react'
import './styles.css';

function Header() {
    return (
        <div className='divHeader'>
            <img src={logoBranco} alt="Logo do Enade" className='logoBranco'/>
            <Icon name='log out' size='big' />
        </div>
    )
}

export default Header;