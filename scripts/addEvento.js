const formEvento = document.querySelector("#formEvento") || null // id do form
const representacao = document.querySelector("#resposta");

async function enviarEvento(dados) {
    try {
        const resp = await fetch("http://127.0.0.1:3000/evento", {
            method: 'POST',
            body: dados
        })

        const json = await resp.json(); 

        representacao.textContent = json.message;
        
    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

formEvento.addEventListener('submit', async (e) => {
  e.preventDefault();

//    if (!formEvento.checkValidity()) {
//                 e.preventDefault();
//             }
            // formEvento.classList.add('was-validated');

            // // Validação extra: data final >= data inicial
            // const inicio = document.getElementById('dataInicio');
            // const fim = document.getElementById('dataFim');

            // if (inicio.value && fim.value && fim.value < inicio.value) {
            //     e.preventDefault();
            //     fim.classList.add('is-invalid');
            //     fim.nextElementSibling.textContent = "A data de término deve ser depois da data de início.";
            // } else {
            //     fim.classList.remove('is-invalid');
            // }

  const formData = new FormData(formEvento);


  enviarEvento(formData);

  e.target.reset();
})