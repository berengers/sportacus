from sportacus import db, ma

from .user import *
from .program import *

class UserProgram(db.Model):
    __tablename__ = 'user_program'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'), primary_key=True)

    program = db.relationship("Program", backref='program_associations', single_parent=True, cascade='all, delete-orphan')
    user = db.relationship("User", backref='user_associations')
