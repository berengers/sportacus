from flask import request, g, jsonify
from sqlalchemy import outerjoin

from .token import auth
from sport_programs import app, db
from sport_programs.models import Exercice, User, UserExercice
from sport_programs.schemas import exercice_schema, newExercice_schema, exercices_schema

@app.route("/exercices", methods=["GET"])
@auth
def list_exercices():
    exercices = Exercice.query\
        .join(UserExercice, Exercice.id == UserExercice.exercice_id)\
        .filter((UserExercice.user_id == g.user.id) | (Exercice.visibility == 'PUBLIC'))\
        .order_by(Exercice.created_at)

    return exercices_schema.jsonify(exercices)

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

    return exercice_schema.jsonify(req.data)
