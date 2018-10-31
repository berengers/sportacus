from flask import request, g, jsonify
from sqlalchemy import desc

from .token import auth
from sport_programs import app, db
from sport_programs.models import ProgramStep, UserProgram, UserExercise
from sport_programs.schemas import program_steps_schema, program_step_schema, program_step_user_schema, simple_program_steps_schema, simple_program_step_schema
from tools import error

@app.route('/program_steps/<program_id>', methods=['GET'])
@auth
def get_program_steps(program_id):
    steps = ProgramStep.query.filter(ProgramStep.program_id==program_id)\
    .order_by(ProgramStep.position)\
    .all()

    if not steps:
        return error("Not program_steps at this id"), 404

    return simple_program_steps_schema.jsonify(steps)


@app.route('/program_steps/<id>', methods=['POST'])
@auth
def add_program_step(id):
    req = program_step_schema.load(request.json, session=db.session)

    if len(req.errors) > 0:
        return jsonify(req.errors)

    userP = UserProgram.query.filter_by(program_id = id).first()
    userE = UserExercise.query.filter_by(exercise_id = req.data.exercise_id).first()

    if not userP or not userE:
        return error("Program_id or/and exercise_id are wrong"), 404

    if userP.user_id != g.user.id or userE.user_id != g.user.id:
        return error("You don't have permission to do that"), 403

    step = ProgramStep(
        program_id = id,
        exercise_id = req.data.exercise_id,
        position = req.data.position
    )

    db.session.add(step)
    db.session.commit()

    return simple_program_step_schema.jsonify(step)


@app.route('/program_steps/<id>', methods=['DELETE'])
@auth
def delete_program_step(id):
    req = ProgramStep.query.filter_by(id = id).first()

    if not req:
        return error("No Program Step with this ID"), 404

    user = UserProgram.query.filter_by(program_id = req.program_id).first()

    if user.user_id != g.user.id:
        return error("You don't have permission to do that"), 403

    db.session.delete(req)
    db.session.commit()

    return ''


@app.route('/program_steps/<id>', methods=['PUT'])
@auth
def update_program_step(id):
    program = ProgramStep.query.filter_by(id = id).first()

    if not program:
        return error("No program with this id"), 404

    req = program_step_schema.load(request.json, partial=True)

    if len(req.errors) > 0:
        return jsonify(req.errors), 400

    user = UserProgram.query.filter_by(program_id = program.program_id).first()

    if user.user_id != g.user.id:
        return error("You don't have permission to do that"), 403

    body = req.data

    if body.series:
        program.series = body.series

    if body.repetitions:
        program.repetitions = body.repetitions

    if body.weight:
        program.weight = body.weight

    if body.rest_duration_between_series:
        program.rest_duration_between_series = body.rest_duration_between_series

    if body.rest_end_duration:
        program.rest_end_duration = body.rest_end_duration

    if body.position:
        program.position = body.position

    db.session.add(program)
    db.session.commit()

    return simple_program_step_schema.jsonify(program)
