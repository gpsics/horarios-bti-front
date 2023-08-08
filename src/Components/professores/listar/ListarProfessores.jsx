import React from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
const ListarProfessores = () => {
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo">
                    <h1>Listar Professores</h1>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default ListarProfessores
