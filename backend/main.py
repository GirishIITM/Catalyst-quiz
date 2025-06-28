from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from routes import register_routes

app = Flask(__name__)
CORS(
    app,
    origin="*",
    methods=["GET", "POST", "PUT", "DELETE"],
)

register_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
