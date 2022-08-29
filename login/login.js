function entrar() {
  var usuario = document.getElementById('usuario').value
  var senha = document.getElementById('senha').value
  if (usuario == 'usuario' && senha == 'senha') {
    location.href = 'crud.html'
  } else {
    alert('Usuário ou senha incorretos')
  }
}
