const formAtividade = document.querySelector("#formAtividade") || null
const evento_detalhes = document.querySelector("#evento-detalhe") || null

const params = new URLSearchParams(window.location.search);
const id_evento = params.get("id")

async function puxaEvento() {
    try {
        const response = await fetch(`http://127.0.0.1:3000/evento/${id_evento}`); 
        const dados = await response.json();

        exibirEvento(dados);

    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

function exibirEvento(dados) {
    evento_detalhes.innerHTML = ''

    const section = document.createElement("div");
    section.className = "evento-detalhe text-center text-white"

    section.appendChild(Object.assign(document.createElement("h2"), {
        textContent: `${dados.nome}`,
        className: "mb-3"
    }))

    section.appendChild(Object.assign(document.createElement("p"), {
        textContent: `Data Inicial: ${dados.dataInicial}`
    }));


    section.appendChild(Object.assign(document.createElement("p"), {
        textContent: `Descriçao: ${dados.descricao}`
    }));

    section.appendChild(Object.assign(document.createElement("button"), {
        textContent: `Inscrever-se`
    }));

    evento_detalhes.appendChild(section);
}

function enviarAtividade(dados) {
    try {
        fetch(`http://127.0.0.1:3000/evento/${id_evento}/atividade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })

        puxaAtividade();
    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

async function puxaAtividade() {
    try {
        const response = await fetch(`http://127.0.0.1:3000/evento/${id_evento}/atividade`); 
        const dados = await response.json();

        exibirAtividades(dados);

    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

// formEvento.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const formData = new FormData(formEvento);
//   const dados = Object.fromEntries(formData.entries());

//   enviarEvento(dados);

//   e.target.reset();
// })

puxaEvento();