// const formLogin = document.querySelector("#form-cadastro");
// const representacao = document.querySelector("#resposta");

// formLogin.addEventListener("submit", async (e) => {
//     e.preventDefault(); 
//     const formData = new FormData(formLogin);
//     const dados = Object.fromEntries(formData.entries());

//     try {
//         const response = await fetch("http://127.0.0.1:3000/usuarios", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(dados)
//         });

//         const resultado = await response.json();
        
//         representacao.textContent = resultado.message;
        
//     } catch (error) {
//         erro.textContent = "Erro na conexão com o servidor";
//     }
// });

const form = document.querySelector('#form-cadastro');
const inputImagem = document.querySelector('#imagem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const dadosUsuario = {
    usuario: formData.get('usuario'),
    nome: formData.get('nome'),
    senha: formData.get('senha')
  };

  try {
    // 1️⃣ Criar usuário (SEM imagem)
    const responseUsuario = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosUsuario)
    });

    if (!responseUsuario.ok) {
      throw new Error('Erro ao cadastrar usuário');
    }

    const usuarioCriado = await responseUsuario.json();
    const usuarioId = usuarioCriado.UsuarioModel.id;

    if (inputImagem.files.length > 0) {
      const imagemData = new FormData();
      imagemData.append('imagem', inputImagem.files[0]);

      const responseImagem = await fetch(
        `http://localhost:3000/upload/imagem/usuario/${usuarioId}`,
        {
          method: 'POST',
          body: imagemData
        }
      );

      if (!responseImagem.ok) {
        throw new Error('Erro ao enviar imagem');
      }
    }

    alert('Cadastro realizado com sucesso 🎉');
    window.location.href = 'login.html';

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});
