from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

print ("NAME APP ---------------> ", Flask(__name__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres@localhost'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['ENV'] = 'development'
app.config['DEBUG'] = True

db = SQLAlchemy(app)
ma = Marshmallow(app)
