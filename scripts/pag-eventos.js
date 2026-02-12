
const evento_detalhes = document.querySelector("#evento-detalhe") || null
const atividade_lista = document.querySelector("#listaAtividades")

const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const id_evento = params.get("id")


const linkChatbot = document.getElementById("link-chatbot");
const linkEdit = document.getElementById("link-editar");

linkEdit.href = `editarEventos.html?id=${id_evento}`
linkChatbot.href = `chatbot.html?id=${id_evento}`;



const link_att = document.querySelector(".link-add-att");
link_att.innerHTML = `<a class="btn btn-outline-light ms-2" href=\"cadastroAtividades.html?id=${id_evento}\">Adcionar Atividade </a>`;

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
    section.className = "text-center text-white"

    document.querySelector("#evento-img").src = `${dados.urlImagemCapa}`

    section.appendChild(Object.assign(document.createElement("h1"), {
        textContent: `${dados.nome}`,
        className: "m-3 p-1"
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
    div.className = "card card-atividade";

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


async function deletarEvento() {
    try {
        const response = await fetch(`http://127.0.0.1:3000/evento/${id_evento}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }); 
        
        window.location.href = "./home.html";
    }
    catch (error) {
        throw new Error("Erro ao buscar eventos: ", error);
    }

}

puxaEvento();
puxaAtividade();