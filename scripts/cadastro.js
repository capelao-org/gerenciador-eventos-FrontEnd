const formLogin = document.querySelector("#form-cadastro");
const representacao = document.querySelector("#resposta");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const formData = new FormData(formLogin);
    const dados = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://127.0.0.1:3000/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();
        
        representacao.textContent = resultado.message;
        
    } catch (error) {
        erro.textContent = "Erro na conexão com o servidor";
    }
});