from flask_script import Command, Option

from sportacus import db, app
from sportacus.models import *

# db.reflect()
# db.drop_all()

tokens = [
    Token(
        user_id = 1,
        token = "public_token"
    ),
    Token(
        user_id = 2,
        token = "admin_token"
    ),
    Token(
        user_id = 3,
        token = "tom_token"
    )
]

users = [
    User(
        email = 'public@gmail.com',
        username = 'public',
        password = 'public_pass'
    ),
    User(
        email = 'admin@gmail.com',
        username = 'admin',
        password = 'admin'
    ),
    User(
        email = 'tom@gmail.com',
        username = 'tom',
        password = 'tom_pass'
    )
]

programs = [
    Program(
        name = 'Pecs - Triceps',
        visibility = 'PUBLIC'
    ),
    Program(
        name = 'Jambes',
        visibility = 'PUBLIC'
    ),
    Program(
        name = 'Biceps - Dos',
        visibility = 'PUBLIC'
    ),
    Program(
        name = 'Abdos --admin',
        visibility = 'PRIVATE'
    ),
    Program(
        name = 'Bras pecs --tom',
        visibility = 'PRIVATE'
    )
]

user_programs = [
    UserProgram(
        user_id = 1,
        program_id = 1
    ),
    UserProgram(
        user_id = 1,
        program_id = 2
    ),
    UserProgram(
        user_id = 1,
        program_id = 3
    ),
    UserProgram(
        user_id = 2,
        program_id = 4
    ),
    UserProgram(
        user_id = 3,
        program_id = 5
    )
]

exercises = [
    Exercise(
        name = 'Developpe couche',
        image = 'Flat-Barbell-Bench-Press1.jpg',
        visibility = 'PUBLIC'
    ),
    Exercise(
        name = 'Ecarte incline avec halteres',
        image = 'ecarte-incline-halteres.png',
        visibility = 'PUBLIC'
    ),
    Exercise(
        name = 'dips pour pecs',
        image = '',
        visibility = 'PUBLIC',
    ),
    Exercise(
        name = 'elevations laterales avec halteres',
        image = '',
        visibility = 'PUBLIC',
    ),
    Exercise(
        name = 'Pompes triceps',
        image = 'pompes-triceps.jpg',
        visibility = 'PUBLIC',
    ),
    Exercise(
        name = 'Pompes',
        image = 'pompe.jpg',
        visibility = 'PUBLIC',
    ),
    Exercise(
        name = 'Squats',
        image = '10763352.jpg',
        visibility = 'PUBLIC',
    ),
    Exercise(
        name = 'Squat avec halteres',
        image = '',
        visibility = 'PUBLIC',
    ),
    Exercise(
        name = 'Fentes avant halteres unilaterale',
        image = '',
        visibility = 'PUBLIC',
    ),
    Exercise(
        name = 'Crunch',
        image = 'crunch.jpg',
        visibility = 'PRIVATE',
    ),
    Exercise(
        name = 'Abdo Ventre',
        image = 'abdo-ventre.png',
        visibility = 'PRIVATE',
    ),
    Exercise(
        name = 'Planche',
        image = 'exercice-abdo-gainage.jpg',
        visibility = 'PRIVATE',
    ),
    Exercise(
        name = 'pec-deck',
        image = 'pec-deck.jpg',
        visibility = 'PRIVATE',
    ),
    Exercise(
        name = 'traction',
        image = 'traction.jpg',
        visibility = 'PRIVATE',
    )
]

user_exercises = [
    UserExercise(
        user_id = 2,
        exercise_id = 1
    ),
    UserExercise(
        user_id = 2,
        exercise_id = 2
    ),
    UserExercise(
        user_id = 1,
        exercise_id = 3
    ),
    UserExercise(
        user_id = 1,
        exercise_id = 4
    ),
    UserExercise(
        user_id = 1,
        exercise_id = 5
    ),
    UserExercise(
        user_id = 1,
        exercise_id = 6
    ),
    UserExercise(
        user_id = 1,
        exercise_id = 7
    ),
    UserExercise(
        user_id = 1,
        exercise_id = 8
    ),
    UserExercise(
        user_id = 1,
        exercise_id = 9
    ),
    UserExercise(
        user_id = 2,
        exercise_id = 10
    ),
    UserExercise(
        user_id = 2,
        exercise_id = 11
    ),
    UserExercise(
        user_id = 2,
        exercise_id = 12
    ),
    UserExercise(
        user_id = 3,
        exercise_id = 13
    ),
    UserExercise(
        user_id = 3,
        exercise_id = 14
    )
]

