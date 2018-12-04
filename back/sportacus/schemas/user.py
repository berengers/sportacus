from sportacus import db, ma
from datetime import datetime
from marshmallow import fields, Schema

from sportacus.models import User

class UserShema(ma.ModelSchema):
    class Meta:
        model = User
        fields = ('email', 'username')

user_schema = UserShema()
users_schema = UserShema(many=True)

class ValidateUserSchema(ma.ModelSchema):
    class Meta:
        model = User
    email = fields.Email()

validate_user_schema = ValidateUserSchema()

class UserUpdate(Schema):
    password = fields.Str(required=True)
    new_password = fields.Str(required=True)

user_update_schema = UserUpdate()
