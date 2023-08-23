import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './EditarProfessor.css'

const EditarProfessor = ({professor}) => {
    const [prof, setProf] = useState(professor)
    const [newName, setNewName] = useState('')
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')
    const updateProfessor = async (e) => {
        e.preventDefault()
        setErro('')
        setMensagem('')
        const token = localStorage.getItem('token');
        if (!token) {
            setErro('Você precisa estar logado para editar professor.');
            return;
        }
    
        const url = `http://127.0.0.1:8000/professores/${prof.id}/`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ nome_prof: newName }),
        };
    
        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                setMensagem('Professor editado com sucesso.');
                setProf([])
            } else {
                const data = await response.json();
                setErro('Erro ao editar professor:', data.detail);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo edProf">
                    <h1>Editar o Professor {prof.nome_prof}</h1>
                    <section className="editarProf">
                        <form onSubmit={updateProfessor} className='input-group'>
                            <input type="text" placeholder='Nome do Professor' value={newName} onChange={e => setNewName(e.target.value)} />
                            <button type='submit'>Editar</button>
                        </form>
                        {erro && <div className="erroCad">{erro}</div>}
                        {mensagem && <div className="cadSucess">{mensagem}</div>}
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default EditarProfessor
