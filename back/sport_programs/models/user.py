from sport_programs import db, ma
from datetime import datetime

from sport_programs.models import *

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    token_relation = db.relationship('Token', backref='user', cascade='all, delete-orphan')
    programs = db.relationship('Program', secondary='user_program')
    exercices = db.relationship('Exercice', secondary='user_exercice')
