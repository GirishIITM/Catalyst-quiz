from flask import Blueprint, jsonify
from .auth import auth_bp

home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def index():
    return jsonify(message="Welcome to the Catalyst-Quiz API")
