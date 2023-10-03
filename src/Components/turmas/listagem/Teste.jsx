import React, { useState } from 'react';
// cria um array de horarios nos quais vao ser as linhas da ptimeira coluna da tabela
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
// const componentesLocais = [
//     { codigo: 'PEX1245', carga_horaria: 60, semestre: 1 },
//     { codigo: 'PEX1232', carga_horaria: 30, semestre: 2 },
//     { codigo: 'PEX1246', carga_horaria: 90, semestre: 4 },
//     { codigo: 'PEX1241', carga_horaria: 30, semestre: 1 },
//     { codigo: 'PEX3445', carga_horaria: 30, semestre: 3 },
//     { codigo: 'PEX1675', carga_horaria: 60, semestre: 5 },
//     { codigo: 'PEX1195', carga_horaria: 60, semestre: 6 },
// ]

// neste array, sao criados todas as possibilidades de combinações de horários com 3 caracteres.
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
    const [horariosMarcados, setHorariosMarcados] = useState([])
    const [maxCheckeds, setMaxCheckeds] = useState(1)
    const [numSemestre, setNumSemestre] = useState(0)
    const diaSegunda = arrayTable.filter(item => item.dia === 2);
    const diaTerca = arrayTable.filter(item => item.dia === 3);
    const diaQuarta = arrayTable.filter(item => item.dia === 4);
    const diaQuinta = arrayTable.filter(item => item.dia === 5);
    const diaSexta = arrayTable.filter(item => item.dia === 6);

    const lerHorario = () => {
        // Esta função vai ler o horario passado  independente do tamanho dele, vai tratar os dados, separando-os em combinações de 3 caracteres sem repetições e vai salvalos em um array
        const horarios = horarioInformado.split(' ')
        horarios.forEach((horario) => {

            const match = horario.match(/^(\d+)([MTN])(\d+)$/);

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
        })
    };

    const newArray = Array.from(horariosOcupados.values());


    console.log(newArray)

    const handleHorarioSelecionado = (event) => {
        // Nesta função, vai pegar os horários que foram selecionados la nos checkbox da tabela e vai passa-los para um array.
        const horarioSelecionado = event.target.value;

        if (horariosMarcados.includes(horarioSelecionado)) {
            // Se o objeto já estiver marcado, remova-o dos horários marcados
            setHorariosMarcados(horariosMarcados.filter(item => item !== horarioSelecionado));
        } else {
            // Se o objeto não estiver marcado, adicione-o aos horários marcados
            setHorariosMarcados([...horariosMarcados, horarioSelecionado]);
        }
    };
    const [iguais, setIguais] = useState([])
    const verificarHorarios = () => {
        // Nesta função, ira acontecer uma verificação de se pelo menos um elemento do array 'newArray' atende as condições dentro do metodo .some()
        if (horariosOcupados.size > 0) {
            const horariosIguais = newArray.filter((element) =>
                Array.from(horariosOcupados.keys()).some(
                    (chave) =>
                        parseInt(chave.charAt(0)) === element.dia &&
                        chave.charAt(1) === element.turno &&
                        parseInt(chave.charAt(2)) === element.hora
                )
            );
            setIguais(horariosIguais);
        }
    };

    const requisitarComponente = async ({ target }) => {
        // Esta função vai requisitar o componente curricular com base no codigo informado pelo usuario e assim vai fazer a verifiçãp da carga horaria do mesmo para assim definir o maximo de checkbox que podem ser marcados na tabela.
        if (target.value.length === 7) {
            let codigoComponente = target.value
            const token = localStorage.getItem('token');
            const url = `http://127.0.0.1:8000/componentes/${codigoComponente}`;
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `Token ${token}`,
                },
            };

            try {
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    const componentesData = await response.json();
                    setNumSemestre(componentesData.semestre)
                    if (componentesData.carga_horaria === 30) {
                        setMaxCheckeds(2);
                    } else if (componentesData.carga_horaria === 60) {
                        setMaxCheckeds(4);
                    } else if (componentesData.carga_horaria === 90) {
                        setMaxCheckeds(6);
                    }

                } else {
                    console.log('Erro ao listar componentes.')
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
    };




    const enviarHorarios = () => {
        let mensagem = horariosMarcados.join(' ');
        console.log('Horários ja separados por espaço: ' + mensagem);
    }

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
            <button onClick={() => { lerHorario(); verificarHorarios() }}>Cadastrar</button>
            <button onClick={() => { enviarHorarios() }}>Enviar</button>


            <input
                type="text"
                placeholder="Codigo"

                onChange={requisitarComponente}
                className="input"
            />
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
                                {/* Caso pelo menos um indice do array 'diaSegunda' atenda as condições do metodo .some(), irá imprimir na tela um X */}
                                {diaSegunda[index] && (
                                    iguais.some(
                                        (item) =>
                                            item.dia === diaSegunda[index].dia &&
                                            item.turno === diaSegunda[index].turno &&
                                            item.hora === diaSegunda[index].hora
                                    )
                                        ? 'X'
                                        : ''
                                )}

                                {/* Passa os valores do objeto horário selecionado */}
                                <input
                                    type="checkbox"
                                    value={`${diaSegunda[index].dia}${diaSegunda[index].turno}${diaSegunda[index].hora}`}
                                    onChange={handleHorarioSelecionado}
                                    checked={horariosMarcados.includes(`${diaSegunda[index].dia}${diaSegunda[index].turno}${diaSegunda[index].hora}`)}
                                    disabled={horariosMarcados.length >= maxCheckeds && !horariosMarcados.includes(`${diaSegunda[index].dia}${diaSegunda[index].turno}${diaSegunda[index].hora}`)}
                                />
                            </td>

                            <td>
                                {diaTerca[index] && (
                                    iguais.some(
                                        (item) =>
                                            item.dia === diaTerca[index].dia &&
                                            item.turno === diaTerca[index].turno &&
                                            item.hora === diaTerca[index].hora
                                    )
                                        ? 'X'
                                        : ''
                                )}
                                <input
                                    type="checkbox"
                                    value={`${diaTerca[index].dia}${diaTerca[index].turno}${diaTerca[index].hora}`}
                                    onChange={handleHorarioSelecionado}
                                    checked={horariosMarcados.includes(`${diaTerca[index].dia}${diaTerca[index].turno}${diaTerca[index].hora}`)}
                                    disabled={horariosMarcados.length >= maxCheckeds && !horariosMarcados.includes(`${diaTerca[index].dia}${diaTerca[index].turno}${diaTerca[index].hora}`)}
                                />
                            </td>

                            <td>
                                {diaQuarta[index] && (
                                    iguais.some(
                                        (item) =>
                                            item.dia === diaQuarta[index].dia &&
                                            item.turno === diaQuarta[index].turno &&
                                            item.hora === diaQuarta[index].hora
                                    )
                                        ? 'X'
                                        : ''
                                )}
                                <input
                                    type="checkbox"
                                    value={`${diaQuarta[index].dia}${diaQuarta[index].turno}${diaQuarta[index].hora}`}
                                    onChange={handleHorarioSelecionado}
                                    checked={horariosMarcados.includes(`${diaQuarta[index].dia}${diaQuarta[index].turno}${diaQuarta[index].hora}`)}
                                    disabled={horariosMarcados.length >= maxCheckeds && !horariosMarcados.includes(`${diaQuarta[index].dia}${diaQuarta[index].turno}${diaQuarta[index].hora}`)}
                                />
                            </td>

                            <td>
                                {diaQuinta[index] && (
                                    iguais.some(
                                        (item) =>
                                            item.dia === diaQuinta[index].dia &&
                                            item.turno === diaQuinta[index].turno &&
                                            item.hora === diaQuinta[index].hora
                                    )
                                        ? 'X'
                                        : ''
                                )}
                                <input
                                    type="checkbox"
                                    value={`${diaQuinta[index].dia}${diaQuinta[index].turno}${diaQuinta[index].hora}`}
                                    onChange={handleHorarioSelecionado}
                                    checked={horariosMarcados.includes(`${diaQuinta[index].dia}${diaQuinta[index].turno}${diaQuinta[index].hora}`)}
                                    disabled={horariosMarcados.length >= maxCheckeds && !horariosMarcados.includes(`${diaQuinta[index].dia}${diaQuinta[index].turno}${diaQuinta[index].hora}`)}
                                />
                            </td>

                            <td>
                                {diaSexta[index] && (
                                    iguais.some(
                                        (item) =>
                                            item.dia === diaSexta[index].dia &&
                                            item.turno === diaSexta[index].turno &&
                                            item.hora === diaSexta[index].hora
                                    )
                                        ? 'X'
                                        : ''
                                )}
                                <input
                                    type="checkbox"
                                    value={`${diaSexta[index].dia}${diaSexta[index].turno}${diaSexta[index].hora}`}
                                    onChange={handleHorarioSelecionado}
                                    checked={horariosMarcados.includes(`${diaSexta[index].dia}${diaSexta[index].turno}${diaSexta[index].hora}`)}
                                    disabled={horariosMarcados.length >= maxCheckeds && !horariosMarcados.includes(`${diaSexta[index].dia}${diaSexta[index].turno}${diaSexta[index].hora}`)}
                                />
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>

        </React.Fragment>
    );
};

export default HorarioTable;