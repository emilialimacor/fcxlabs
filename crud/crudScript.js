const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#nome')

const sLogin = document.querySelector('#login')

const sSenha = document.querySelector('#senha')

const sEmail = document.querySelector('#email')

const sTelefone = document.querySelector('#telefone')

const sCpf = document.querySelector('#cpf')

const sNascimento = document.querySelector('#nascimento')

const sMae = document.querySelector('#mae')

const sStatus = document.querySelector('#status')

const sInclusao = document.querySelector('#inclusao')

const sAlteracao = document.querySelector('#alteracao')

const btn = document.querySelector('#btn')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sLogin.value = itens[index].login
    sSenha.value = itens[index].senha
    sEmail.value = itens[index].email
    sTelefone.value = itens[index].telefone
    sCpf.value = itens[index].cpf
    sNascimento.value = itens[index].nascimento
    sMae.value = itens[index].mae
    sStatus.value = itens[index].status
    sInclusao.value = itens[index].inclusao
    sAlteracao.value = itens[index].alteracao
    id = index
  } else {
    sNome.value = ''
    sLogin.value = ''
    sSenha.value = ''
    sEmail.value = ''
    sTelefone.value = ''
    sCpf.value = ''
    sNascimento.value = ''
    sMae.value = ''
    sStatus.value = ''
    sInclusao.value = ''
    sAlteracao.value = ''
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
  <td>${item.nome}</td>
  <td>${item.login}</td>
  <td>${item.senha}</td>
  <td>${item.email}</td>
  <td>${item.telefone}</td>
  <td>${item.cpf}</td>
  <td>${item.nascimento}</td>
  <td>${item.mae}</td>
  <td>${item.status}</td>
  <td>${item.inclusao}</td>
  <td>${item.alteracao}</td>
  <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btn.onclick = e => {
  if (
    sNome.value == '' ||
    sLogin.value == '' ||
    sSenha.value == '' ||
    sEmail.value == '' ||
    sTelefone.value == '' ||
    sCpf.value == '' ||
    sNascimento.value == '' ||
    sMae.value == '' ||
    sStatus.value == '' ||
    sInclusao.value == '' ||
    sAlteracao.value == ''
  ) {
    return
  }

  e.preventDefault()

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].login = sLogin.value
    itens[id].senha = sSenha.value
    itens[id].email = sEmail.value
    itens[id].telefone = sTelefone.value
    itens[id].cpf = sCpf.value
    itens[id].nascimento = sNascimento.value
    itens[id].mae = sMae.value
    itens[id].status = sStatus.value
    itens[id].inclusao = sInclusao.value
    itens[id].alteracao = sAlteracao.value
  } else {
    itens.push({
      nome: sNome.value,
      login: sLogin.value,
      senha: sSenha.value,
      email: sEmail.value,
      telefone: sTelefone.value,
      cpf: sCpf.value,
      nascimento: sNascimento.value,
      mae: sMae.value,
      status: sStatus.value,
      inclusao: sInclusao.value,
      alteracao: sAlteracao.value
    })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
