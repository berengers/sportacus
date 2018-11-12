from sport_programs import db, ma
from datetime import datetime

class Program(db.Model):
    __tablename__ = 'program'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    visibility = db.Column(db.Text, default='PRIVATE', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    steps = db.relationship('Step', backref='program', lazy=True, cascade='all, delete-orphan')
