from sport_programs import db, ma

from .user import *
from .exercise import *

class UserExercise(db.Model):
    __tablename__ = 'user_exercise'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), primary_key=True)

    exercise = db.relationship("Exercise", backref="exercise_associations", single_parent=True, cascade='all, delete-orphan')
    user = db.relationship("User", backref="user_exercises_associations")
