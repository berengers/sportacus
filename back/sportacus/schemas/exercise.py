from sportacus import ma
from datetime import datetime
from marshmallow import Schema, fields

from sportacus.models import Exercise

class ExerciseSchema(ma.ModelSchema):
    class Meta:
        model = Exercise
        dump_only = ('id', 'visibility')
    # visibility = fields.String(validate=lambda v: v == "PUBLIC" or v == 'PRIVATE')

exercise_schema = ExerciseSchema()
exercises_schema = ExerciseSchema(many=True)

class GetExerciseSchema(ma.ModelSchema):
    class Meta:
        model = Exercise
        fields = ('id', 'name', 'image', 'description', 'visibility')

simple_exercise_schema = GetExerciseSchema()
simple_exercises_schema = GetExerciseSchema(many=True)

class NewExerciseSchema(Schema):
    name = fields.String(required=True)
    image = fields.String(required=False)
    description = fields.String(required=False)
    visibility = fields.String(required=False)

newExercise_schema = NewExerciseSchema()
