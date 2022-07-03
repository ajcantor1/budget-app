from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from extensions import db
from models.users import Users


auth = Blueprint('auth', __name__)

@auth.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(message='success', access_token=access_token)


@auth.route('/register', methods=['POST'])
def register():

    username = request.json.get("username")
    password = request.json.get("password")  
    user = Users.query.filter_by(username = username).one_or_none()
    if user is not None:
        return jsonify(message='username exist')

    user = Users(username=username)
    user.password = password
    db.session.add(user)
    db.session.commit()
    return jsonify(message='user created')

@auth.route('/login', methods=['POST'])
def login():

    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Users.query.filter_by(username = username).one_or_none()
    if user is not None and user.verify_password(password):
        access_token = create_access_token(identity=username)
        refresh_token = create_refresh_token(identity=username)
        response = jsonify(message='success', access_token=access_token, refresh_token=refresh_token)
        return response, 200
    else:
        return jsonify(message='login failed'), 401

