const nome = document.querySelector("#nome")
const foto = document.querySelector("#foto-perfil")
const usuarioEL = document.querySelector("#usuario")


// Pega os parâmetros da URL
const params = new URLSearchParams(window.location.search);
const usuarioId = localStorage.getItem("id")

// Verifica se o ID existe
if (!usuarioId) {
  console.error('ID do usuário não encontrado na URL');
} else {
  buscarUsuario(usuarioId);
  buscarEventosInscritos(usuarioId);
}

async function buscarUsuario(id) {
  try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar usuário');
    }

    const usuario = await response.json();

    // Exemplo: preencher dados na tela
    nome.textContent = usuario.nome;
    usuarioEL.textContent = usuario.usuario;
    foto.src = usuario.urlImagemPerfil;

  } catch (error) {
    console.error(error.message);
  }
}

async function buscarEventosInscritos(usuarioId) {
  const container = document.querySelector('#eventos-inscritos');

  try {
    const response = await fetch(
      `http://localhost:3000/inscricoes/usuario/${usuarioId}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar eventos');
    }

    const eventos = await response.json();

    container.innerHTML = '';

    if (eventos.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center text-muted">
          Nenhum evento inscrito
        </div>
      `;
      return;
    }

    eventos.forEach(evento => {
      const col = document.createElement('div');
      col.className = 'col-12';

      col.innerHTML = `
        <div class="evento-card">
          <img 
            src="${evento.urlImagemCapa}" 
            class="evento-img" 
            alt="Imagem do evento"
          />

          <div class="evento-info">
            <h6>${evento.nome}</h6>
            <small>
              📅 ${formatarData(evento.dataInicial)} <br>
              📍 ${evento.local}
            </small>
          </div>
        </div>
      `;

      container.appendChild(col);
    });

  } catch (error) {
    console.error(error.message);
    container.innerHTML = `
      <div class="col-12 text-center text-danger">
        Erro ao carregar eventos
      </div>
    `;
  }
}

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}