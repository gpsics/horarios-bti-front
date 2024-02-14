import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../provider/authProvider';
import { useDocentes } from '../cadastrar/DocentesContext';
import { useNavigate } from 'react-router-dom';
import DayColumn from './DayColumn'
import Confirm from '../../alerts/Confirm';
import Sucess from '../../alerts/Sucess'
import axios from 'axios';
import Erro from '../../alerts/Erro';
import './EditarTurma.css'

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
const TabelaEditar = ({ tur, numVagas, numTurma }) => {
    const [horariosMarcados, setHorariosMarcados] = useState(new Set());
    const [iguais, setIguais] = useState([]);
    const [maxCheckeds, setMaxCheckeds] = useState(1)
    const diaSegunda = arrayTable.filter(item => item.dia === 2);
    const diaTerca = arrayTable.filter(item => item.dia === 3);
    const diaQuarta = arrayTable.filter(item => item.dia === 4);
    const diaQuinta = arrayTable.filter(item => item.dia === 5);
    const diaSexta = arrayTable.filter(item => item.dia === 6);
    const { docentesSelecionados } = useDocentes()
    const { token, checkTokenExpiration } = useAuth();

    const navigate = useNavigate();
    const cancelar = () => {
        checkTokenExpiration()
        Confirm.cancel().then(async (result) => {
            if (result.isConfirmed) {
                navigate(-1)
            }
        })
    }
    const updateTurma = async (e) => {
        checkTokenExpiration()
        e.preventDefault()
        Confirm.cadastrar().then(async (result) => {
            if (result.isConfirmed) {
                const url = `http://44.201.214.145:8000/api/turmas/${tur.id}/`
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const data = {
                    num_turma: numTurma,
                    horario: Array.from(horariosMarcados).join(' '),
                    num_vagas: numVagas,
                    professor: docentesSelecionados.map(professor => professor.id)
                }

                try {
                    const response = await axios.patch(url, data, config);
                    if (response.status === 201) {
                        Sucess.editado()
                        navigate(-1)
                    }
                } catch (error) {
                    if (error.response) {
                        // Se houver dados na resposta, exiba a mensagem para o usuário
                        Erro.erro(Object.values(error.response.data).join('\n'));
                    } else {
                        console.error('Erro na requisição:', error.message);
                        Erro.erro('Erro desconhecido');
                    }
                }

            }
        })
    }
    
    const verificarHorario = (horariosSet, destino) => {
        if (destino) {
            const horariosIguais = arrayTable.filter((element) =>
                Array.from(horariosSet).some(
                    (chave) =>
                        parseInt(chave.charAt(0)) === element.dia &&
                        chave.charAt(1) === element.turno &&
                        parseInt(chave.charAt(2)) === element.hora
                )
            );

            setHorariosMarcados(new Set(horariosIguais.map((horario) => `${horario.dia}${horario.turno}${horario.hora}`)));
        } else {
            setIguais((prevIguais) => {
                // Use a Set to keep track of unique values
                const uniqueIguaisSet = new Set(prevIguais);

                // Add new values to the Set
                arrayTable.forEach((element) => {
                    if (Array.from(horariosSet).some(
                        (chave) =>
                            parseInt(chave.charAt(0)) === element.dia &&
                            chave.charAt(1) === element.turno &&
                            parseInt(chave.charAt(2)) === element.hora
                    )) {
                        uniqueIguaisSet.add(element);
                    }
                });

                // Convert the Set back to an array
                const uniqueIguaisArray = Array.from(uniqueIguaisSet);

                return uniqueIguaisArray;
            });
        }
    };

    const handleHorarioSelecionado = (event) => {
        const horarioSelecionado = event.target.value;
        setHorariosMarcados((prevHorarios) => {
            const newHorarios = new Set(prevHorarios);

            if (newHorarios.has(horarioSelecionado)) {
                newHorarios.delete(horarioSelecionado);
            } else if (newHorarios.size < maxCheckeds) {
                // Verifica se atingiu o máximo antes de adicionar
                newHorarios.add(horarioSelecionado);
            }

            return newHorarios;
        });
    };



    const lerHorariosTurmas = useCallback(async (identificador, tipo) => {
        let url = ''
        if (tipo) {
            url = `http://44.201.214.145:8000/api/horarios/semestre/${identificador}`;
        } else if (!tipo) {
            url = `http://44.201.214.145:8000/api/horarios/professores/${identificador}`;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            // Esta função vai ler o horario passado  independente do tamanho e da quantidade de horarios que tiver na string "23M45" ou "234N23 56T34", vai tratar os dados, separando-os em combinações de 3 caracteres "2M4" sem repetições e vai salvalos em um array
            if (response.status === 200) {
                const componentesData = response.data
                const horariosSet = new Set();
                componentesData.forEach((item, index) => {
                    // continuar a processar os horários contidos em item.horario
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
                                            const chave = `${dia}${turno}${hora}`;
                                            horariosSet.add(chave);
                                        });
                                    });
                                } else {
                                    console.log('Nao tem match nos horarios!')
                                }
                            });
                        })
                    } else {
                        console.log(`A turma ${index + 1} não possue horários informados!`)
                    }
                });
                if (horariosSet.size > 0) {
                    const destino = false
                    verificarHorario(horariosSet, destino);
                }
            } else {
                console.log(`Erro ao listar os horários das turmas!`)
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [token])


    const calcularMaxCheckeds = (cargaHoraria) => {
        // Essa funcao vai retornar o maximo de checkbox que podem ser marcados na tabela de acordo com a carga horária do componente.
        if (cargaHoraria <= 90) {
            return Math.ceil(cargaHoraria / 15);
        }
        return 6; // Valor máximo
    };

    const requisitarComponente = useCallback(async () => {

        const url = `http://44.201.214.145:8000/api/componentes/${tur.cod_componente}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const componentesData = response.data
                const novoNumSemestre = componentesData.num_semestre;

                const maxCheckeds = calcularMaxCheckeds(componentesData.carga_horaria);
                setMaxCheckeds(maxCheckeds);
                const tipo = true
                lerHorariosTurmas(novoNumSemestre, tipo)

            } else {
                Erro.erro('Erro ao listar componentes!')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    }, [token, tur, lerHorariosTurmas])

    const requisitarDocentes = useCallback(async () => {
        setIguais([])
        for (const professor of docentesSelecionados) {
            const tipo = false;
            lerHorariosTurmas(professor.id, tipo);
        }

    }, [lerHorariosTurmas, docentesSelecionados]);

    useEffect(() => {
        requisitarDocentes()
    }, [requisitarDocentes, docentesSelecionados])

    const lerHorariosTurma = useCallback(() => {
        const horariosSet = new Set();

        if (tur && typeof tur === 'object') {
            requisitarComponente()
            requisitarDocentes()
            const horarioInformado = tur.horario;
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
                                    const chave = `${dia}${turno}${hora}`;
                                    horariosSet.add(chave);
                                });
                            });
                        } else {
                            console.log('Nao tem match nos horarios!')
                        }
                    });
                })
            }
        }

        if (horariosSet.size > 0) {
            const destino = true
            verificarHorario(horariosSet, destino);
        }
    }, [tur, requisitarComponente, requisitarDocentes]);

    useEffect(() => {
        lerHorariosTurma();
    }, [lerHorariosTurma]);
    return (
        <>
            <table className="padraoTabelas tableHor">
                <thead>
                    <tr>
                        <th id="pontaEsquerda" className='colunaHorarios'>HORÁRIOS</th>
                        <th className='colunaDias'>SEG</th>
                        <th className='colunaDias'>TER</th>
                        <th className='colunaDias'>QUA</th>
                        <th className='colunaDias'>QUI</th>
                        <th id='pontaDireita' className='colunaDias'>SEX</th>
                    </tr>
                </thead>
                <tbody>
                    {horariosColuna.map((horario, index) => (
                        <tr key={index}>
                            <td className='colunaHorarios'>{horario.Horario}</td>
                            <DayColumn
                                dayData={diaSegunda[index]}
                                handleHorarioSelecionado={handleHorarioSelecionado}
                                horariosMarcados={horariosMarcados}
                                maxCheckeds={maxCheckeds}
                                iguais={iguais}
                            />
                            <DayColumn
                                dayData={diaTerca[index]}
                                handleHorarioSelecionado={handleHorarioSelecionado}
                                horariosMarcados={horariosMarcados}
                                maxCheckeds={maxCheckeds}
                                iguais={iguais}
                            />
                            <DayColumn
                                dayData={diaQuarta[index]}
                                handleHorarioSelecionado={handleHorarioSelecionado}
                                horariosMarcados={horariosMarcados}
                                maxCheckeds={maxCheckeds}
                                iguais={iguais}
                            />
                            <DayColumn
                                dayData={diaQuinta[index]}
                                handleHorarioSelecionado={handleHorarioSelecionado}
                                horariosMarcados={horariosMarcados}
                                maxCheckeds={maxCheckeds}
                                iguais={iguais}
                            />
                            <DayColumn
                                dayData={diaSexta[index]}
                                handleHorarioSelecionado={handleHorarioSelecionado}
                                horariosMarcados={horariosMarcados}
                                maxCheckeds={maxCheckeds}
                                iguais={iguais}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='opcoesCadastro'>
                <button className="botoesCad" id='cancel' onClick={cancelar}>Cancelar</button>
                <button className="botoesCad" id='cad' onClick={updateTurma}>Editar</button>
            </div>
        </>
    )
}

export default TabelaEditar
