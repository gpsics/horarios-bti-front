// src/Components/turmas/editar/lerHorariosTurma.jsx
import { useCallback } from 'react';

const useLerHorariosTurma = (tur, arrayTable, verificarHorario) => {
  return useCallback(() => {
    const horariosSet = new Set();

    if (tur && typeof tur === 'object') {
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
              console.log('Nao tem match nos horarios!');
            }
          });
        });
      }
    }

    if (horariosSet.size > 0) {
      verificarHorario(arrayTable, horariosSet);
    }
  }, [tur, arrayTable, verificarHorario]);
};

export default useLerHorariosTurma;
