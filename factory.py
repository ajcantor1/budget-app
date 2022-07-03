from flask import Flask
import os
from dotenv import load_dotenv
from datetime import timedelta
from api.routes import api
from auth.routes import auth
from extensions import jwt, db


def createApp():
    load_dotenv()

    app = Flask(__name__, template_folder='templates', static_folder='static')

    app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET')   
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    dbName = os.getenv('DB_NAME')

    app.config["SQLALCHEMY_DATABASE_URI"] = 'postgres://vgwifshpalzzid:877ad5af646dbb085df34192c4990126c5d0a8a12a2458acca87dbfc485325bc@ec2-44-206-11-200.compute-1.amazonaws.com:5432/d2clpbpfggs58g'
    
    
    db.init_app(app)
    jwt.init_app(app)

    migrate = Migrate(app, db)

    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(api, url_prefix='/api')

    return app