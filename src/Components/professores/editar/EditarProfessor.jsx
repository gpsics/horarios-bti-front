import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './EditarProfessor.css'
import Sucess from '../../alerts/Sucess'
import Confirm from '../../alerts/Confirm'

const EditarProfessor = ({professor}) => {
    const [newName, setNewName] = useState(professor.nome_prof)
    const [erro, setErro] = useState('')
    const updateProfessor = async (e) => {
        e.preventDefault()
        Confirm.editar().then(async(result) => {
            if(result.isConfirmed){
                setErro('')
                const token = localStorage.getItem('token');
                if (!token) {
                    setErro('Você precisa estar logado para editar professor.');
                    return;
                }
            
                const url = `http://127.0.0.1:8000/professores/${professor.id}/`;
                const requestOptions = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({ nome_prof: newName }),
                };
            
                try {
                    const response = await fetch(url, requestOptions);
                    if (response.ok) {
                        Sucess.editado()
                    } else {
                        const data = await response.json();
                        setErro('Erro ao editar professor:', data.detail);
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };
    
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo edProf">
                    <h1>Editar Professor</h1>
                    <section className="editarProf">
                        <form onSubmit={updateProfessor} className='input-group'>
                            <input type="text" placeholder='Nome do Professor' value={newName} onChange={e => setNewName(e.target.value)} />
                            <button type='submit'>Editar</button>
                        </form>
                        {erro && <div className="erroCad">{erro}</div>}
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default EditarProfessor