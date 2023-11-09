import Swal from "sweetalert2"

const Error = {
    erro: (motivo) => {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:`${motivo}!`,
        });
    },
};

export default Error
