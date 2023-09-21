import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './EditarProfessor.css'
import Sucess from '../../alerts/Sucess'
import Confirm from '../../alerts/Confirm'
import { useParams } from 'react-router-dom'

// {professor}
const EditarProfessor = () => {
    const { idProf } = useParams()
    const [newName, setNewName] = useState('')
    const [erro, setErro] = useState('')
    const updateProfessor = async (e) => {
        e.preventDefault()
        Confirm.editar().then(async (result) => {
            if (result.isConfirmed) {
                setErro('')
                const token = localStorage.getItem('token');
                if (!token) {
                    setErro('Você precisa estar logado para editar professor.');
                    return;
                }

                const url = `http://127.0.0.1:8000/professores/${idProf}/`;
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


    const fetchProfessors = useCallback(async () => {
        setErro('')
        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/professores/${idProf}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const professorsData = await response.json();
                setNewName(professorsData.nome_prof);
            } else {
                console.log('Erro ao listar professores.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [idProf]);

    useEffect(() => {
        fetchProfessors();
    }, [fetchProfessors]);

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
                            <button type='submit' className='botaoCadastrar'>Editar</button>
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