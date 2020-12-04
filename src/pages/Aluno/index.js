import React, { useState } from 'react';
import HeaderEnade from '../../components/HeaderEnade';
import { Button, Modal } from 'semantic-ui-react';
import ilustracaoAluno from '../../imgs/ilustracaoAluno.svg';
import { useHistory } from 'react-router-dom';
import api from '../../service/api';
import './styles.css';

function Aluno() {
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const id = localStorage.getItem('id');

  async function handleProva(e) {
      e.preventDefault();
      try {
          const resp = await api.post(`resultado/validar-aluno/${id}`);
          console.log('ALUNO PODE', resp);
          history.push('/prova');
      } catch(err) {
          setOpen(true);
      }
  }

  function goToAluno() {
    setOpen(false);
    history.push('/aluno');
  }

  return (
    <div>
        <HeaderEnade />
        <div className='div'>
            <div className='divAluno'>
                <h1 className='titleAluno'>Prepare o seu ambiente e<br />boa prova!</h1>
                <p>O simulado terá duração total de <strong>três horas</strong>.</p>
                <ul>As  <strong>36 questões</strong> que  compõem  o  Simulado  ENADE<br />estão organizadas da seguinte forma:
                    <li>02 (duas) questões Discursivas (formação geral);</li>
                    <li>04(oito) questões objetivas (formação geral);</li>
                    <li>03 (três) questões Discursivas (componente específico);</li>
                    <li>27 (vinte e sete) questões objetivas (componente específico).</li>
                </ul>
                <p>A  questão  discursiva  deverá  ser  respondida  em,  no  máximo,  <strong>15 linhas</strong>.<br />Qualquer texto que ultrapasse o espaço destinado à resposta<br />será desconsiderado.</p>
                <form onSubmit={handleProva}>
                <Button className='buttonFazerProva' type='submit'>Fazer a prova</Button>
                </form>
            </div>
            <img src={ilustracaoAluno} alt="Aluno concentrado, sentado junto a um laptop numa mesa" className='ilustracaoAluno' />
        </div>

        <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                closeOnDimmerClick={false}
                >
                <Modal.Header>Atenção</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Você já realizou sua prova, não é permitido realizar a prova novamente</p>
                        <Button className='buttonOk' onClick={() => goToAluno()}>OK</Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
    </div>
  );
}

export default Aluno;