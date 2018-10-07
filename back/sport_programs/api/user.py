from flask import request, g, jsonify

from sport_programs import app, db
from sport_programs.models import *

@app.route("/users", methods=["GET"])
def list_users():
    users = User.query.all()
    return users_schema.jsonify(users)
