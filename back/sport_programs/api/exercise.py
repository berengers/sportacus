from flask import request, g, jsonify
from sqlalchemy import outerjoin
from datetime import datetime

from .token import auth
from sport_programs import app, db
from sport_programs.models import Exercise, User, UserExercise
from sport_programs.schemas import exercise_schema, newExercise_schema, exercises_schema, simple_exercise_schema, simple_exercises_schema

@app.route("/exercises", methods=["GET"])
@auth
def list_exercises():
    exercises = Exercise.query\
        .join(UserExercise, Exercise.id == UserExercise.exercise_id)\
        .filter((UserExercise.user_id == g.user.id) | (Exercise.visibility == 'PUBLIC'))\
        .order_by(Exercise.created_at)

    return simple_exercises_schema.jsonify(exercises)

@app.route("/exercises/<id>", methods=["GET"])
@auth
def get_exercise(id):
    exercise = Exercise.query.filter_by(id=id).first()

    if not exercise:
        return jsonify({ "error": "Don't exercise with this id" }), 404

    return simple_exercise_schema.jsonify(exercise)

@app.route("/exercises", methods=["POST"])
@auth
def create_exercise():
    req = exercise_schema.load(request.json, session=db.session)
    dif = newExercise_schema.load(request.json)

    if len(req.errors) > 0:
        return jsonify(req.errors), 400

    user = User.query.filter_by(id = g.user.id).first()
    exercise = req.data

    user.exercises.append(exercise)

    db.session.add(exercise)
    db.session.commit()

    return simple_exercise_schema.jsonify(req.data)


@app.route("/exercises/<id>", methods=["DELETE"])
@auth
def delete_exercise(id):
    exercise = Exercise.query.filter_by(id = id).first()
    user_exercise = UserExercise.query.filter_by(exercise_id = id).first()

    if not exercise or not user_exercise:
        return jsonify({ "error":"this exercise or this user_exercise don't exist" }), 404

    if user_exercise.user_id != g.user.id:
        return jsonify({"error":"You don't have permission to do that"}), 403

    user = User.query.filter_by(id = g.user.id).first()

    user.exercises.remove(exercise)
    db.session.commit()
    db.session.delete(exercise)
    db.session.commit()

    return ""


@app.route("/exercises/<id>", methods=["PUT"])
@auth
def update_exercise(id):
    exercise = Exercise.query.filter_by(id = id).first()
    body = exercise_schema.load(request.json, partial=True, session=db.session)
    user = UserExercise.query.filter_by(exercise_id = id).first()

    if not exercise or not user:
        return jsonify({ "error": "This exercise or user don't exist" }), 404

    if user.user_id != g.user.id:
        return jsonify({ "error": "You don't have permission to do that" }), 403

    if len(body.errors) > 0:
        return jsonify(body.errors), 404

    datas = body.data

    if datas.name:
        exercise.name = datas.name

    if datas.image:
        exercise.image = datas.image

    if datas.visibility:
        exercise.visibility = datas.visibility

    exercise.updated_at = datetime.utcnow()

    db.session.add(exercise)
    db.session.commit()

    return simple_exercise_schema.jsonify(exercise)
