const params = new URLSearchParams(window.location.search);
const id_evento = params.get("id");

const chatForm = document.getElementById("chatForm");
const input = document.getElementById("msgInput");
const messagesBox = document.getElementById("messages");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const pergunta = input.value.trim();
  if (pergunta === "") return;

  // Mensagem do usuário
  messagesBox.innerHTML += `
    <div class="msg-row msg-user">
      <div class="msg-bubble">${pergunta}</div>
    </div>
  `;

  input.value = "";
  messagesBox.scrollTop = messagesBox.scrollHeight;

  try {
    const response = await fetch(`http://localhost:3000/chatbot/${id_evento}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pergunta })
    });

    const data = await response.json();

    // Resposta do bot
    messagesBox.innerHTML += `
      <div class="msg-row msg-bot">
        <div class="msg-bubble">${data.resposta}</div>
      </div>
    `;

  } catch (error) {
    messagesBox.innerHTML += `
      <div class="msg-row msg-bot">
        <div class="msg-bubble text-danger">
          Erro ao conectar com o servidor.
        </div>
      </div>
    `;
  }

  messagesBox.scrollTop = messagesBox.scrollHeight;
});
