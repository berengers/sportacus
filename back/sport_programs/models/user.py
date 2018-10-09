from sport_programs import db, ma
from datetime import datetime

from .token import *
from .user_program import *
from .user_exercice import *

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    mail = db.Column(db.Text, unique=True, nullable=False)
    username = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    token_relation = db.relationship('Token', backref='user', lazy=True)
    program_relation = db.relationship('UserProgram', backref='user', lazy=True)
    exercice_relation = db.relationship('UserExercice', backref='user', lazy=True)


class UserShema(ma.ModelSchema):
    class Meta:
        model = User

user_schema = UserShema()
users_schema = UserShema(many=True)
