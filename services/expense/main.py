# services/expense/main.py
from fastapi import FastAPI

app = FastAPI()

@app.post("/expenses")
async def add_expense(expense: dict):
    # Implement expense addition logic
    return {"message": "Expense added"}

@app.get("/expenses")
async def get_expenses():
    # Implement retrieval of expenses
    return {"expenses": []}
