// import logo from './logo.svg';
import './App.css';
import axios from "axios"
import {useState} from "react"
import CategoryForm from './CategoryForm';
import CategoriesList from './CategoriesList';
import ExpensesTable from './ExpensesTable';
import ExpenseForm from './ExpenseForm';

export default function App () {
  // state vars related to cat
  // state vars related to exp
  const [categories, setCategories] = useState([])
  const [expenses, setExpenses] = useState([])
  
  const urlCat = `http://localhost:3010/api/categories`
  const urlExp = `http://localhost:3010/api/expenses`
  
  const handleCategoriesListClick = () => {
    axios.get(urlCat)
    .then(response => {
      const data = response.data
      setCategories(data)
    })
    .catch(error=>{
      console.log(error)
    })
  }

 const handleAddCategory = (category) => {
    setCategories([...categories, category])
  }

  const getCategoryName = (expense) => {
    const category = categories.find((cat) => {
        return cat._id === expense.category 
    })
    if(category) {
        return category.name 
    } else {
        return 'N/A'
    }
  }

  const handleCategoryRemoveComponent = (category) => {
    setCategories(categories.filter(cat => cat._id !== category._id))
  }

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense])
  }

  const handleExpensesTableClick = () => {
    axios.get(urlExp)
    .then(response => {
      setExpenses(response.data)
    })
    .catch(error => console.log(error))
  }

  const handleExpenseRemoveComponent = (expense) => {
    setExpenses(expenses.filter(item => item._id !== expense._id))
  }

  return (
    <div>
      <h1> Expense App </h1>
      <h2> Categories </h2>
      <h3> Listing Categories - {categories.length} </h3>
      <button onClick={handleCategoriesListClick}>Get Categories</button>

      <CategoriesList categories={categories} handleCategoryRemoveComponent={handleCategoryRemoveComponent}/>
      
      <h3> Add Category </h3>
      
      <CategoryForm handleAddCategory={handleAddCategory}/>

      <button onClick={handleExpensesTableClick}>Fetch Expenses</button>

      <ExpensesTable expenses={expenses} handleExpenseRemoveComponent={handleExpenseRemoveComponent} getCategoryName={getCategoryName} />
      
      <ExpenseForm handleAddExpense={handleAddExpense}  categories={categories}/>

    </div>
  )
}

