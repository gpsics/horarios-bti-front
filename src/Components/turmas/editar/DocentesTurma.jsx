import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../provider/authProvider';
import axios from 'axios';
import { useDocentes } from '../cadastrar/DocentesContext';
import { FaTrash } from 'react-icons/fa';

const DocentesTurma = ({profs}) => {
    const [docentes, setDocentes] = useState([]);
    const [docentesBusca, setDocentesBusca] = useState([]);
    const { docentesSelecionados, setDocentesSelecionados } = useDocentes();
    const { token } = useAuth()

    useEffect(() => {
        setDocentesSelecionados(profs)
    }, [profs, setDocentesSelecionados]);
    const fetchDocente = useCallback(async () => {
        const url = 'http://3.221.150.138:8000/api/professores/';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const docentesData = response.data;
                setDocentes(docentesData);
            } else {
                console.log('Erro ao listar docentes.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [token]);

    useEffect(() => {
        fetchDocente();
    }, [fetchDocente]);

    const buscarDocen = ({ target }) => {
        if (!target.value) {
            setDocentesBusca([]);
        } else {
            const filterDocentes = docentes.filter(({ nome_prof }) =>
                nome_prof.toUpperCase().startsWith(target.value.toUpperCase())
            );
            setDocentesBusca(filterDocentes);
        };
    };

    const docente = (item) => {
        if (!docentesSelecionados.includes(item)) {
            // Adiciona o professor selecionado ao contexto
            setDocentesSelecionados([...docentesSelecionados, item]);
        }
    };

    const removerDocente = (index) => {
        const novosDocentes = [...docentesSelecionados];
        novosDocentes.splice(index, 1);
        setDocentesSelecionados(novosDocentes);
    };

    return (
        <section className='buscarDocente'>
            <input type="search" placeholder='Buscar Docente' onChange={buscarDocen} className='buscar' />
            <div>
                {docentesBusca.length > 0 ? (
                    <ul className="listDocentes">
                        {docentesBusca.map((item, index) => (
                            <li key={index} onClick={() => docente(item)}>{item.nome_prof}</li>
                        ))}
                    </ul>
                ) : (
                    <></>
                )}
            </div>
            <h2>Docentes Selecionados</h2>
            <div>
                {docentesSelecionados.length > 0 ? (
                    <ul className="docentesSelecionados">
                        {docentesSelecionados.map((item, index) => (
                            <li key={index}>
                                {item.nome_prof}
                                <i onClick={() => removerDocente(index)}><FaTrash /></i>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <> </>
                )}
            </div>
        </section>
    )
}

export default DocentesTurma
