from sport_programs import db


user_exercice_join = db.Table('user_exercice',
    db.Column('exercice_id', db.Integer, db.ForeignKey('exercice.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)
