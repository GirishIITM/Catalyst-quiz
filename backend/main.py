from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from backend.models import db
from backend.routes import home_bp
from backend.routes.auth import auth_bp
from backend.routes.student import student_bp
from backend.routes.teacher import teacher_bp, teacher_no_classroom_bp
import os

def create_app(database_uri='sqlite:///app.db'):
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', database_uri)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'a_super_secret_key_for_dev')

    CORS(app)
    db.init_app(app)
    JWTManager(app)
    Bcrypt(app)

    app.register_blueprint(home_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(student_bp)
    app.register_blueprint(teacher_bp)
    app.register_blueprint(teacher_no_classroom_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

