#extensions.py
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate

migrate = Migrate(app, db)
jwt = JWTManager()
db = SQLAlchemy()
