import React from "react";
import './Home.css'
import Header from "../header/Header";
import Menu from "../menuLateral/Menu";
import Footer from "../footer/Footer";
const Home = () =>{
    return(
        <React.Fragment>
            <Header link={'/Home'}/>
            <main id="Home">
                <div id="filtroHome">
                    <div id="menu"><Menu/></div>
                    <h1>GERENCIADOR DE HORÁRIOS</h1>
                </div>
            </main>
            <Footer/>
        </React.Fragment>
    )
}
export default Home