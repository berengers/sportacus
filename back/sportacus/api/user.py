from flask import request, g, jsonify

from sportacus import app, db
from .token import auth
from sportacus.models import User, UserProgram, Program, UserExercise
from sportacus.schemas import user_schema, validate_user_schema, user_update_schema
from .tools import error

@app.route("/api/user", methods=["GET"])
@auth
def list_users():
    user = User.query.filter_by(id = g.user.id).first()

    return user_schema.jsonify(user)

@app.route("/api/user", methods=["POST"])
def create_user():
    user = validate_user_schema.load(request.json, session=db.session)

    if len(user.errors) > 0 :
        return jsonify(user.errors), 404

    user_exist = User.query.filter((User.email == user.data.email) | (User.username == user.data.username)).first()

    if user_exist:
        return error("User already exist"), 403

    db.session.add(user.data)
    db.session.commit()

    return user_schema.jsonify(user.data)

@app.route("/api/user", methods=["DELETE"])
@auth
def delete_user():
    id = g.user.id
    user = User.query.filter_by(id = id).first()
    programss = UserProgram.query.filter_by(user_id = id).all()
    exercisess = UserExercise.query.filter_by(user_id = id).all()


    for exercise in exercisess:
        db.session.delete(exercise)

    for program in programss:
        db.session.delete(program)

    db.session.delete(user)
    db.session.commit()

    return ""


@app.route("/api/user/password", methods=["PUT"])
@auth
def update_password():
    user = User.query.filter_by(id = g.user.id).first()
    req = user_update_schema.load(request.json)
    print ("req ---------------> ", req)

    if len(req.errors) > 0:
        return jsonify(req.errors)

    if user.password != req.data['password']:
        return error("Wrong password")

    user.password = req.data['new_password']

    db.session.add(user)
    db.session.commit()

    return ""
