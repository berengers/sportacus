from sport_programs import db, ma
from datetime import datetime

class Exercise(db.Model):
    __tablename__ = 'exercise'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text, nullable=True)
    visibility = db.Column(db.Text, default='PRIVATE', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    program_step_relation = db.relationship('ProgramStep', backref='exercise', lazy=True, cascade='all, delete-orphan')
