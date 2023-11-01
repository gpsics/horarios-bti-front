import Swal from "sweetalert2";

const Confirm = {
    excluir: () => {
        return Swal.fire({
            title: 'Deseja Mesmo Excluir?',
            text: 'Confirmando a exclusão, os dados não podem ser recuperados.',
            icon: 'question',
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
            icon: 'question',
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
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085de',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim!',
        });
    },
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
    }

};

export default Confirm;
