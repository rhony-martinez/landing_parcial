document.addEventListener("DOMContentLoaded", () => {
  const formUsuario = document.getElementById("formUsuario");
  if (!formUsuario) return;

  formUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validarFormularioUsuario()) {
      return;
    }

    const nombres = document.getElementById("nombresUsuario").value.trim();
    const apellidos = document.getElementById("apellidosUsuario").value.trim();
    const genero = document.querySelector('input[name="generoUsuario"]:checked').value;
    const edad = document.getElementById("edadUsuario").value;
    const email = document.getElementById("emailUsuario").value.trim();

    const usuario = gestionarUsuarios.registrarUsuario(nombres, apellidos, genero, edad, email);

    console.log("Usuario registrado:", usuario);
    console.log("Total usuarios:", gestionarUsuarios.listarUsuarios());

    mostrarNotificacion(
      `Registro exitoso: ${usuario.nombres} ${usuario.apellidos} | Género: ${usuario.genero} | Edad: ${usuario.edad} | Email: ${usuario.email}`
    );

    formUsuario.reset();
  });
});

