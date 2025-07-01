from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from models import db
from routes import home_bp
from routes.auth import auth_bp
from routes.student import student_bp
from routes.teacher import teacher_bp, teacher_no_classroom_bp
from dotenv import load_dotenv
import os

load_dotenv()


def create_app():
    app = Flask(__name__)

    use_postgres = os.getenv("USE_POSTGRES", "false").lower() == "true"
    if use_postgres:
        app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")   
    else:
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.environ.get(
        "JWT_SECRET_KEY", "a_super_secret_key_for_dev"
    )

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


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5001)
