from sport_programs import db, ma
from datetime import datetime

from sport_programs.models import User

class UserShema(ma.ModelSchema):
    class Meta:
        model = User

user_schema = UserShema()
users_schema = UserShema(many=True)
