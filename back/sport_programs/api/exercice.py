from flask import request, g, jsonify
from sqlalchemy import outerjoin
from datetime import datetime

from .token import auth
from sport_programs import app, db
from sport_programs.models import Exercice, User, UserExercice
from sport_programs.schemas import exercice_schema, newExercice_schema, exercices_schema, simple_exercice_schema, simple_exercices_schema

@app.route("/exercices", methods=["GET"])
@auth
def list_exercices():
    exercices = Exercice.query\
        .join(UserExercice, Exercice.id == UserExercice.exercice_id)\
        .filter((UserExercice.user_id == g.user.id) | (Exercice.visibility == 'PUBLIC'))\
        .order_by(Exercice.created_at)

    return simple_exercices_schema.jsonify(exercices)

@app.route("/exercices", methods=["POST"])
@auth
def create_exercice():
    req = exercice_schema.load(request.json, session=db.session)
    dif = newExercice_schema.load(request.json)

    if len(req.errors) > 0:
        return jsonify(req.errors), 400

    user = User.query.filter_by(id = g.user.id).first()
    exercice = req.data

    for k, v in dif.data.items():
        if k == 'name':
            exercice.name = v
        if k == 'image':
            exercice.image = v
        if k == 'visibility':
            exercice.visibility = v

    user.exercices.append(exercice)

    db.session.add(exercice)
    db.session.commit()

    return simple_exercice_schema.jsonify(req.data)


@app.route("/exercices/<id>", methods=["DELETE"])
@auth
def delete_exercice(id):
    exercice = Exercice.query.filter_by(id = id).first()
    user_exercice = UserExercice.query.filter_by(exercice_id = id).first()

    if not exercice or not user_exercice:
        return jsonify({ "error":"this exercice or this user_exercice don't exist" }), 404

    if user_exercice.user_id != g.user.id:
        return jsonify({"error":"You don't have permission to do that"}), 403

    user = User.query.filter_by(id = g.user.id).first()

    user.exercices.remove(exercice)
    db.session.commit()
    db.session.delete(exercice)
    db.session.commit()

    return ""


@app.route("/exercices/<id>", methods=["PUT"])
@auth
def update_exercice(id):
    exercice = Exercice.query.filter_by(id = id).first()
    body = exercice_schema.load(request.json, partial=True, session=db.session)
    user = UserExercice.query.filter_by(exercice_id = id).first()

    if not exercice or not user:
        return jsonify({ "error": "This exercice or user don't exist" }), 404

    if user.user_id != g.user.id:
        return jsonify({ "error": "You don't have permission to do that" }), 403

    if len(body.errors) > 0:
        return jsonify(body.errors), 404

    datas = body.data

    if datas.name:
        exercice.name = datas.name

    if datas.image:
        exercice.image = datas.image

    if datas.visibility:
        exercice.visibility = datas.visibility

    exercice.updated_at = datetime.utcnow()

    db.session.add(exercice)
    db.session.commit()

    return simple_exercice_schema.jsonify(exercice)
