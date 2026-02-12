const caixaDosEventos = document.querySelector("#caixaEventos"); // colocar o id da caixa que fica os eventos
const formEvento = document.querySelector("#formEvento") || null // id do form

const token = localStorage.getItem("token");

async function puxaEventos() {
    try {
        const response = await fetch("http://127.0.0.1:3000/evento", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }); 
        const dados = await response.json();

        exibirEventos(dados);

    } catch(error) {
        throw new Error("Erro ao buscar eventos");
    }
}

function exibirEventos(dadosEventos) {
    caixaDosEventos.innerHTML = '';
    dadosEventos.forEach(evento => {
        const div = document.createElement("div");
        div.className = "card evento-card text-white card-body m-1 evento-card";

        div.appendChild(Object.assign(document.createElement("img"), {
            src: `${evento.urlImagemCapa}`,
            className: "evento-img"
        } ))

        div.appendChild(Object.assign(document.createElement("h5"), {
            textContent: `${evento.nome}`,
            className: "card-title"
        }));

        div.appendChild(Object.assign(document.createElement("p"), {
            textContent: `Descriçao: ${evento.descricao}`,
            className: "card-text"
        }));

        data = new Date(evento.dataInicial)
        div.appendChild(Object.assign(document.createElement("p"), {
            textContent: `Data: ${data.toLocaleDateString("pt-BR")}`,
            className: "card-text"
        }));

        div.appendChild(Object.assign(document.createElement("a"), {
            textContent: "Ver mais",
            className: "btn btn-primary w-100",
            href: `evento.html?id=${evento.id}`
        }));

        caixaDosEventos.appendChild(div);
    });
}

function enviarEvento(dados) {
    try {
        fetch("http://127.0.0.1:3000/evento", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })

        puxaEventos();
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



puxaEventos();