import React, { useEffect, useState } from 'react';
import { useDocentes } from './DocentesContext';
import { FaTrash } from 'react-icons/fa';

const BuscarDocente = () => {
  const [docentes, setDocentes] = useState([]);
  const [docentesBusca, setDocentesBusca] = useState([]);
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
      } else {
        console.log('Erro ao listar docentes.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

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
    <>
      <section className='buscarDocente'>
        <input type="text" placeholder='Buscar Docente' onChange={buscarDocen} className='buscar' />
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
    </>
  );
};

export default BuscarDocente;
