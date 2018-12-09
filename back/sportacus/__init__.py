from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_env import MetaFlaskEnv

class Configuration(metaclass=MetaFlaskEnv):
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres@localhost'
    DEBUG = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True

app = Flask(__name__)
CORS(app)

app.config.from_object(Configuration)

db = SQLAlchemy(app)
ma = Marshmallow(app)
