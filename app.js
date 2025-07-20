const { createApp } = Vue;

createApp({
  data() {
    return {
      income: 0,
      text: '',
      amount: null,
      expenses: []
    };
  },
  computed: {
    totalExpenses() {
      return this.expenses.reduce((sum, t) => sum + t.amount, 0);
    },
    balance() {
      return this.income - this.totalExpenses;
    }
  },
  methods: {
    saveIncome() {
      localStorage.setItem('income', this.income);
    },
    addExpense() {
      if (this.text && this.amount !== null && this.amount > 0) {
        this.expenses.push({ text: this.text, amount: this.amount });
        this.text = '';
        this.amount = null;
        this.saveExpenses();
      }
    },
    deleteExpense(index) {
      this.expenses.splice(index, 1);
      this.saveExpenses();
    },
    saveExpenses() {
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
    },
    loadFromLocal() {
      const savedIncome = localStorage.getItem('income');
      if (savedIncome) this.income = Number(savedIncome);

      const savedExpenses = localStorage.getItem('expenses');
      if (savedExpenses) this.expenses = JSON.parse(savedExpenses);
    }
  },
  watch: {
    income(newVal) {
      localStorage.setItem('income', newVal);
    }
  },
  mounted() {
    this.loadFromLocal();
  }
}).mount('#app');
