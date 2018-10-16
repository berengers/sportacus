from sport_programs import db, ma
from datetime import datetime
from marshmallow import fields

from sport_programs.models import Program

class ProgramSchema(ma.ModelSchema):
    class Meta:
        model = Program

    visibility = fields.String(validate = lambda v: v == 'PRIVATE' or v == 'PUBLIC')

program_schema = ProgramSchema()
programs_schema = ProgramSchema(many=True)
