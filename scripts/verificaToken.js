async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`
    }
  });

  return response;
}


(async () => {
  const res = await authFetch("http://localhost:3000/verificar");

  if (res.status !== 200) {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
  }
})();


//   if (!token) {
//     window.location.href = "/templates/login.html";
//   }