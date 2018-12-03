from flask import request, g, jsonify
import uuid

from sport_programs import app, db
from sport_programs.models import *
from .tools import error

def auth(fn):
    def f(**kwargs):
        t_string = request.headers.get("X-Authenticate", "")
        print ("t_string ---------------> ", t_string)
        t = Token.query.filter(Token.token == t_string).first()

        if not t:
            return error('Bad Authenticate - Maybe wrong token'), 401

        g.user = t.user
        return fn(**kwargs)

    f.__name__ = fn.__name__

    return f

@app.route("/api/login", methods=["POST"])
def log_user():
    datas = request.json
    user = User.query.filter_by(email = datas['email']).first()

    if not user or user.password != datas['password']:
        return error("Email don't exist or wrong password"), 401

    newToken = uuid.uuid4()

    token = Token(
        user_id = user.id,
        token = newToken
    )

    db.session.add(token)
    db.session.commit()

    return jsonify(newToken)


@app.route("/api/logout", methods=["DELETE"])
@auth
def logout_user():
    token = Token.query.filter(Token.user_id == g.user.id).first()
    db.session.delete(token)
    db.session.commit()
    return ''
