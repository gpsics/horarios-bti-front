import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './ListarTurmas.css'

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
const TabelaListagem = ({ tur }) => {
    const diaSegunda = arrayTable.filter(item => item.dia === 2);
    const diaTerca = arrayTable.filter(item => item.dia === 3);
    const diaQuarta = arrayTable.filter(item => item.dia === 4);
    const diaQuinta = arrayTable.filter(item => item.dia === 5);
    const diaSexta = arrayTable.filter(item => item.dia === 6);
    const [iguais, setIguais] = useState([])

    const verificarHorario = useCallback((horariosSet) => {
        setIguais([]);
        const horariosIguais = Array.from(horariosSet).map((chave) => {
            const dia = parseInt(chave.charAt(0));
            const turno = chave.charAt(1);
            const hora = parseInt(chave.charAt(2));
            const index = parseInt(chave.charAt(3));

            const matchingElement = arrayTable.find((element) =>
                element.dia === dia &&
                element.turno === turno &&
                element.hora === hora
            );

            if (matchingElement) {
                return {
                    ...matchingElement,
                    index,
                };
            }
            return null;
        }).filter(Boolean);
        setIguais(horariosIguais);
    }, []);

    const lerHorariosTurmas = useCallback(() => {
        const horariosSet = new Set();
        if (tur && Array.isArray(tur)) {
            tur.forEach((item, index) => {
                const horarioInformado = item.horario;
                if (horarioInformado && typeof horarioInformado === 'string') {
                    horarioInformado.split(' ').forEach((horarioss) => {
                        const horarios = horarioss.split(' ');
                        horarios.forEach((horario) => {
                            const match = horario.match(/^(\d+)([MTN])(\d+)$/);
                            if (match) {
                                const diaSemana = match[1].split('').map((dia) => parseInt(dia));
                                const turno = match[2];
                                const horario = match[3].split('').map((hora) => parseInt(hora));
                                diaSemana.forEach((dia) => {
                                    horario.forEach((hora) => {
                                        const chave = `${dia}${turno}${hora}${index}`;
                                        horariosSet.add(chave);
                                    });
                                });
                            } else {
                                console.log('Nao tem match nos horarios!')
                            }
                        });
                    })
                }
            });
            if (horariosSet.size > 0) {
                verificarHorario(horariosSet);
            }
        }
    }, [tur, verificarHorario]);
    useEffect(() => {
        lerHorariosTurmas();
    }, [lerHorariosTurmas]);
    return (
        <table className="padraoTabelas">
            <thead>
                <tr>
                    <th id="pontaEsquerda" className='primeiraColuna colHorarios'>HORÁRIOS</th>
                    <th className='colDias'>SEG</th>
                    <th className='colDias'>TER</th>
                    <th className='colDias'>QUA</th>
                    <th className='colDias'>QUI</th>
                    <th id='pontaDireita' className='colDias'>SEX</th>
                </tr>
            </thead>
            <tbody>
                {horariosColuna.map((horario, index) => (
                    <tr key={index}>
                        <td className='primeiraColuna colHorarios'>{horario.Horario}</td>
                        <td  className='colDias'>
                            {diaSegunda[index] && (
                                <>
                                    {iguais.map((item) => (
                                        item.dia === diaSegunda[index].dia &&
                                            item.turno === diaSegunda[index].turno &&
                                            item.hora === diaSegunda[index].hora ? (
                                            <span key={item.index}><Link to={`/componentes/verDadosComponente/${tur[item.index]?.cod_componente}`}> {tur[item.index]?.cod_componente} </Link> | <Link to={`/turmas/verDadosTurma/${tur[item.index]?.id}`}>T0{tur[item.index]?.num_turma} </Link> <br /></span> 
                                        ) : (
                                            null
                                        )
                                    ))}
                                </>
                            )}
                        </td>

                        <td className='colDias'>
                            {diaTerca[index] && (
                                <>
                                    {iguais.map((item) => (
                                        item.dia === diaTerca[index].dia &&
                                            item.turno === diaTerca[index].turno &&
                                            item.hora === diaTerca[index].hora ? (
                                            <span key={item.index}><Link to={`/componentes/verDadosComponente/${tur[item.index]?.cod_componente}`}> {tur[item.index]?.cod_componente} </Link> | <Link to={`/turmas/verDadosTurma/${tur[item.index]?.id}`}>T0{tur[item.index]?.num_turma} </Link> <br /></span>
                                        ) : (
                                            null
                                        )
                                    ))}
                                </>
                            )}

                        </td>

                        <td className='colDias'>
                            {diaQuarta[index] && (
                                <>
                                    {iguais.map((item) => (
                                        item.dia === diaQuarta[index].dia &&
                                            item.turno === diaQuarta[index].turno &&
                                            item.hora === diaQuarta[index].hora ? (
                                            <span key={item.index}><Link to={`/componentes/verDadosComponente/${tur[item.index]?.cod_componente}`}> {tur[item.index]?.cod_componente} </Link> | <Link to={`/turmas/verDadosTurma/${tur[item.index]?.id}`}>T0{tur[item.index]?.num_turma} </Link><br /></span>
                                        ) : (
                                            null
                                        )
                                    ))}
                                </>
                            )}
                        </td>

                        <td className='colDias'>
                            {diaQuinta[index] && (
                                <>
                                    {iguais.map((item) => (
                                        item.dia === diaQuinta[index].dia &&
                                            item.turno === diaQuinta[index].turno &&
                                            item.hora === diaQuinta[index].hora ? (
                                            <span key={item.index}><Link to={`/componentes/verDadosComponente/${tur[item.index]?.cod_componente}`}> {tur[item.index]?.cod_componente} </Link> | <Link to={`/turmas/verDadosTurma/${tur[item.index]?.id}`}>T0{tur[item.index]?.num_turma} </Link><br /></span>
                                        ) : (
                                            null
                                        )
                                    ))}
                                </>
                            )}

                        </td>

                        <td className='colDias'>
                            {diaSexta[index] && (
                                <>
                                    {iguais.map((item) => (
                                        item.dia === diaSexta[index].dia &&
                                            item.turno === diaSexta[index].turno &&
                                            item.hora === diaSexta[index].hora ? (
                                            <span key={item.index}><Link to={`/componentes/verDadosComponente/${tur[item.index]?.cod_componente}`}> {tur[item.index]?.cod_componente} </Link> | <Link to={`/turmas/verDadosTurma/${tur[item.index]?.id}`}>T0{tur[item.index]?.num_turma} </Link><br /></span>
                                        ) : (
                                            null
                                        )
                                    ))}
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TabelaListagem
