from sportacus import db, ma

from sportacus.models import Token

class TokenSchema(ma.ModelSchema):
    class Meta:
        model = Token

token_schema = TokenSchema()
tokens_schemas = TokenSchema(many=True)
