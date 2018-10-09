from flask import request, g, jsonify

from .token import auth
from sport_programs import app, db
from sport_programs.models import *

@app.route("/programs", methods=["GET"])
@auth
def list_programs():
    # user_programs = UserProgram.query.filter(UserProgram.user_id == g.user.id)

    programs = Program.query\
        .join(UserProgram, Program.id == UserProgram.program_id)\
        .filter((UserProgram.user_id == g.user.id) | (Program.visibility == 'PUBLIC'))

    return programs_schema.jsonify(programs)
