from sport_programs import db, ma
from marshmallow import fields

from sport_programs.models import ProgramStep
from .exercise import ExerciseSchema
from .program import ProgramSchema

class ProgramStepSchema(ma.ModelSchema):
    class Meta:
        model = ProgramStep
        include_fk = True
    program_id = fields.String(required=False)

program_step_schema = ProgramStepSchema()
program_steps_schema = ProgramStepSchema(many=True)

class SimpleProgramStepSchema(ma.ModelSchema):
    class Meta:
        model = ProgramStep
        fields = ('id', 'series', 'repetitions', 'weight', 'rest_duration_between_series', 'rest_end_duration', 'position', 'exercise')
    exercise = fields.Nested(ExerciseSchema, many=False, only=('id', 'name', 'image'))

simple_program_step_schema = SimpleProgramStepSchema()
simple_program_steps_schema = SimpleProgramStepSchema(many=True)

class ProgramStepUserSchema(ma.ModelSchema):
    class Meta:
        model = ProgramStep

    program = fields.Nested(ProgramSchema, many=False, only=('id',))

program_step_user_schema = ProgramStepUserSchema()
