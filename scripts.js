// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// Captura o evento de input para formatar o valor.
amount.oninput = () => {
  // Remove caracteres não numéricos.
let value = amount.value.replace(/\D/g, '')

// Transforma o valor em centavos
value = Number(value) / 100

// Atualiza o valor do input
amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
  // Formata o valor para o padrão Brasileiro R$ (Real).

  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  return value
}

// Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
  // Previne o comportamento padrão do formulário.
  event.preventDefault()

  // Cria um objeto com as informações dos inputs.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  // Chama a função para adicionar um novo item a lista.
  expenseAdd(newExpense)
}

// Adiciona um novo item a lista.
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item(li) na lista(ul).
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o ícone da categoria.
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a informação da despesa.
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")
  
    // Cria o título da despesa.
    const expenseTitle = document.createElement("strong")
    expenseTitle.textContent = newExpense.expense

    // Cria a categoria da despesa.
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona nome e categoria na div das informações das despesas.
    expenseInfo.append(expenseTitle, expenseCategory)

    // Cria o valor da despesa.
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    // Cria o botão para remover a despesa.
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "Remover" )

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Adiciona o item na lista.
    expenseList.append(expenseItem)

    // Atualiza os totais.
    updateTotals()

  }
  catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
  console.log(error)
  }
}

// Atualizar os valores totais.
function updateTotals(){
  try {
    // Recupera todos os items (li) da lista (ul).
    const items = expenseList.children
    
    // Atualiza a quantidade de items da lista.
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
  }`

  // Variável para incrementar o total.
  let total = 0

  // Percorrer os items da lista.
  for(let item = 0; item < items.length; item++){
    const itemAmount = items[item].querySelector('.expense-amount')

    // Remover caracteres não numéricos e substituir a vírgula pelo ponto.
    let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

    // Converte o valor para float.
    value = parseFloat(value)

    // Verifica se é um número válido.
    if(isNaN(value)){
      return alert(
        "Não foi possível calcular o total. O valor não parece ser um número."
      )
    }
    // Incrementar o valor total.
    total += Number(value)
  }

  // Cria a span para adicionar o R$ formatado.
  const symbolBRL = document.createElement("small")
  symbolBRL.textContent = "R$"

  // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
  total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

  // Limpa o conteúdo do elemento.
  expensesTotal.innerHTML = ""

  // Adiciona o símbolo da moeda e o valor total formatado.
  expensesTotal.append(symbolBRL, total)

} 
  catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }
}