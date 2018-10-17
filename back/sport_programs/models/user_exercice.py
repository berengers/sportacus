from sport_programs import db, ma

from .user import *
from .exercice import *

class UserExercice(db.Model):
    __tablename__ = 'user_exercice'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    exercice_id = db.Column(db.Integer, db.ForeignKey('exercice.id'), primary_key=True)

    exercice = db.relationship("Exercice", backref="exercice_associations", single_parent=True, cascade='all, delete-orphan')
    user = db.relationship("User", backref="user_exercices_associations")
