// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")

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

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo)
    // Adiciona o item na lista.
    expenseList.append(expenseItem)
  }
  catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
  console.log(error)
  }
}
