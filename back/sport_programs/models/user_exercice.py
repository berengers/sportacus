from sport_programs import db, ma

from .user import *
from .exercice import *

class UserExercice(db.Model):
    __tablename__ = 'user_exercice'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    exercice_id = db.Column(db.Integer, db.ForeignKey('exercice.id'), nullable=False)

    exercice = db.relationship("Exercice", backref="exercice_associations")
    user = db.relationship("User", backref="user_exercices_associations")
