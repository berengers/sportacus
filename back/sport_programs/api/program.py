from flask import request, g, jsonify
from datetime import datetime

from .token import auth
from sport_programs import app, db
from sport_programs.models import *
from sport_programs.schemas import program_schema, programs_schema

@app.route("/programs", methods=["GET"])
@auth
def list_programs():
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

    user = User.query.filter_by(id = g.user.id).first()
    user.programs.append(res)

    db.session.add(res)
    db.session.commit()

    return program_schema.jsonify(program)

@app.route("/programs/<id>", methods=["DELETE"])
@auth
def delete_program(id):
    program = Program.query.filter_by(id = id).first()
    user_program = UserProgram.query.filter_by(program_id = id).first()

    if not program or not user_program:
        return jsonify({ "error": "Program or user don't exist" }), 404

    if user_program.user_id != g.user.id:
        return jsonify({ "error": "You don't have permission to do that" }), 403

    user = User.query.filter_by(id = g.user.id).first()
    user.programs.remove(program)
    db.session.commit()

    db.session.delete(program)
    db.session.commit()

    return ""


@app.route("/programs/<id>", methods=["PUT"])
@auth
def update_program(id):
    program = Program.query.filter_by(id = id).first()
    body = program_schema.load(request.json, session=db.session)
    user_program = UserProgram.query.filter_by(program_id = id).first()

    if not program or not user_program:
        return jsonify({ "error": "No program or user_program with this id" }), 404

    if len(body.errors) > 0:
        return jsonify(body.errors)

    if user_program.user_id != g.user.id:
        return jsonify({ "error": "You don't have permission to do that" }), 403

    datas = body.data

    if datas.name:
        program.name = datas.name

    if datas.visibility:
        program.visibility = datas.visibility

    program.updated_at = datetime.utcnow()

    db.session.add(program)
    db.session.commit()

    return ""
