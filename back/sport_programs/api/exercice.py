from flask import request, g, jsonify
from sqlalchemy import outerjoin

from .token import auth
from sport_programs import app, db
from sport_programs.models import *

@app.route("/exercices", methods=["GET"])
@auth
def list_exercices():

    # exercices depend user_id and PUBLIC
    exercices = Exercice.query\
        .join(UserExercice, Exercice.id == UserExercice.exercice_id)\
        .filter((UserExercice.user_id == g.user.id) | (Exercice.visibility == 'PUBLIC'))


    return exercices_schema.jsonify(exercices)
