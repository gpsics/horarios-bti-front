import Swal from "sweetalert2";
const Input = {
    select: () => {

        return Swal.fire({
            title: "Selecione um Semestre",
            input: "select",
            inputOptions: {
                Semestres: {
                    1: "1º Semestre",
                    2: "2º Semestre",
                    3: "3º Semestre",
                    4: "4º Semestre",
                    5: "5º Semestre",
                    6: "6º Semestre",
                }
            },
            inputPlaceholder: "Selecione um Semestre",
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value) {
                        resolve();
                    } else {
                        resolve("Você precisa selecionar um semestre!");
                    }
                });
            }
        })
    },
    text: () => {
        return Swal.fire({
            title: "Informe o código do componente",
            input: "text",
            inputLabel: "O código deve ter 7 caracteres",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Você precisa informar um código!";
                }
                if (value.length !== 7) {
                    return "O código deve possuir 7 caracteres!";
                }
            }
        })
    },
    
  selectProf: (professores) => {
    return new Promise((resolve) => {
      if (!Array.isArray(professores)) {
        // Handle the case when professores is not an array
        console.error("Error: professores is not an array");
        resolve(); // Resolve the promise without any value
        return;
      }

      Swal.fire({
        title: "Selecione um Professor",
        input: "select",
        inputOptions: {
          profs: Object.fromEntries(
            professores.map((item) => [item.id, item.nome_prof])
          ),
        },
        inputPlaceholder: "Selecione um Professor",
        showCancelButton: true,
        inputValidator: (value) => {
          if (value) {
            resolve({ isConfirmed: true, value });
          } else {
            resolve({ isConfirmed: false, value: null });
          }
        },
      });
    });
  },

}

export default Input