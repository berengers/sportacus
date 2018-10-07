from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from sport_programs import app, db
from sport_programs.models import *
from sport_programs.api import *
from commands.fixtures import FixturesCommand

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)
manager.add_command('fixtures', FixturesCommand)

if __name__ == '__main__':
    manager.run()
