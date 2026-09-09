class GestionarUsuarios {
  constructor(repoUsuario) {
    this.repoUsuario = repoUsuario;
  }

  registrarUsuario(nombre, apellido, genero, edad, email) {
    const id = this.repoUsuario.siguienteId();
    const usuario = new Usuario(id, nombre, apellido, genero, edad, email);
    this.repoUsuario.agregar(usuario);
    return usuario;
  }

  listarUsuarios() {
    return this.repoUsuario.obtenerTodos();
  }

  buscarUsuario(id) {
    return this.repoUsuario.buscarPorId(id);
  }
}

const gestionarUsuarios = new GestionarUsuarios(usuarioRepo);

