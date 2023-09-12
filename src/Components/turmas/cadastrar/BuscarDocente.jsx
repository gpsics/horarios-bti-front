import React, { useEffect, useState } from 'react';
import { useDocentes } from './DocentesContext';

const BuscarDocente = () => {
    const [docentes, setDocentes] = useState([]);
    const [docentesBusca, setDocentesBusca] = useState([]);
    const [docenteSelecionado, setDocenteSelecionado] = useState([]);
    const { docentesSelecionados, setDocentesSelecionados } = useDocentes();

    useEffect(() => {
        fetchDocente();
    }, []);

    const fetchDocente = async () => {
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/professores/';
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const docentesData = await response.json();
                setDocentes(docentesData);
                setDocentesBusca(docentesData);
            } else {
                console.log('Erro ao listar docentes.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const buscarDocen = ({ target }) => {
        if (!target.value) {
            setDocentesBusca(docentes);
            return;
        } else {
            const filterDocentes = docentesBusca.filter(({ nome_prof }) =>
                nome_prof.toUpperCase().startsWith(target.value.toUpperCase())
            );
            setDocentesBusca(filterDocentes);
        }
    };

    const docente = (item) => {
        if (!docentesSelecionados.includes(item)) {
            // O docente não está selecionado, então o adicionamos
            setDocenteSelecionado([...docenteSelecionado, item])
            setDocentesSelecionados([...docentesSelecionados, item]);
        }
    };

    return (
        <>
            <section className='buscarDocente'>
                <input type="text" placeholder='Buscar Docente' onChange={buscarDocen} className='buscar' />
                <div className="listDocentes">
                    {docentesBusca.length >= 0 ? (
                        <>
                            <ul>
                                {docentesBusca.map((item, index) => (
                                    <li key={index} onClick={() => docente(item)}>{item.nome_prof}</li>
                                ))}
                            </ul>
                            {docenteSelecionado !== null && docenteSelecionado.length >= 0 ? (
                                <>
                                    <h2>Docentes Selecionados</h2>
                                    <ul>
                                        {docenteSelecionado.map((item, index) => (
                                            <li key={index} onClick={() => docente(item)}>{item.nome_prof}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </section>
        </>
    );
};

export default BuscarDocente;