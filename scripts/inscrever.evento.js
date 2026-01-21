// Botão
const btnInscrever = document.querySelector('#btn-inscrever');

// ID do evento pela URL (?id=5)
// const params = new URLSearchParams(window.location.search);
const eventoId = params.get('id');

// ID do usuário pelo localStorage
const usuarioId = localStorage.getItem('id'); 
// ou: JSON.parse(localStorage.getItem('usuario')).id

if (!eventoId || !usuarioId) {
  console.error('Evento ou usuário não identificado');
}


document.addEventListener('DOMContentLoaded', () => {

  const btnInscrever = document.querySelector('#btn-inscrever');

  if (!btnInscrever) {
    console.error('Botão não encontrado no HTML');
    return;
  }

  btnInscrever.addEventListener('click', () => {
    console.log('BOTÃO CLICADO ✅');
    inscreverNoEvento();
  });

});


async function inscreverNoEvento() {
  try {
    const response = await fetch('http://localhost:3000/inscricoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        usuarioId,
        eventoId
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao se inscrever no evento');
    }

    const data = await response.json();

    alert('Inscrição realizada com sucesso 🎉');
    console.log(data);

  } catch (error) {
    console.error(error.message);
    alert('Você já está inscrito ou ocorreu um erro');
  }
}
