import React from 'react';
import HeaderEnade from '../../components/HeaderEnade';
import { Button } from 'semantic-ui-react';
import ilustracaoAluno from '../../imgs/ilustracaoAluno.svg';
import { useHistory } from 'react-router-dom';
import './styles.css';

function Aluno() {
  const history = useHistory();

  function fazerProva() {
    history.push('/prova');
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
                <Button className='buttonFazerProva' onClick={() => fazerProva()}>Fazer a prova</Button>
            </div>
            <img src={ilustracaoAluno} alt="Aluno concentrado, sentado junto a um laptop numa mesa" className='ilustracaoAluno' />
        </div>
    </div>
  );
}

export default Aluno;