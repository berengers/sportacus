from sport_programs import db, ma
from marshmallow import fields, Schema

from sport_programs.models import Step
from .exercise import ExerciseSchema
# from .program import ProgramSchema

class Stepschema(ma.ModelSchema):
    class Meta:
        model = Step
        include_fk = True
    series = fields.Integer(required=True)
    repetitions = fields.Integer(required=True)
    weight = fields.Integer(required=True)
    rest_duration_between_series = fields.Integer(required=True)
    rest_end_duration = fields.Integer(required=True)
    position = fields.Integer(required=False)

step_schema = Stepschema()
steps_schema = Stepschema(many=True)

class SimpleStepschema(ma.ModelSchema):
    class Meta:
        model = Step
        fields = ('id', 'series', 'repetitions', 'weight', 'rest_duration_between_series', 'rest_end_duration', 'position', 'exercise')
    exercise = fields.Nested(ExerciseSchema, many=False, only=('id', 'name', 'image'))

simple_step_schema = SimpleStepschema()
simple_steps_schema = SimpleStepschema(many=True)
