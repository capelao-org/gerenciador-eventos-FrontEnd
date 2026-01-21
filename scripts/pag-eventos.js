
const evento_detalhes = document.querySelector("#evento-detalhe") || null
const atividade_lista = document.querySelector("#listaAtividades")

const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const id_evento = params.get("id")


const linkChatbot = document.getElementById("link-chatbot");


linkChatbot.href = `chatbot.html?id=${id_evento}`;



const link_att = document.querySelector(".link-add-att");
link_att.innerHTML = `<a href=\"cadastroAtividades.html?id=${id_evento}\">Adcionar Atividade </a>`;

async function puxaEvento() {
    try {
        const response = await fetch(`http://127.0.0.1:3000/evento/${id_evento}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }); 
        const dados = await response.json();

        exibirEvento(dados);

    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

function exibirEvento(dados) {
    evento_detalhes.innerHTML = ''

    const section = document.createElement("div");
    section.className = " text-center text-white"

    section.appendChild(Object.assign(document.createElement("h2"), {
        textContent: `${dados.nome}`,
        className: "mb-3"
    }))

    section.appendChild(Object.assign(document.createElement("p"), {
        innerHTML: `<strong>Data Inicial:</strong> ${dados.dataInicial}`
    }));


    section.appendChild(Object.assign(document.createElement("p"), {
        innerHTML: `<strong>Descrição:</strong> ${dados.descricao}`
    }));

    const btn = section.appendChild(Object.assign(document.createElement("button"), {
        textContent: `Inscrever-se`,
        className: "btn btn-primary",
        id: "#btn-inscrever"
    }));

    btn.addEventListener("click", () => {
        inscreverNoEvento();
    });

    evento_detalhes.appendChild(section);
}

function enviarAtividade(dados) {
    try {
        fetch(`http://127.0.0.1:3000/evento/${id_evento}/atividade`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })

        puxaAtividade();
    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

async function puxaAtividade() {
    try {
        const response = await fetch(`http://127.0.0.1:3000/evento/${id_evento}/atividade`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }); 
        const dados = await response.json();

        exibirAtividades(dados);

    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

function exibirAtividades(dados) {
    const div = document.createElement("div");
    div.className = "card card-atividade h-100";

    dados.forEach(atividade => {
        
        div.appendChild(Object.assign(document.createElement("h5"), {
            textContent: `Titulo: ${atividade.titulo}`,
        }))
        div.appendChild(Object.assign(document.createElement("p"), {
            textContent: `${atividade.descricao}`,
        }))
        
        atividade_lista.appendChild(div)
    });
}

// formEvento.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const formData = new FormData(formEvento);
//   const dados = Object.fromEntries(formData.entries());

//   enviarEvento(dados);

//   e.target.reset();
// })

puxaEvento();
puxaAtividade();