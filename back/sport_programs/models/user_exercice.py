from sport_programs import db, ma


class UserExercice(db.Model):
    __tablename__ = 'user_exercice'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    exercice_id = db.Column(db.Integer, db.ForeignKey('exercice.id'), nullable=False)

class UserExerciceSchema(ma.ModelSchema):
    class Meta:
        model = UserExercice
        fields = ('exercice_id',)

userExercice_schema = UserExerciceSchema()
userExercices_schema = UserExerciceSchema(many=True)
