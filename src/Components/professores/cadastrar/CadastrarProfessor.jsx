import React, { useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './CadastrarProfessor.css'
import NomeProfessores from '../cadastrar/professores.csv'
import api from '../../../api'

const parseCSV = (text) => {

    return text.split('\n')
}
const CadastrarProfessor = ({ adicionarProf }) => {
    const [user, setUser] = useState();
    const [csv, setCsv] = useState([])

    useEffect(() => {
        fetch(NomeProfessores)
            .then((r) => r.text())
            .then((text) => {
                setCsv(parseCSV(text))
            });
        }, []);

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                await api.post('professores/',{
                    nome: user,
                })
    
            } catch (error) {
                console.error(error);
            }
        };
    const enviarProfs = (csv) => {
        adicionarProf(csv)
    }
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo">
                    <h1>Cadastrar Professor</h1>
                    <form onSubmit={handleSubmit} className='input-group'>
                        <input type="text" placeholder='Nome do Professor' value={user} onChange={e => setUser(e.target.value)}/>
                        <button type='submit'>Cadastrar</button>
                    </form>
                    <button onClick={() => enviarProfs(csv)}>enviar</button>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default CadastrarProfessor
