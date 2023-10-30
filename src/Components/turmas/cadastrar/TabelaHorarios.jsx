import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDocentes } from './DocentesContext';
import Header from '../../header/Header';


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

const TabelaHorarios = () => {
    const [horarioInformado, setHorarioInformado] = useState([]);
    const [horariosOcupados, setHorariosOcupados] = useState(new Map());
    const [horariosMarcados, setHorariosMarcados] = useState([])
    const [iguais, setIguais] = useState([])
    const [numSemestre, setNumSemestre] = useState('')
    const [maxCheckeds, setMaxCheckeds] = useState(1)
    const diaSegunda = arrayTable.filter(item => item.dia === 2);
    const diaTerca = arrayTable.filter(item => item.dia === 3);
    const diaQuarta = arrayTable.filter(item => item.dia === 4);
    const diaQuinta = arrayTable.filter(item => item.dia === 5);
    const diaSexta = arrayTable.filter(item => item.dia === 6);
    const { codComp, numTurma, numVagas } = useParams()
    const { professorSelecionado } = useDocentes();
    console.log('Docente selecionado:' + professorSelecionado.nome_prof)
    console.log(`Codigo do componente: ${codComp} | Numero da turma: ${numTurma} | Numero de vagas: ${numVagas}`)


    const verificarHorario = useCallback(() => {
        console.log('Funcao verificar Horario foi chamada com sucesso!')
        setIguais([]);
        // Nesta função, irá acontecer uma verificação de se pelo menos um elemento do array 'newArray' atende as condições dentro do método .some()
        if (horariosOcupados.size > 0) {
            const horariosIguais = arrayTable.filter((element) =>
                Array.from(horariosOcupados.keys()).some(
                    (chave) =>
                        parseInt(chave.charAt(0)) === element.dia &&
                        chave.charAt(1) === element.turno &&
                        parseInt(chave.charAt(2)) === element.hora
                )
            );
            setIguais(horariosIguais);
            console.log(`Os horarios iguais agora são: ${JSON.stringify(horariosIguais)}`);
        } else {
            setIguais([]);
        }
    }, [horariosOcupados]);

    const handleHorarioSelecionado = (event) => {
        event.preventDefault();
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

    const letHorariosTurmas = useCallback(async () => {
        console.log('Funcao ler horarios turmas foi chamada!')
        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/horarios/semestre/${numSemestre}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                console.log('Requisição ler horarios turmas deu certo!')
                const componentesData = await response.json();
                setHorarioInformado(componentesData.horario)

                // Esta função vai ler o horario passado  independente do tamanho e da quantidade de horarios que tiver na string "23M45" ou "234N23 56T34", vai tratar os dados, separando-os em combinações de 3 caracteres "2M4" sem repetições e vai salvalos em um array

                horarioInformado.forEach((horarioss) => {
                    const horarios = horarioss.split(' ')
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

                })

                verificarHorario();
            } else {
                console.log('Erro ao listar componentes.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [numSemestre, horarioInformado, verificarHorario]); // Adicione 'horarioInformado' e 'verificarHorario' como dependências



    const calcularMaxCheckeds = (cargaHoraria) => {
        console.log('Funcao Calcular Max checkeds foi chamada com sucesso!')
        if (cargaHoraria <= 90) {
            return Math.ceil(cargaHoraria / 15);
        }
        return 6; // Valor máximo
    };

    const requisitarComponente = useCallback(async () => {
        // Esta função vai requisitar o componente curricular com base no codigo informado pelo usuario e assim vai fazer a verifição da carga horaria e do numero do semestre do mesmo para assim definir o maximo de checkbox que podem ser marcados na tabela e também os horários já ocupados pelas turmas do semestre.

        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/componentes/${codComp.toUpperCase()}`;
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
                setNumSemestre(componentesData.num_semestre);
                const maxCheckeds = calcularMaxCheckeds(componentesData.carga_horaria);
                setMaxCheckeds(maxCheckeds);
                letHorariosTurmas()

            } else {
                console.log('Erro ao listar componentes.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    }, [codComp, letHorariosTurmas]);

    useEffect(() => {
        requisitarComponente();
    }, [requisitarComponente]);


    return (
        <>
            <Header />
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
        </>
    )
}

export default TabelaHorarios
