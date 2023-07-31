import React from "react";
import Header from "../header/Header";
const Home = () =>{
    return(
        <React.Fragment>
            <Header link={'/Home'}/>
            <main>
                <section className="nomeProjeto">
                    <h1>GERENCIADOR DE HORÁRIOS</h1>
                </section>

            </main>
        </React.Fragment>
    )
}
export default Home