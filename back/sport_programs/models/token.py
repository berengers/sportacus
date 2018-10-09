from sport_programs import db, ma

class Token(db.Model):
    __tablename__ = 'token'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.Text, nullable=False)

class TokenSchema(ma.ModelSchema):
    class Meta:
        model = Token

token_schema = TokenSchema()
tokens_schemas = TokenSchema(many=True)
