import Swal from "sweetalert2";

const Cancelar = {
    cancel: () => {
        return Swal.fire({
            title: 'Deseja mesmo Cancelar?',
            text: "Ao cancelar, todas as informações serão perdidas!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, cancele!',
            cancelButtonText: 'Não!'
        })
    },
}
export default Cancelar