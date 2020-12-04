import React from 'react';
import logoBranco from '../../imgs/logoBranco.svg';
import { Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import './styles.css';

function HeaderEnade() {
    const history = useHistory();

    function handlelogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className='divHeader'>
            <img src={logoBranco} alt="Logo do Enade" className='logoBranco'/>
            <Icon name='log out' size='big' type='button' onClick={handlelogout}/>
        </div>
    )
}

export default HeaderEnade;