import Swal from "sweetalert2";

const Confirm = {
    excluir: () => {
        return Swal.fire({
            title: 'Deseja Mesmo Excluir?',
            text: 'Confirmando a exclusão, os dados não podem ser recuperados.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085de',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, delete!',
        });
    },
    cadastrar: () =>{
        return Swal.fire({
            title: 'Deseja Realizar este Cadastro?',
            text: 'Confirmando o cadastro, todos os dados serão salvos.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085de',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, cadastre!',
        });
    },
    editar: () =>{
        return Swal.fire({
            title: 'Deseja Realizar esta Alteração?',
            text: 'Confirmando, todos os dados serão alterados.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085de',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim!',
        });
    }

};

export default Confirm;
