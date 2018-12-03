from flask import request, g, jsonify
from datetime import datetime

from .token import auth
from sport_programs import app, db
from sport_programs.models import *
from sport_programs.schemas import program_schema, programs_schema, simple_programs_schema, simple_program_schema, get_program_nested_schema, program_nested_schema

@app.route("/api/programs", methods=["GET"])
@auth
def list_programs():
    programs = Program.query\
        .join(UserProgram, Program.id == UserProgram.program_id)\
        .filter((UserProgram.user_id == g.user.id) | (Program.visibility == 'PUBLIC'))\
        .order_by(Program.created_at)

    return simple_programs_schema.jsonify(programs)

# @app.route("/programs/<program_id>", methods=["GET"])
# @auth
# def get_program_nested(program_id):
#     program = Program.query.filter_by(id=program_id).first()
#
#     # program = Program.query\
#     # .join(Step, Program.id == Step.program_id )\
#     # .filter_by(id=program_id).first()
#
#     if not program:
#         return jsonify({ "error": "No program to this id" })
#
#     return simple_program_schema.jsonify(program)

@app.route('/api/programs/<program_id>', methods=['GET'])
@auth
def get_program(program_id):

    program = Program.query.filter_by(id=program_id).first()

    if not program:
        return error("Not steps at this id"), 404

    program.steps = sorted(program.steps, key=lambda k: k.position)

    return get_program_nested_schema.jsonify(program)


@app.route("/api/programs", methods=["POST"])
@auth
def new_program():
    res = program_schema.load(request.json, session=db.session)

    if len(res.errors) > 0:
        return jsonify(res.errors)

    user = User.query.filter_by(id = g.user.id).first()
    user.programs.append(res.data)

    db.session.add(res.data)
    db.session.commit()

    return simple_program_schema.jsonify(res.data)

@app.route("/api/programs/<id>", methods=["DELETE"])
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


@app.route("/api/programs/<id>", methods=["PUT"])
@auth
def update_program(id):
    program = Program.query.filter_by(id=id).first()
    userP = UserProgram.query.filter_by(program_id=id, user_id=g.user.id).first()
    res = program_nested_schema.load(request.json)
    #
    # if not program or not userP:
    #     return "Permission error", 401
    #
    # if len(res.errors) > 0:
    #     return jsonify(res.errors), 404
    #
    # for step in res.data.steps:
    #     if step.exercise.visibility != "PUBLIC":
    #         userE = UserExercise.query.filter_by(exercise_id=step.exercise.id, user_id=g.user.id).first()
    #
    #         if not userE:
    #             return jsonify({"No permission to use this exercise": step.exercise.id}), 403


    program.name = res.data.name
    program.steps = res.data.steps
    program.updated_at = datetime.utcnow()
    #
    # print ("res ---------------> ", res)
    # print ("program ---------------> ", program)

    db.session.add(program)
    db.session.commit()

    return program_nested_schema.jsonify(program)
