from sport_programs import db, ma
from marshmallow import fields

from sport_programs.models import ProgramStep
from .exercice import ExerciceSchema
from .program import ProgramSchema

class ProgramStepSchema(ma.ModelSchema):
    class Meta:
        model = ProgramStep
        include_fk = True

    exercice = fields.Nested(ExerciceSchema, many=False, only=('id', 'name'))

program_step_schema = ProgramStepSchema()
program_steps_schema = ProgramStepSchema(many=True)

class ProgramStepUserSchema(ma.ModelSchema):
    class Meta:
        model = ProgramStep

    program = fields.Nested(ProgramSchema, many=False, only=('id',))

program_step_user_schema = ProgramStepUserSchema()
