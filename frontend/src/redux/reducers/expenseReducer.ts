interface Expense {
  id: number;
  description: string;
  amount: number;
}

interface ExpenseState {
  expenses: Expense[];
}

interface Action {
  type: string;
  payload: any;
}

const initialState: ExpenseState = {
  expenses: [],
};

function expenseReducer(state = initialState, action: Action): ExpenseState {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    default:
      return state;
  }
}

export default expenseReducer;
