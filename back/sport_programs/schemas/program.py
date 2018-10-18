from sport_programs import db, ma
from datetime import datetime
from marshmallow import fields

from sport_programs.models import Program

class ProgramSchema(ma.ModelSchema):
    class Meta:
        model = Program
        dump_only = ('id', 'created_at', 'updated_at', 'program_steps')
    visibility = fields.String(validate = lambda v: v == 'PRIVATE' or v == 'PUBLIC')

program_schema = ProgramSchema()
programs_schema = ProgramSchema(many=True)

class SimpleProgramSchema(ma.ModelSchema):
    class Meta:
        model = Program
        fields = ('id', 'name', 'visibility')

simple_program_schema = SimpleProgramSchema()
simple_programs_schema = SimpleProgramSchema(many=True)
