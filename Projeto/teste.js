const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
        // fechar o modal
        // remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    }, 
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    }, 
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    }, 
    {
        id: 4,
        description: 'App',
        amount: 20000,
        date: '23/01/2021',
    },
]


// Eu preciso somar as entradas
// depois eu preciso somar as saidas
// remover das entradas o valor das saidas
// asimm, eu terei o total

const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },
    incomes() {
        let income = 0;
        //pegar todas as transaçoe pra cada transação
        Transaction.all.forEach(transaction => {
            // se ela for maior que zero
            if( transection.amount > 0) {
                // somar a variavel e retornar a variavel
                income += transaction.amount;
            }
        })
       return income;
    },
    expenses() {
        let expense = 0;
        //pegar todas as transaçoe pra cada transação
        Transaction.all.forEach(transaction => {
            // se ela for menor que zero
            if( transaction.amount < 0) {
                // subtrair a variavel e retornar a variavel
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

// Eu preciso pegar as minhas transações do meu 
// objeto aqui do JS
// e colocar lá no HTML

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index) {
        const CSS = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `       
        <td class="description">${transaction.description}</td>
        <td class="expense">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        
        `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""

    }

}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) /100

        value = value.toLocalString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const App = {
    init() {

        Transaction.all.forEach(transaction => {    
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
        
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    },

}

App.init()

Transaction.add({
    id: 39,
    description: 'Alo',
    amount: 200,
    date: '23/01/2021'
})
