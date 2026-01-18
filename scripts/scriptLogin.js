const formLogin = document.querySelector(".form-login");
const erro = document.querySelector("#erro");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const formData = new FormData(formLogin);
    const dados = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (resultado.token) {
            localStorage.setItem("token", resultado.token);
            window.location.href = "home.html";
        } else {
            erro.textContent = resultado.error;
        }
    } catch (error) {
        erro.textContent = "Erro na conexão com o servidor";
    }
});