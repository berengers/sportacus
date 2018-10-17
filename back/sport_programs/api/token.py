from flask import request, g, jsonify
import uuid

from sport_programs import app, db
from sport_programs.models import *

def auth(fn):
    def f(**kwargs):
        t_string = request.headers.get("X-Authenticate", "")
        t = Token.query.filter(Token.token == t_string).first()

        if not t:
            return jsonify({"error":'Bad Authenticate - Maybe wrong token'}), 401

        g.user = t.user
        return fn(**kwargs)

    f.__name__ = fn.__name__

    return f

@app.route("/login", methods=["POST"])
def log_user():
    datas = request.json
    user = User.query.filter_by(email = datas['email']).first()

    if not user:
        return "Email don't exist", 401

    if user.password != datas['password']:
        return 'Wrong password', 401

    newToken = uuid.uuid4()

    token = Token(
        user_id = user.id,
        token = newToken
    )

    db.session.add(token)
    db.session.commit()
    return jsonify(newToken)


@app.route("/logout", methods=["DELETE"])
@auth
def logout_user():
    token = Token.query.filter(Token.user_id == g.user.id).first()
    db.session.delete(token)
    db.session.commit()
    return 'Token deleted'
