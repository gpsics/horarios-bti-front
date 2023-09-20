import React, { useState } from 'react';

const Teste = () => {
    const [horarioInformado, setHorarioInformado] = useState('');
    const [tabela, setTabela] = useState({});

    const diasSemana = {
        2: 'segunda',
        3: 'terça',
        4: 'quarta',
        5: 'quinta',
        6: 'sexta',
        7: 'sábado',
    };
    const horarioDia = {
        1: 'Primeiro Horário',
        2: 'Segundo Horário',
        3: 'Terceiro Horário',
        4: 'Quarto Horário',
        5: 'Quinto Horário',
        6: 'Sexto Horário',
    };
    const horariosColuna = {
        M1: '07:00 - 07:55',
        M2: '07:55 - 08:50',
        M3: '08:50 - 09:45',
        M4: '09:55 - 10:50',
        M5: '10:50 - 11:45',
        M6: '11:45 - 12:40',
        T1: '13:00 - 13:55',
        T2: '13:55 - 14:50',
        T3: '14:50 - 15:45',
        T4: '15:55 - 16:50',
        T5: '16:50 - 17:45',
        T6: '17:45 - 18:40',
        N1: '18:50 - 19:45',
        N2: '19:45 - 20:40',
        N3: '20:40 - 21:35',
        N4: '21:35 - 22:30',
    };

    const lerHorario = (event) => {
        event.preventDefault();
        const regex = /^(\d+)([MTN])(\d+)$/;

        const match = horarioInformado.match(regex);

        if (match) {
            const diaSemana = match[1].split('').map((dia) => parseInt(dia));
            const turno = match[2];
            const horario = match[3].split('').map((hora) => parseInt(hora));

            const novaTabela = { ...tabela };

            diaSemana.forEach((dia) => {
                if (!novaTabela[dia]) {
                    novaTabela[dia] = {};
                }
                novaTabela[dia][turno] = horario;
            });

            setTabela(novaTabela);
        } else {
            console.log('A string não corresponde ao padrão esperado.');
        }
    };

    const renderTabela = () => {
    const diasDaSemana = Object.values(diasSemana);
    const turnos = ['M', 'T', 'N'];

    return (
        <table>
            <thead>
                <tr>
                    <th>Horários</th>
                    {diasDaSemana.map((dia, index) => (
                        <th key={index}>{dia}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(horariosColuna).map((horario, index) => (
                    <tr key={index}>
                        <td>{horariosColuna[horario]}</td>
                        {diasDaSemana.map((dia, diaIndex) => (
                            <td key={diaIndex}>
                                {turnos.map((turno, turnoIndex) => {
                                    const valorCelula =
                                        tabela[diaIndex + 2] &&
                                        tabela[diaIndex + 2][turno] &&
                                        tabela[diaIndex + 2][turno].includes(index + 1)
                                            ? 'X'
                                            : '';
                                    return <div key={turnoIndex}>{valorCelula}</div>;
                                })}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
 
    

    return (
        <React.Fragment>
            <h2>Informe o horário</h2>
            <input
                type="text"
                placeholder="Horário"
                value={horarioInformado}
                onChange={(e) => setHorarioInformado(e.target.value)}
                className="input"
            />
            <button onClick={lerHorario}>Cadastrar</button>
            {renderTabela()}
        </React.Fragment>
    );
};

export default Teste;
