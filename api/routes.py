#api/routes.py
from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.users import Users
from models.expenses import Expenses
from models.allocations import Allocations
from models.allowances import Allowances
from extensions import db
from sqlalchemy import extract
from datetime import date
from dateutil.relativedelta import relativedelta
api = Blueprint('api', __name__)




@api.route('/get_allowance', methods=["GET", "POST"])
@jwt_required()
def get_allowance():

    username = get_jwt_identity()
    user = Users.query.filter_by(username = username).one_or_none()
    print("get_allowance")
    if not user:
        return jsonify(message='failed'), 401    
    else:

        current = date.today()
        allowance = Allowances.query \
            .filter_by(user_id = user.id) \
            .filter(extract('month', Allowances.month) == str(current.month)) \
            .filter(extract('year', Allowances.month) == str(current.year)) \
            .one_or_none()
        print("allowance")
        print(allowance)
        if allowance == None:
            
            allocation = Allocations.query \
                .filter(extract('month', Allocations.month) == current.month) \
                .filter(extract('year', Allocations.month) == current.year) \
                .one_or_none()
            print(f'allocation:{allocation.amount}')
            if allocation != None:
                
                prev_month = current.month-1
                prev_year  = current.year

                if current.month == 1:
                    prev_month = 12
                    prev_year -= 1

                
                prev_allowance = Allowances.query \
                    .filter_by(user_id = user.id) \
                    .filter(extract('month', Allowances.month) == prev_month) \
                    .filter(extract('year', Allowances.month) ==  prev_year) \
                    .one_or_none()
      
                if prev_allowance:
                    expenses = Expenses.query \
                        .filter_by(user_id = user.id) \
                        .filter(extract('month', Expenses.timestamp) == prev_month) \
                        .filter(extract('year', Expenses.timestamp) == prev_year) \
                        .all()

                    total_sum = sum([expense.amount for expense in expenses])
                    amount = allocation.amount+prev_allowance.amount-total_sum

                allowance = Allowances(
                    user_id = user.id, 
                    amount = amount, 
                    month = allocation.month
                )

                db.session.add(allowance)
                db.session.commit() 


                return jsonify(message='success', allowance=float(allowance.amount), expenses=[])
        else:
            expenses = Expenses.query \
                .filter_by(user_id = user.id) \
                .filter(extract('month', Expenses.timestamp) == str(current.month)) \
                .filter(extract('year', Expenses.timestamp) == str(current.year)) \
                .all()
      
            if(len(expenses) > 0):
                expenses_dict = [expense.to_dict() for expense in expenses]
                
                return jsonify(message='success', allowance=float(allowance.amount), expenses=expenses_dict)
            else:
                print(allowance.amount);
                return jsonify(message='success', allowance=float(allowance.amount), expenses=[])





@api.route('/add_expense', methods=["POST"])
@jwt_required()
def add_expense():
    username = get_jwt_identity()
    user = Users.query.filter_by(username = username).one_or_none()
    if not user:
        return jsonify(message='failed'), 401    
    else:
        amount = request.json.get("amount", 0)
        item_name  = request.json.get("item_name", '')
        expense = Expenses(user_id=user.id, amount=amount, item_name=item_name)
        db.session.add(expense)
        db.session.commit()
        return jsonify(message='success', expense = expense.to_dict())


@api.route('/get', methods=["GET", "POST"])
@jwt_required()
def get_expenses():
    username = get_jwt_identity()
    user = Users.query.filter_by(username = username).one_or_none()
    if not user:
        return jsonify(message='failed'), 401    
    else:
        current = date.today()
        expenses = Expenses.query \
            .filter_by(user_id = user.id) \
            .filter(extract('month', Expenses.timestamp) == current.month) \
            .filter(extract('year', Expenses.timestamp) == current.year) \
            .all()
        expenses_dict = [expense.to_dict() for expense in expenses]
        return jsonify(message='success', expenses=expenses_dict)


@api.route('/remove_expense', methods=["POST"])
@jwt_required()
def remove_expense():
    username = get_jwt_identity()
    user = Users.query.filter_by(username = username).one_or_none()
    if not user:
        return jsonify(message='failed'), 401    
    else:
        expense_id = request.json.get("expense_id", None)
        print(expense_id)
        expense = Expenses.query.filter_by(id = expense_id).delete()

        db.session.commit()
        return jsonify(message='success', expense_id=expense_id)






