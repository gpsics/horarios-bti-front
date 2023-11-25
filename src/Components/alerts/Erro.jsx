import Swal from "sweetalert2"

const Erro = {
    erro: (motivo) => {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:`${motivo}!`,
        });
    },
};

export default Erro
