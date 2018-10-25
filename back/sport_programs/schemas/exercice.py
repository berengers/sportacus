from sport_programs import ma
from datetime import datetime
from marshmallow import Schema, fields

from sport_programs.models import Exercice

class ExerciceSchema(ma.ModelSchema):
    class Meta:
        model = Exercice
    visibility = fields.String(validate=lambda v: v == "PUBLIC" or v == 'PRIVATE')

exercice_schema = ExerciceSchema()
exercices_schema = ExerciceSchema(many=True)

class GetExerciceSchema(ma.ModelSchema):
    class Meta:
        model = Exercice
        fields = ('id', 'name', 'image', 'visibility')

simple_exercice_schema = GetExerciceSchema()
simple_exercices_schema = GetExerciceSchema(many=True)

class NewExerciceSchema(Schema):
    name = fields.String(required=True)
    image = fields.String(required=False)
    visibility = fields.String(required=False)

newExercice_schema = NewExerciceSchema()
