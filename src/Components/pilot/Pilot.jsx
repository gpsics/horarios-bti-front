import React, { useEffect } from "react";
import './Pilot.css'
import Header from '../header/Header'
import {FaArrowRight } from "react-icons/fa";
import Img from '../../imgs/UFERSA_PDF.jpg'
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
const Pilot = () =>{
    const {clearToken} = useAuth()
    useEffect(() => {
        clearToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <React.Fragment>
            <Header link={'/'}/>
            <main id="pilot">
                <section className="descricao">
                    <h1>GERENCIADOR DE HORÁRIOS</h1>
                    <p>Este projeto consiste na elaboração de um programa para gerenciar os horários de um semestre das turmas do curso do Bacharelado em Tecnologia da Informação (BTI) do Campus Pau dos Ferros (CMPF) da Universidade Federal Rural do Semi-Árido (UFERSA). </p>

                     <Link to="/Login" className="acessar">ACESSAR  <i><FaArrowRight/></i></Link>
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