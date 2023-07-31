import React from "react";
import './Pilot.css'
import Header from '../header/Header'
import {FaArrowRight } from "react-icons/fa";
import Img from '../../imgs/UFERSA_PDF.jpg'
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
const Pilot = () =>{
    return(
        <React.Fragment>
            <Header link={'/'}/>
            <main id="pilot">
                <section className="descricao">
                    <h1>GERENCIADOR DE HORÁRIOS</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex voluptatibus unde eos natus, corrupti debitis. Id provident quia officiis, quos rem asperiores! Optio dolorum totam temporibus repudiandae, excepturi est tempora! Lorem ipsum dolor sit, amet consectetur adipisicing elit.!</p>

                    <button> <Link to="/Login" className="acessar">ACESSAR</Link> <i><FaArrowRight/></i></button>
                </section>
                <section className="imgUf">
                    <img src={Img} alt="imagem aerea da UFERSA Pau dos Ferros" />
                </section>
            </main>
            <Footer/>
        </React.Fragment>
    )
}
export default Pilot