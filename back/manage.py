from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager, Command, Option
from flask_migrate import Migrate, MigrateCommand

from sport_programs import app, db
from sport_programs.models import *
from sport_programs.api import *
from commands.fixtures import FixturesCommand

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)
manager.add_command('fixtures', FixturesCommand)

class Hello(Command):

    option_list = (
        Option('--name', '-n', dest='name'),
    )

    def run(self, name):
        print "hello %s" % name

manager.add_command('hello', Hello)


if __name__ == '__main__':
    manager.run()
