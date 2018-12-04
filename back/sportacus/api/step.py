from flask import request, g, jsonify
from sqlalchemy import desc

from .token import auth
from sportacus import app, db
from sportacus.models import Program, Step, UserProgram, UserExercise
from sportacus.schemas import steps_schema, step_schema, simple_steps_schema, simple_step_schema
from .tools import error

@app.route('/api/steps/<id>', methods=['GET'])
@auth
def get_step(id):
    step = Step.query.filter_by(id=id).first()

    if not step:
        return error("Not step at this id"), 404

    return simple_step_schema.jsonify(step)


@app.route('/api/steps', methods=['POST'])
@auth
def add_step():
    req = step_schema.load(request.json, session=db.session, partial=True)

    if len(req.errors) > 0:
        return jsonify(req.errors)

    userP = UserProgram.query.filter_by(program_id = req.data.program_id).first()
    userE = UserExercise.query.filter_by(exercise_id = req.data.exercise_id).first()

    if not userP or not userE:
        return error("Program_id or/and exercise_id are wrong"), 404

    if userP.user_id != g.user.id:
        return error("You don't have permission to do that"), 403

    steps = Step.query.filter_by(program_id=req.data.program_id).all()
    req.data.position = len(steps)+1

    db.session.add(req.data)
    db.session.commit()

    return simple_step_schema.jsonify(req.data)


@app.route('/api/steps/<id>', methods=['DELETE'])
@auth
def delete_step(id):
    req = Step.query.filter_by(id = id).first()

    if not req:
        return error("No Program Step with this ID"), 404

    user = UserProgram.query.filter_by(program_id = req.program_id).first()

    if user.user_id != g.user.id:
        return error("You don't have permission to do that"), 403

    db.session.delete(req)
    db.session.commit()

    return ''


@app.route('/api/steps/<id>', methods=['PUT'])
@auth
def update_step(id):
    program = Step.query.filter_by(id = id).first()

    if not program:
        return error("No program with this id"), 404

    req = step_schema.load(request.json, partial=True)

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

    if body.rest or body.rest == 0:
        program.rest = body.rest

    if body.rest_end or body.rest_end == 0:
        program.rest_end = body.rest_end

    if body.position:
        program.position = body.position

    db.session.add(program)
    db.session.commit()

    return simple_step_schema.jsonify(program)
