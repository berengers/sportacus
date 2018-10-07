from sport_programs import db, ma
from datetime import datetime


class Exercice(db.Model):
    __tablename__ = 'exercice'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text)
    visibility = db.Column(db.Text, default='PRIVATE', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)

class ExerciceSchema(ma.ModelSchema):
    class Meta:
        model = Exercice

exercice_schema = ExerciceSchema()
exercices_schema = ExerciceSchema(many=True)
