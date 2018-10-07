from flask_script import Command

from sport_programs import db, app
from sport_programs.models import *

# db.reflect()
# db.drop_all()

users = [
    User(
        mail = 'robert@gmail.com',
        username = 'robert',
        password = 'robert_pass'
    ),
    User(
        mail = 'tom@gmail.com',
        username = 'tom',
        password = 'tom_pass'
    )
]

programs = [
    Program(
        name = 'Pec - Triceps',
        visibility = 'PUBLIC'
    ),
    Program(
        name = 'Jambes',
        visibility = 'PUBLIC'
    )
]

exercices = [
    Exercice(
        name = 'Developpe couche',
        image = 'https://www.affairesdegars.com/webroot/usr_img/97554958/Flat-Barbell-Bench-Press1.jpg',
    ),
    Exercice(
        name = 'Ecarte incline avec halteres',
        image = 'https://julienquaglierini.com/wp-content/uploads/2017/07/exercise-296-1-300x400.png',
        visibility = 'PUBLIC',
    ),
    Exercice(
        name = 'dips pour pecs',
        image = '',
        visibility = 'PUBLIC',
    ),
    Exercice(
        name = 'elevations laterales avec halteres',
        image = '',
        visibility = 'PUBLIC',
    ),
    Exercice(
        name = 'Pompes',
        image = 'https://www.complementsetproteines.com/img/cms/blog/2015/pompes-triceps-2.jpg',
        visibility = 'PUBLIC',
    ),
    Exercice(
        name = 'Squats',
        image = 'https://img-4.linternaute.com/lmnzTepR8kztnMRrVsGj1c3bXX0=/1240x/smart/6cb68a39a9e04f249f5f07494f722e96/ccmcms-linternaute/10763352.jpg',
        visibility = 'PUBLIC',
    ),
    Exercice(
        name = 'Squat avec halteres',
        image = '',
        visibility = 'PUBLIC',
    ),
    Exercice(
        name = 'Fentes avant halteres unilaterale',
        image = '',
        visibility = 'PUBLIC',
    )
]

program_steps = [
    ProgramStep(
        program_id = 1,
        exercice_id = 1,
        series = 4,
        repetitions = 8,
        weight = 50,
        rest_duration_between_series = 90,
        rest_end_duration = 120,
        position = 1
    ),
    ProgramStep(
        program_id = 1,
        exercice_id = 2,
        series = 4,
        repetitions = 11,
        weight = 14,
        rest_duration_between_series = 90,
        rest_end_duration = 120,
        position = 2
    ),
    ProgramStep(
        program_id = 1,
        exercice_id = 3,
        series = 4,
        repetitions = 11,
        weight = 14,
        rest_duration_between_series = 90,
        rest_end_duration = 120,
        position = 3
    ),
    ProgramStep(
        program_id = 1,
        exercice_id = 4,
        series = 4,
        repetitions = 9,
        weight = 6,
        rest_duration_between_series = 90,
        rest_end_duration = 120,
        position = 4
    ),
    ProgramStep(
        program_id = 1,
        exercice_id = 5,
        series = 4,
        repetitions = 9,
        weight = 0,
        rest_duration_between_series = 60,
        rest_end_duration = 120,
        position = 5
    ),
    ProgramStep(
        program_id = 2,
        exercice_id = 6,
        series = 3,
        repetitions = 20,
        weight = 0,
        rest_duration_between_series = 30,
        rest_end_duration = 60,
        position = 1
    ),
    ProgramStep(
        program_id = 2,
        exercice_id = 7,
        series = 4,
        repetitions = 11,
        weight = 16,
        rest_duration_between_series = 45,
        rest_end_duration = 90,
        position = 2
    ),
    ProgramStep(
        program_id = 2,
        exercice_id = 8,
        series = 4,
        repetitions = 10,
        weight = 12,
        rest_duration_between_series = 60,
        rest_end_duration = 120,
        position = 3
    )
]

class FixturesCommand(Command):
    def run(self):

        with app.app_context():

            for user in users:
                db.session.add(user)

            db.session.commit()

            for exercice in exercices:
                db.session.add(exercice)

            db.session.commit()

            for user in users:
                for exercice in exercices:
                    user.exercice_relation.append(exercice)
                    db.session.add(user)

            db.session.commit()

            for program in programs:
                db.session.add(program)

            db.session.commit()

            for user in users:
                for program in programs:
                    user.program_relation.append(program)
                    db.session.add(user)

            db.session.commit()


            for program_step in program_steps:
                db.session.add(program_step)

            db.session.commit()
