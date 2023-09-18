import React, { useState } from 'react';

const Teste = () => {
    const [horarioInformado, setHorarioInformado] = useState('');
    const diasSemana = {
        1: 'domingo',
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
    }

    const lerHorario = (event) => {
        event.preventDefault();
        console.log('Funcao chamada');
        // Define uma expressão regular para extrair as informações
        const regex = /^(\d+)([MTN])(\d+)$/;

        // Tenta fazer a correspondência da string com a expressão regular
        const match = horarioInformado.match(regex);

        if (match) {
            // match[1] contém os dias da semana
            const diaSemana = match[1].split('').map((dia) => parseInt(dia));
            const diasSelecionados = diaSemana
                .map((dia) => diasSemana[dia])
                .filter(Boolean);

            // match[2] contém o turno
            let turno;
            if (match[2] === 'M') {
                turno = 'Manhã';
            } else if (match[2] === 'T') {
                turno = 'Tarde';
            } else if (match[2] === 'N') {
                turno = 'Noite';
            }

            // match[3] contém os horários
            const horario =  match[3].split('').map((hora) => parseInt(hora));
            const horariosSelecionados = horario
                .map((hora) => horarioDia[hora])
                .filter(Boolean)

            // Agora você pode usar essas informações como desejar
            console.log(`| Dia da semana: ${diasSelecionados.join(', ')} | Turno: ${turno} | Horário: ${horariosSelecionados.join(', ')}`);
           
        } else {
            console.log('A string não corresponde ao padrão esperado.');
        }
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
        </React.Fragment>
    );
};

export default Teste;
 