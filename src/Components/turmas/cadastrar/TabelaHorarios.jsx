import React, { useEffect, useState } from 'react'

const TabelaHorarios = () => {
    const [turmas, setTurmas] = useState()
    useEffect(() => {
        fetchTurmas();
    }, []);

    const fetchTurmas = async () => {
       
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/turmas/';
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const turmasData = await response.json();
                setTurmas(turmasData);
            } else {
                console.log('Erro ao listar turmas.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
  return (
    <>
      <h2>Tabela de Horários</h2>
      <table>
        <thead>
            <tr>
                <th className='column01' id='pontaEsquerda'>HORÁRIOS</th>
                <th>SEG</th>
                <th>TER</th>
                <th>QUA</th>
                <th>QUI</th>
                <th id='pontaDireita'>SEX</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='column01'>07:00 - 07:55</td>
            </tr>
            <tr>
                <td className='column01'>07:55 - 08:50</td>
            </tr>
            <tr>
                <td className='column01'>08:50 - 09:45</td>
            </tr>
            <tr>
                <td className='column01'>09:55 - 10:50</td>
            </tr>
            <tr>
                <td className='column01'>10:50 - 11:45</td>
            </tr>
            <tr>
                <td className='column01'>11:45 - 12:40</td>
            </tr>

            <br />

            <tr>
                <td className='column01'>13:00 - 13:55</td>
            </tr>
            <tr>
                <td className='column01'>13:55 - 14:50</td>
            </tr>
            <tr>
                <td className='column01'>14:50 - 15:45</td>
            </tr>
            <tr>
                <td className='column01'>15:45 - 16:50</td>
            </tr>
            <tr>
                <td className='column01'>16:50 - 17:45</td>
            </tr>
            <tr>
                <td className='column01'>17:45 - 18:40</td>
            </tr>

            <br />

            <tr>
                <td className='column01'>18:50 - 19:45</td>
            </tr>
            <tr>
                <td className='column01'>19:45 - 20:40</td>
            </tr>
            <tr>
                <td className='column01'>20:40 - 21:35</td>
            </tr>
            <tr id='ultimaLinha'>
                <td className='column01'>21:35 - 22:30</td>
            </tr>
        </tbody>
      </table>
    </>
  )
}

export default TabelaHorarios
