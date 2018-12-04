from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager, Command, Option
from flask_migrate import Migrate, MigrateCommand

from sportacus import app, db
from sportacus.models import *
from sportacus.api import *
from commands.fixtures import FixturesCommand

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)
manager.add_command('fixtures', FixturesCommand)


if __name__ == '__main__':
    manager.run()
