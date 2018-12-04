from sportacus import db, ma
from marshmallow import fields, Schema

from sportacus.models import Step
from .exercise import ExerciseSchema, GetExerciseSchema
# from .program import ProgramSchema

class Stepschema(ma.ModelSchema):
    class Meta:
        model = Step
        include_fk = True
    series = fields.Integer(required=True, validate=lambda n: n > 0)
    repetitions = fields.Integer(required=True, validate=lambda n: n >= 0)
    weight = fields.Integer(required=True, validate=lambda n: n >= 0)
    rest = fields.Integer(required=True, validate=lambda n: n >= 0)
    rest_end = fields.Integer(required=True, validate=lambda n: n >= 0)
    position = fields.Integer(required=False, validate=lambda n: n >= 0)

step_schema = Stepschema()
steps_schema = Stepschema(many=True)

class PostStepSchema(ma.ModelSchema):
    class Meta:
        model = Step

post_step_schema = Stepschema

class SimpleStepschema(ma.ModelSchema):
    class Meta:
        model = Step
        fields = ('id', 'series', 'repetitions', 'weight', 'rest', 'rest_end', 'position', 'exercise')
    exercise = fields.Nested(ExerciseSchema, many=False, only=('id', 'name', 'image'))

simple_step_schema = SimpleStepschema()
simple_steps_schema = SimpleStepschema(many=True)

class ProgramStepsSchema(ma.ModelSchema):
    class Meta:
        model = Step
    id = fields.Integer(required=True)
    series = fields.Integer(required=True, validate=lambda n: n >= 1)
    repetitions = fields.Integer(required=True, validate=lambda n: n >= 0)
    weight = fields.Integer(required=True, validate=lambda n: n >= 0)
    rest = fields.Integer(required=True, validate=lambda n: n >= 0)
    rest_end = fields.Integer(required=True, validate=lambda n: n >= 0)
    position = fields.Integer(required=True, validate=lambda n: n >= 0)
    exercise = fields.Nested(GetExerciseSchema, many=False, only=('id',))
