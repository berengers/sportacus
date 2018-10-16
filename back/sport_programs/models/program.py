from sport_programs import db, ma
from datetime import datetime

# from .user_program import *
# from .program_step import *

class Program(db.Model):
    __tablename__ = 'program'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    visibility = db.Column(db.Text, default='PRIVATE', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    # users = db.relationship('UserProgram', backref='program', lazy=True)
    # program_steps = db.relationship('ProgramStep', backref='program', lazy=True)
