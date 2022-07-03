from extensions import db

class Allocations(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    amount = db.Column(db.Numeric(3,2), nullable=False)
    month = db.Column(db.Date())
