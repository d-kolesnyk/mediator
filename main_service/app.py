import os
import datetime
from flask import Flask, render_template, Response, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)

app = Flask(__name__, static_folder="./gui/build/static", template_folder="./gui/build")
# app.config['MONGO_URI'] = "mongodb://mongodb:27017/myDatabase"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:example@postgresdb:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = os.urandom(24)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
app.config['SESSION_TYPE'] = 'filesystem'
jwt = JWTManager(app)
flask_bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

def database_is_empty():
    #engine = create_engine('postgresql://postgres:example@postgresdb:5432/main_app', convert_unicode=True)
    table_names = SQLAlchemy.inspect(db.engine).get_table_names()
    is_empty = table_names == []
    print('Db is empty: {}'.format(is_empty))
    return is_empty

# Create our database model
class User(db.Model):
    __tablename__ = "main_users"
    #id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(120), unique=True, primary_key=True)
    user_pass = db.Column(db.String(1024))

    def __init__(self, user_name, user_pass):
        self.user_name = user_name
        self.user_pass = user_pass

    def __repr__(self):
        return '<User name: {},User pass: {}>'.format(self.user_name, self.user_pass)


if database_is_empty:
    db.create_all()


@app.route('/users/add_new', methods=['POST'])
def add_new_user():

    data = request.get_json()


    # TODO
    if data['system_box_code'] == '12':
        hash_pswd = flask_bcrypt.generate_password_hash(data['password']).decode('utf-8')

        reg = User(data['username'], hash_pswd)
        db.session.add(reg)
        db.session.commit()

        #mongo.db.users.insert_one({'username': data['username'], 'password': hash_pswd})
        return jsonify({'ok': True, 'data': data}), 200
    else:
        return jsonify({'ok': False, 'message': 'invalid system_box_code'}), 401


@app.route('/users/authenticate', methods=['POST'])
def auth_user():
    ''' auth endpoint '''

    data = request.get_json()

    # user = mongo.db.users.find_one({'username': data['username']}, {"_id": 0})
    user = User.query.get(data['username'])

    if user and flask_bcrypt.check_password_hash(user.user_pass, data['password'].encode('utf-8')):
        #del user['password']
        access_token = create_access_token(identity=data)
        refresh_token = create_refresh_token(identity=data)
        data['token'] = access_token
        data['refresh'] = refresh_token
        return jsonify({'ok': True, 'data': data}), 200
    else:
        return jsonify({'ok': False, 'message': 'invalid username or password'}), 401



@app.route("/")
def index():
    return render_template('index.html')