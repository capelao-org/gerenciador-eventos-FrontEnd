const formEvento = document.querySelector("#formEvento") || null 
const representacao = document.querySelector("#resposta");
const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const id_evento = params.get("id")

async function puxaEventos() {
    try {
        const response = await fetch(`http://127.0.0.1:3000/evento/${id_evento}`,  {
            headers: {
                "Content-Type": "application/json", Authorization: `Bearer ${token}`
            }
        }); 
        const dados = await response.json();

        exibirEvento(dados);

    } catch(error) {
        // throw new Error("Erro ao buscar eventos");
        console.log("Erro real:", error);
    }
}

function exibirEvento(dados) {
    document.querySelector("#nomeEvento").value = dados.nome;
    document.querySelector("#dataInicio").value = dados.dataInicial.split("T")[0];
    document.querySelector("#descricao").value = dados.descricao;
}

async function enviarEvento(dados) {
    try {
        const resp = await fetch(`http://127.0.0.1:3000/evento/${id_evento}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
            body: JSON.stringify(dados)
        })

        const json = await resp.json(); 

        representacao.textContent = json.message;
        
    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

formEvento.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(formEvento);
  const dados = Object.fromEntries(formData.entries());

  enviarEvento(dados);
})

puxaEventos();