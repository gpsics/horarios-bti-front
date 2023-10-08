import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { Link } from 'react-router-dom'
import BuscarDocente from './BuscarDocente'

const CadastrarTurma = () => {
  const [codigo, setCodigo] = useState()
  const [numTurma, setNumTurma] = useState()
  const [numVagas, setNumVagas] = useState()
  return (
    <React.Fragment>
      <Header link={'/Home'} />
      <main id='entidades'>
        <div id="menu">
          <Menu/>
        </div>
        <section className="conteudo cadTurma">
          <form >
            <input type="text" name="" className="informacoesTurma" placeholder='Código do Componente' value={codigo} onChange={e => setCodigo(e.target.value)}/>
            <input type="text" name="" className="informacoesTurma" placeholder='Número da turma' value={numTurma} onChange={e => setNumTurma(e.target.value)}/>
            <input type="text" name="" className="informacoesTurma" placeholder='Número de vagas'value={numVagas} onChange={e => setNumVagas(e.target.value)}/>
          </form>
          <BuscarDocente/>
          <div>
            <Link to={`turmas/cadastrarTurma/horarios/${codigo}/${numTurma}/${numTurma}`}>Selecionar Horários</Link>
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default CadastrarTurma
