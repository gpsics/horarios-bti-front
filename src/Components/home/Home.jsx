import React from "react";
import './Home.css'
import Header from "../header/Header";
import Menu from "../menuLateral/Menu";
import Footer from "../footer/Footer";

const Home = () => {
    return (
        <React.Fragment>
            <Header titulo = {'Seja Bem-Vindo!'} link={'/Home'} />

            <main id="entidades" className="imgFundo">
                <div id="menu" ><Menu /></div>
                <div className="conteudo home">
                    <h1>GERENCIADOR DE HORÁRIOS</h1>
                </div>
            </main>

            <Footer />
        </React.Fragment>
    )
}
export default Home