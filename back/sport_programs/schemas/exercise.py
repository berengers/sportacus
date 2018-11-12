from sport_programs import ma
from datetime import datetime
from marshmallow import Schema, fields

from sport_programs.models import Exercise

class ExerciseSchema(ma.ModelSchema):
    class Meta:
        model = Exercise
    visibility = fields.String(validate=lambda v: v == "PUBLIC" or v == 'PRIVATE')

exercise_schema = ExerciseSchema()
exercises_schema = ExerciseSchema(many=True)

class GetExerciseSchema(ma.ModelSchema):
    class Meta:
        model = Exercise
        fields = ('id', 'name', 'image', 'visibility')

simple_exercise_schema = GetExerciseSchema()
simple_exercises_schema = GetExerciseSchema(many=True)

class NewExerciseSchema(Schema):
    name = fields.String(required=True)
    image = fields.String(required=False)
    visibility = fields.String(required=False)

newExercise_schema = NewExerciseSchema()
