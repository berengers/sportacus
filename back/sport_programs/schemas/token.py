from sport_programs import db, ma

from sport_programs.models import Token

class TokenSchema(ma.ModelSchema):
    class Meta:
        model = Token

token_schema = TokenSchema()
tokens_schemas = TokenSchema(many=True)
