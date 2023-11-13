import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDocentes } from './DocentesContext';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import Menu from '../../menuLateral/Menu';
import Error from '../../alerts/Error';
import Confirm from '../../alerts/Confirm';
import Sucess from '../../alerts/Sucess';
import axios from 'axios';
import AuthProvider from '../../../provider/authProvider';


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
    const [horariosMarcados, setHorariosMarcados] = useState([])
    const [componente, setComponente] = useState([])
    const [iguais, setIguais] = useState([])
    const [maxCheckeds, setMaxCheckeds] = useState(1)
    const diaSegunda = arrayTable.filter(item => item.dia === 2);
    const diaTerca = arrayTable.filter(item => item.dia === 3);
    const diaQuarta = arrayTable.filter(item => item.dia === 4);
    const diaQuinta = arrayTable.filter(item => item.dia === 5);
    const diaSexta = arrayTable.filter(item => item.dia === 6);
    const { codComp, numTurma, numVagas } = useParams()
    const { docentesSelecionados } = useDocentes()
    const auth = AuthProvider()
    console.log(`Os docentes selecionados foram ${docentesSelecionados.id}`)

    const navigate = useNavigate();
    const cancelar = () => {
        Confirm.cancel().then(async (result) => {
            if (result.isConfirmed) {
                navigate('/home')
            }
        })
    }

    const cadastrarTurma = async (e) => {
        e.preventDefault()
        Confirm.cadastrar().then(async (result) => {
            if (result.isConfirmed) {
                if (horariosMarcados.size === 0) {
                    Error.erro('Você precisa selecionar algum horário na tabela!')
                    return
                }
                if (horariosMarcados.size < maxCheckeds) {
                    Error.erro(`Escolha ${maxCheckeds} horários na tabela, totalizando ${maxCheckeds * 15} horas!`)
                    return
                }
                const token = auth.token
                const url = 'http://127.0.0.1:8000/api/turmas/'
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const data = {
                    cod_componente: componente.codigo,
                    num_turma: numTurma,
                    horario: horariosMarcados.join(' '),
                    num_vagas: numVagas,
                    professor: docentesSelecionados.id
                }

                try {
                    const response = await axios.post(url, data, config);
                    if (response.status === 201) {
                        Sucess.cadastro()
                    } else {
                        Error.erro('Erro ao cadastrar turma!')
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        })
    }

    const verificarHorario = (horariosSet) => {
        setIguais([]);
        // Nesta função, irá acontecer uma verificação de se pelo menos um elemento do array 'newArray' atende as condições dentro do método .some() para assim marcar como horário igual ao da tabela e la na tabela, marccar com um X

        const horariosIguais = arrayTable.filter((element) =>
            Array.from(horariosSet).some(
                (chave) =>
                    parseInt(chave.charAt(0)) === element.dia &&
                    chave.charAt(1) === element.turno &&
                    parseInt(chave.charAt(2)) === element.hora
            )
        );
        setIguais(horariosIguais);
    };

    const handleHorarioSelecionado = (event) => {
        event.preventDefault();
        // Nesta função, os horários que foram selecionados la nos checkbox da tabela vão para um array.
        const horarioSelecionado = event.target.value;

        if (horariosMarcados.includes(horarioSelecionado)) {
            // Se o objeto já estiver marcado, remova-o dos horários marcados
            setHorariosMarcados(horariosMarcados.filter(item => item !== horarioSelecionado));
        } else {
            // Se o objeto não estiver marcado, adicione-o aos horários marcados
            setHorariosMarcados([...horariosMarcados, horarioSelecionado]);
        }
    };

    const lerHorariosTurmas = async (numSemestre) => {
        const token = auth.token
        const url = `http://127.0.0.1:8000/api/horarios/semestre/${numSemestre}`;
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

        try {
            const response = await axios.get(url, config);
            // Esta função vai ler o horario passado  independente do tamanho e da quantidade de horarios que tiver na string "23M45" ou "234N23 56T34", vai tratar os dados, separando-os em combinações de 3 caracteres "2M4" sem repetições e vai salvalos em um array
            if (response.ok) {
                const componentesData = await response.json();
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
                        Error.erro(`A turma ${index + 1} do ${numSemestre}º semestre não possue horários informados!`)
                    }
                });
                if (horariosSet.size > 0) {
                    verificarHorario(horariosSet);
                    console.log('Horários Salvos:', Array.from(horariosSet));
                }
            } else {
                Error.erro(`Erro ao listar os horários das turmas do ${numSemestre}º semestre!`)
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    const calcularMaxCheckeds = (cargaHoraria) => {
        // Essa funcao vai retornar o maximo de checkbox que podem ser marcados na tabela de acordo com a carga horária do componente.
        if (cargaHoraria <= 90) {
            return Math.ceil(cargaHoraria / 15);
        }
        return 6; // Valor máximo
    };

    const requisitarComponente = async () => {
        // eslint-disable-next-line
        // Esta função vai requisitar o componente curricular com base no codigo informado pelo usuario e assim vai fazer a verifição da carga horaria e do numero do semestre do mesmo para assim definir o maximo de checkbox que podem ser marcados na tabela e também os horários já ocupados pelas turmas do semestre.
        const authToken = AuthProvider()
        const token = authToken.token
        const url = `http://127.0.0.1:8000/api/componentes/${codComp.toUpperCase()}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const componentesData = await response.json();
                setComponente(componentesData)
                const novoNumSemestre = componentesData.num_semestre;

                const maxCheckeds = calcularMaxCheckeds(componentesData.carga_horaria);
                setMaxCheckeds(maxCheckeds);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                lerHorariosTurmas(novoNumSemestre)

            } else {
                Error.erro('Erro ao listar componentes!')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    };

    useEffect(() => {
        requisitarComponente();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id='entidades'>
                <div id="menu">
                    <Menu />
                </div>

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
                <div className="opcoesCadastro">
                    <button id='cancel' className="botoesCad" onClick={cancelar}>Cancelar</button>
                    <button id='cad' className="botoesCad" onClick={cadastrarTurma}>Cadastrar</button>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default TabelaHorarios
