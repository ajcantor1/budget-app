from extensions import db
from datetime import datetime
class Expenses(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    amount = db.Column(db.Numeric(3,2), nullable=False)
    item_name = db.Column(db.String(1024))
    timestamp = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'amount': float(self.amount), 'item_name': self.item_name }
