import React, { useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './CadastrarProfessor.css'
import NomeProfessores from '../cadastrar/professores.csv'

const parseCSV = (text) => {

    return text.split('\n')
}
const CadastrarProfessor = ({ adicionarProf }) => {
    const [user, setUser] = useState();
    const [csv, setCsv] = useState([])
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        fetch(NomeProfessores)
            .then((r) => r.text())
            .then((text) => {
                setCsv(parseCSV(text))
            });
        }, []);

        const handleSubmit = async (event) => {
            event.preventDefault();
            const token = localStorage.getItem('token')

            const url = 'http://127.0.01:8000/professores/'
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({nome_prof: user}),
            };
            try{
                const response = await fetch(url, requestOptions);
                if(response.ok){
                    setMensagem('Professor Cadastrado com sucesso!')
                }else{
                    const data = await response.json()
                    setErro('Erro ao cadastrar professor: ' + data.detail)
                }
            }catch(error){
                console.error(error)
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
                    {erro && <div className="erroCad">{erro}</div>}
                    {mensagem && <div className="cadSucess">{mensagem}</div>}
                    <button onClick={() => enviarProfs(csv)}>enviar</button>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default CadastrarProfessor
