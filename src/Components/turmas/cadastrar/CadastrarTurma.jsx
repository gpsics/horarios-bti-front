import React from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
const CadastrarTurma = () => {
  return (
    <React.Fragment>
        <Header link={'/Home'}/>
        <menu id='entidades'>
            <div className="menu"><Menu/></div>
            <section className='conteudo cadTur'>
                <h3>Cadastrar Turma</h3>
            </section>
        </menu>
        <Footer/>      
    </React.Fragment>
  )
}

export default CadastrarTurma
