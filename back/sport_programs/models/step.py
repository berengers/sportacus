from sport_programs import db, ma

class Step(db.Model):
    __tablename__ = 'step'

    id = db.Column(db.Integer, primary_key=True)
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), nullable=False)
    series = db.Column(db.Integer, default=3, nullable=False)
    repetitions = db.Column(db.Integer, default=8, nullable=False)
    weight = db.Column(db.Integer, default=0, nullable=False)
    rest = db.Column(db.Integer, default=60, nullable=False)
    rest_end = db.Column(db.Integer, default=60, nullable=False)
    position = db.Column(db.Integer, nullable=False)
