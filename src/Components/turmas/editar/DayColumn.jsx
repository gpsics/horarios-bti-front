// DayColumn.jsx
import React from 'react';

const DayColumn = ({ dayData, handleHorarioSelecionado, horariosMarcados, maxCheckeds, iguais }) => {
    return (
        <td>
            {dayData && (
                iguais.some(
                    (item) =>
                        item.dia === dayData.dia &&
                        item.turno === dayData.turno &&
                        item.hora === dayData.hora
                )
                    ? 'X'
                    : ''
            )}
            <input
                type="checkbox"
                value={`${dayData.dia}${dayData.turno}${dayData.hora}`}
                onChange={(event) => handleHorarioSelecionado(event)}
                checked={horariosMarcados.has(`${dayData.dia}${dayData.turno}${dayData.hora}`)}
                disabled={horariosMarcados.size >= maxCheckeds && !horariosMarcados.has(`${dayData.dia}${dayData.turno}${dayData.hora}`)}
            />
        </td>
    );
};

export default DayColumn;
