import axios from "axios"


export default function ExpensesTable (props) {

    const {expenses, getCategoryName, handleExpenseRemoveComponent} = props

    const urlExp = `http://localhost:3010/api/expenses`

    const handleExpenseRemove = (expense) => {
        const urlExpId = `${urlExp}/${expense._id}`
        axios.delete(urlExpId)
        .then(response => {
        handleExpenseRemoveComponent(response.data)
        })
        .catch(error=>console.log(error))
    }

    return (
        <div>
            <h2>Expenses</h2>
            <br/>
            <table border="1">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>  
                </thead>
                <tbody>
                {expenses.map((expense, i) => (
                    <tr key={i}>
                    <td>{expense.description}</td>
                    <td>{expense.expenseDate}</td>
                    <td>{expense.title}</td>
                    <td>{expense.amount}</td>
                    <td>{getCategoryName(expense)}</td>
                    <td><button onClick={() => {handleExpenseRemove(expense)}}>remove expense </button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}