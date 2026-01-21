import { authFetch } from "./auth.js";

const res = await authFetch("/verificar");

if (res.status !== 200) {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
}

//   if (!token) {
//     window.location.href = "/templates/login.html";
//   }