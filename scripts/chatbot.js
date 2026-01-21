const params = new URLSearchParams(window.location.search);
const id_evento = params.get("id")

async function enviarMensagem() {
  const input = document.getElementById("mensagem");
  const chatBox = document.getElementById("chat-box");
  const pergunta = input.value.trim();


  if (pergunta === "") return;

  // Mostra a pergunta do usuário
  chatBox.innerHTML += `<p><strong>Você:</strong> ${pergunta}</p>`;

  fetch(`http://localhost:3000/chatbot/${id_evento}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pergunta })
  })
  .then(res => res.json())
  .then(data => {
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.resposta}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  })
  .catch(() => {
    chatBox.innerHTML += `<p><strong>Bot:</strong> Erro ao conectar com o servidor.</p>`;
  });

  input.value = "";
}
