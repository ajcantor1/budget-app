from extensions import db

class Allowances(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    amount = db.Column(db.Numeric(3,2), nullable=False)
    month = db.Column(db.Date())
