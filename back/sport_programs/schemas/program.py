from sport_programs import db, ma
from datetime import datetime
from marshmallow import fields

from sport_programs.models import Program, Step
from .step import SimpleStepschema, ProgramStepsSchema

class ProgramSchema(ma.ModelSchema):
    class Meta:
        model = Program
        dump_only = ('id', 'created_at', 'updated_at', 'steps', 'visibility')
    # visibility = fields.String(validate = lambda v: v == 'PRIVATE' or v == 'PUBLIC')

program_schema = ProgramSchema()
programs_schema = ProgramSchema(many=True)

class SimpleProgramSchema(ma.ModelSchema):
    class Meta:
        model = Program
        fields = ('id', 'name', 'visibility')

simple_program_schema = SimpleProgramSchema()
simple_programs_schema = SimpleProgramSchema(many=True)

class GetProgramNested(ma.ModelSchema):
    class Meta:
        model = Program
        fields = ('id', 'name', 'visibility', 'steps')
    steps = fields.Nested(SimpleStepschema, many=True)

get_program_nested_schema = GetProgramNested()

class ProgramNested(ma.ModelSchema):
    class Meta:
        model = Program
        fields = ('name', 'visibility', 'steps')
    visibility = fields.String(required=True, validate = lambda v: v == 'PRIVATE')
    steps = fields.Nested(ProgramStepsSchema, many=True)

program_nested_schema = ProgramNested()

# class ProgramNested2(ma.ModelSchema):
#     class Meta:
#         model = Program
#         fields = ('id', 'name', 'visibility', 'steps')
#     visibility = fields.String(required=True, validate = lambda v: v == 'PRIVATE')
#     steps = fields.Nested(ProgramStepschema, many=True)
#
# program_nested_schema2 = ProgramNested2()
