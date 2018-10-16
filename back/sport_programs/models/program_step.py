from sport_programs import db, ma

class ProgramStep(db.Model):
    __tablename__ = 'program_step'

    id = db.Column(db.Integer, primary_key=True)
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'), nullable=False)
    exercice_id = db.Column(db.Integer, db.ForeignKey('exercice.id'), nullable=False)
    series = db.Column(db.Integer, default=3, nullable=False)
    repetitions = db.Column(db.Integer, default=8, nullable=False)
    weight = db.Column(db.Integer, default=0, nullable=False)
    rest_duration_between_series = db.Column(db.Integer, default=60, nullable=False)
    rest_end_duration = db.Column(db.Integer, default=60, nullable=False)
    position = db.Column(db.Integer, nullable=False)
