import React, { useState } from 'react';

const horariosColuna = [
    { Horario: '07:00 - 07:55' },
    { Horario: '07:55 - 08:50' },
    { Horario: '08:50 - 09:45' },
    { Horario: '09:55 - 10:50' },
    { Horario: '10:50 - 11:45' },
    { Horario: '11:45 - 12:40' },
    { Horario: '13:00 - 13:55' },
    { Horario: '13:55 - 14:50' },
    { Horario: '14:50 - 15:45' },
    { Horario: '15:55 - 16:50' },
    { Horario: '16:50 - 17:45' },
    { Horario: '17:45 - 18:40' },
    { Horario: '18:50 - 19:45' },
    { Horario: '19:45 - 20:40' },
    { Horario: '20:40 - 21:35' },
    { Horario: '21:35 - 22:30' },

]
console.log(horariosColuna)
const arrayTable = [];
for (let diaSemana = 2; diaSemana < 7; diaSemana++) {
    for (let horaDia = 1; horaDia <= 6; horaDia++) {
        arrayTable.push({
            dia: diaSemana,
            turno: 'M',
            hora: horaDia,
        });
    }
    for (let horaDia = 1; horaDia <= 6; horaDia++) {
        arrayTable.push({
            dia: diaSemana,
            turno: 'T',
            hora: horaDia,
        });
    }
    for (let horaDia = 1; horaDia <= 4; horaDia++) {
        arrayTable.push({
            dia: diaSemana,
            turno: 'N',
            hora: horaDia,
        });
    }
}


const HorarioTable = () => {
    const [horarioInformado, setHorarioInformado] = useState('');
    const [horariosOcupados, setHorariosOcupados] = useState(new Map());
    const diaSegunda = arrayTable.filter(item => item.dia === 2);
    const diaTerca = arrayTable.filter(item => item.dia === 3);
    const diaQuarta = arrayTable.filter(item => item.dia === 4);
    const diaQuinta = arrayTable.filter(item => item.dia === 5);
    const diaSexta = arrayTable.filter(item => item.dia === 6);

    const lerHorario = () => {
        const match = horarioInformado.match(/^(\d+)([MTN])(\d+)$/);

        if (match) {
            const diaSemana = match[1].split('').map((dia) => parseInt(dia));
            const turno = match[2];
            const horario = match[3].split('').map((hora) => parseInt(hora));

            diaSemana.forEach((dia) => {
                horario.forEach((hora) => {
                    const chave = `${dia}${turno}${hora}`;
                    setHorariosOcupados((prevHorarios) => {
                        const newHorarios = new Map(prevHorarios);
                        newHorarios.set(chave, {
                            dia, turno, hora
                        });
                        return newHorarios;
                    });
                });
            });
        } else {
            setHorariosOcupados(new Map());
        }
    };

    const newArray = Array.from(horariosOcupados.values());
    console.log(newArray)

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

            <table className="padraoTabelas">
                <thead>
                    <tr>
                        <th id="pontaEsquerda">HORÁRIOS</th>
                        <th>SEG</th>
                        <th>TER</th>
                        <th>QUA</th>
                        <th>QUI</th>
                        <th id='pontaDireita'>SEX</th>
                    </tr>
                </thead>
                <tbody>
                    {horariosColuna.map((horario, index) => (
                        <tr key={index}>
                            <td>{horario.Horario}</td>
                            <td>
                                {diaSegunda[index] && `${diaSegunda[index].dia}${diaSegunda[index].turno}${diaSegunda[index].hora}`}
                            </td>

                            <td>
                                {diaTerca[index] && `${diaTerca[index].dia}${diaTerca[index].turno}${diaTerca[index].hora}`}
                            </td>

                            <td>
                                {diaQuarta[index] && `${diaQuarta[index].dia}${diaQuarta[index].turno}${diaQuarta[index].hora}`}
                            </td>

                            <td>
                                {diaQuinta[index] && `${diaQuinta[index].dia}${diaQuinta[index].turno}${diaQuinta[index].hora}`}
                            </td>

                            <td>
                                {diaSexta[index] && `${diaSexta[index].dia}${diaSexta[index].turno}${diaSexta[index].hora}`}
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>

        </React.Fragment>
    );
};

export default HorarioTable;
