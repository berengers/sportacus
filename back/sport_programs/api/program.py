from flask import request, g, jsonify

from .token import auth
from sport_programs import app, db
from sport_programs.models import *
from sport_programs.schemas import program_schema, programs_schema

@app.route("/programs", methods=["GET"])
@auth
def list_programs():
    # user_programs = UserProgram.query.filter(UserProgram.user_id == g.user.id)

    programs = Program.query\
        .join(UserProgram, Program.id == UserProgram.program_id)\
        .filter((UserProgram.user_id == g.user.id) | (Program.visibility == 'PUBLIC'))

    return programs_schema.jsonify(programs)

@app.route("/programs", methods=['POST'])
@auth
def new_program():
    res = program_schema.load(request.json, session=db.session)

    if len(res.errors) > 0:
        return jsonify(res.errors)

    program = Program(
        name = res.data.name,
        visibility = res.data.visibility
    )

    user = User.query.filter_by(id = g.user.id).first()
    user.programs.append(program)

    db.session.add(program)
    db.session.commit()

    # user_program = UserProgram(
    #     user_id = g.user.id,
    #     program_id = program.id
    # )
    #
    # db.session.add(user_program)
    # db.session.commit()

    return program_schema.jsonify(program)
