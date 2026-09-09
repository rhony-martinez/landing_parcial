class UsuarioRepository {
  constructor() {
    this.usuarios = [];
  }

  agregar(usuario) {
    this.usuarios.push(usuario);
  }

  obtenerTodos() {
    return this.usuarios;
  }

  buscarPorId(id) {
    return this.pacientes.find(u => u.id === id);
  }

  siguienteId() {
    return this.usuarios.length + 1;
  }
}


const usuarioRepo = new UsuarioRepository();