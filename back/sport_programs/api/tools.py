from flask import jsonify

def error(error):
    return jsonify({ "error": error })
