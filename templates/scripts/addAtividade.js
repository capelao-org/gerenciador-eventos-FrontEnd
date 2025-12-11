const formAtividade = document.querySelector("#atividadeForm") || null

const params = new URLSearchParams(window.location.search);
const id_evento = params.get("id")

async function enviarAtividade(dados) {
    try {
        dados.id_evento = id_evento
        const resp = await fetch(`http://127.0.0.1:3000/evento/${id_evento}/atividade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })

        const json = await resp.json(); 

        representacao.textContent = json.message;

    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

formAtividade.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(formAtividade);
  const dados = Object.fromEntries(formData.entries());

  enviarAtividade(dados);

  e.target.reset();
})