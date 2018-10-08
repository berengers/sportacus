from sport_programs import db, ma


class UserProgram(db.Model):
    __tablename__ = 'user_program'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'), nullable=False)

class UserProgramSchema(ma.ModelSchema):
    class Meta:
        model = UserProgram

userProgram_schema = UserProgramSchema()
userPrograms_schema = UserProgramSchema(many=True)
