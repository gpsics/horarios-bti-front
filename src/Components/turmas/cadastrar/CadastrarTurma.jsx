import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import BuscarDocente from './BuscarDocente'
import Confirm from '../../alerts/Confirm'
import Sucess from '../../alerts/Sucess'
import { useDocentes } from './DocentesContext'
import TabelaHorarios from './TabelaHorarios'
import './CadastrarTurma.css'
const CadastrarTurma = () => {
  const [codigoComp, setCodigoComp] = useState()
  const [numTurma, setNumTurma] = useState()
  const [vagas, setVagas] = useState()
  const { docentesSelecionados } = useDocentes();
  const [erro, setErro] = useState('')


  const handleSubmit = async (event) => {
    event.preventDefault();
    Confirm.cadastrar().then(async (result) => {
      if (result.isConfirmed) {
        setErro('')

        const token = localStorage.getItem('token');
        if (!token) {
          setErro('Você precisa estar logado para cadastrar uma turma.');
          return;
        }
        const url = 'http://127.0.0.1:8000/turmas/'
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            cod_componente: codigoComp,
            numm_turma: numTurma,
            num_vagas: vagas,
            professor: docentesSelecionados,

          }),
        };
        try {
          const response = await fetch(url, requestOptions);
          if (response.ok) {
            setCodigoComp()
            setNumTurma()
            setVagas()

            Sucess.cadastro()
          } else {
            setErro('Erro ao cadastrar Componente.')
          }
        } catch (error) {
          console.error(error)
        }

      }
    })

  };
  return (

    <React.Fragment>
      <Header link={'/Home'} />
      <main id='entidades'>
        <div className="menu"><Menu /></div>
        <section className='conteudo cadasrarTurma'>
          <h1>Cadastrar Turma</h1>
          <section className='formCadTurma'>
            <div className="dadosTurma">
              <input type="text" placeholder='Código do Componente' value={codigoComp} onChange={e => setCodigoComp(e.target.value)} className='input' />
              <input type="text" placeholder='Número da Turma' value={numTurma} onChange={e => setNumTurma(e.target.value)} className='input' />
              <input type="text" placeholder='Número de Vagas' value={vagas} onChange={e => setVagas(e.target.value)} className='input' />
            </div>
            <div className="buscarDocente">
              <BuscarDocente />
            </div>
            
            <div className="tabelaHorarios">
              <TabelaHorarios/>
            </div>
            <div className="botaoCad">
              <div>
                {erro && <div className="erroCad">{erro}</div>}
              </div>
              <button onClick={() => handleSubmit} className='botaoCadastrar'>Cadastrar</button>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default CadastrarTurma