steps = [
    Step(
        program_id = 1,
        exercise_id = 1,
        series = 4,
        repetitions = 8,
        weight = 50,
        rest = 90,
        rest_end = 120,
        position = 1
    ),
    Step(
        program_id = 1,
        exercise_id = 2,
        series = 4,
        repetitions = 11,
        weight = 14,
        rest = 90,
        rest_end = 120,
        position = 2
    ),
    Step(
        program_id = 1,
        exercise_id = 3,
        series = 4,
        repetitions = 11,
        weight = 14,
        rest = 90,
        rest_end = 120,
        position = 3
    ),
    Step(
        program_id = 1,
        exercise_id = 4,
        series = 4,
        repetitions = 9,
        weight = 6,
        rest = 90,
        rest_end = 120,
        position = 4
    ),
    Step(
        program_id = 1,
        exercise_id = 5,
        series = 4,
        repetitions = 9,
        weight = 0,
        rest = 60,
        rest_end = 120,
        position = 5
    ),
    Step(
        program_id = 2,
        exercise_id = 6,
        series = 3,
        repetitions = 20,
        weight = 0,
        rest = 30,
        rest_end = 60,
        position = 1
    ),
    Step(
        program_id = 2,
        exercise_id = 7,
        series = 4,
        repetitions = 11,
        weight = 16,
        rest = 45,
        rest_end = 90,
        position = 2
    ),
    Step(
        program_id = 2,
        exercise_id = 8,
        series = 4,
        repetitions = 10,
        weight = 12,
        rest = 60,
        rest_end = 120,
        position = 3
    ),
    Step(
        program_id = 3,
        exercise_id = 1,
        series = 4,
        repetitions = 9,
        weight = 0,
        rest = 60,
        rest_end = 120,
        position = 3
    ),
    Step(
        program_id = 3,
        exercise_id = 2,
        series = 3,
        repetitions = 20,
        weight = 0,
        rest = 30,
        rest_end = 60,
        position = 2
    ),
    Step(
        program_id = 3,
        exercise_id = 1,
        series = 4,
        repetitions = 11,
        weight = 16,
        rest = 45,
        rest_end = 90,
        position = 1
    ),
    Step(
        program_id = 4,
        exercise_id = 10,
        series = 4,
        repetitions = 11,
        weight = 0,
        rest = 30,
        rest_end = 60,
        position = 1
    ),
    Step(
        program_id = 4,
        exercise_id = 11,
        series = 4,
        repetitions = 11,
        weight = 0,
        rest = 30,
        rest_end = 60,
        position = 2
    ),
    Step(
        program_id = 4,
        exercise_id = 12,
        series = 4,
        repetitions = 11,
        weight = 0,
        rest = 30,
        rest_end = 60,
        position = 3
    ),
    Step(
        program_id = 5,
        exercise_id = 13,
        series = 4,
        repetitions = 11,
        weight = 0,
        rest = 30,
        rest_end = 60,
        position = 1
    ),
    Step(
        program_id = 5,
        exercise_id = 14,
        series = 4,
        repetitions = 11,
        weight = 0,
        rest = 30,
        rest_end = 60,
        position = 2
    ),
    Step(
        program_id = 5,
        exercise_id = 1,
        series = 4,
        repetitions = 11,
        weight = 50,
        rest = 30,
        rest_end = 60,
        position = 3
    ),
    Step(
        program_id = 5,
        exercise_id = 3,
        series = 3,
        repetitions = 10,
        weight = 0,
        rest = 30,
        rest_end = 60,
        position = 4
    )
]

class FixturesCommand(Command):

    option_list = (
        Option('--url', '-url', dest='url', default='http://localhost:2015/images/exercises/'),
    )

    def run(self, url):

        with app.app_context():

            for user in users:
                db.session.add(user)
            db.session.commit()

            for token in tokens:
                db.session.add(token)
                db.session.commit()

            for program in programs:
                db.session.add(program)
            db.session.commit()

            for user_program in user_programs:
                db.session.add(user_program)
            db.session.commit()

            for exercise in exercises:
                if len(exercise.image) > 0:
                    exercise.image = url + exercise.image
                db.session.add(exercise)
            db.session.commit()

            for user_exercise in user_exercises:
                db.session.add(user_exercise)
            db.session.commit()

            for step in steps:
                db.session.add(step)
            db.session.commit()
