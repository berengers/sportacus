from sport_programs import db, ma
from datetime import datetime

from .exercice import *
from .user_exercice import *
from .program import *
from .user_program import *

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    mail = db.Column(db.Text, unique=True, nullable=False)
    username = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    exercice_relation = db.relationship('Exercice', secondary=user_exercice_join, lazy='subquery', backref=db.backref('User', lazy=True))
    program_relation = db.relationship('Program', secondary=user_program_join, lazy='subquery', backref=db.backref('User', lazy=True))


class UserShema(ma.ModelSchema):
    class Meta:
        model = User

user_schema = UserShema()
users_schema = UserShema(many=True)
