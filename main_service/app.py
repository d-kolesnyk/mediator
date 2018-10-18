import os
import datetime
from flask import Flask, render_template, Response, redirect, url_for, request, jsonify
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)

app = Flask(__name__, static_folder="./gui/build/static", template_folder="./gui/build")
#app.config['MONGO_URI'] = os.environ.get('DB')
app.config['JWT_SECRET_KEY'] = os.urandom(24)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
app.config['SESSION_TYPE'] = 'filesystem'
jwt = JWTManager(app)

@app.route('/users/authenticate', methods=['POST'])
def auth_user():
    ''' auth endpoint '''

    #import pdb; pdb.set_trace()
    data = request.get_json()

    user = 'test'
    # if user and flask_bcrypt.check_password_hash(user['password'], data['password']):
    if True:
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