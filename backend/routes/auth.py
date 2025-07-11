from datetime import timedelta
from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from models import db, User
import random
import string

# Blueprint for auth routes
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
bcrypt = Bcrypt()

# In-memory OTP store (for demo; use persistent store in production)
otp_store = {}

# Ensure question_type in API requests is one of: text, mcq_single, mcq_multiple, image_upload, date, time

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        if not all([username, email, password, role]):
            return jsonify(message="Missing required fields"), 400

        if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
            return jsonify(message="User already exists"), 409

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(
            username=username,
            email=email,
            password_hash=hashed_password,
            role=role,
            user_metadata=data.get('metadata', {})
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify(message="User registered successfully"), 201
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')

        print(
            f"Login attempt with email: {email}, username: {username} and password: {password}")

        if not password or not (email or username):
            return jsonify(message="Missing required fields"), 400
        
        user = None
        if email:
            user = User.query.filter_by(email=email).first()
        if not user and username:
            user = User.query.filter_by(username=username).first()
        
        if user and bcrypt.check_password_hash(user.password_hash, password):
            access_token = create_access_token(
                identity=str(user.id),
                additional_claims={"role": user.role},
                expires_delta=timedelta(days=7)
            )
            return jsonify(access_token=access_token, role=user.role, username=user.username)

        return jsonify(message="Invalid credentials"), 401
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@auth_bp.route('/send-otp', methods=['POST'])
def send_otp():
    try:
        data = request.get_json()
        email = data.get('email')
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'msg': 'User not found'}), 404
        otp = ''.join(random.choices(string.digits, k=6))
        otp_store[email] = otp
        # In production, send OTP via email/SMS
        print(f"OTP for {email}: {otp}")
        return jsonify({'msg': 'OTP sent'}), 200
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@auth_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    try:
        data = request.get_json()
        email = data.get('email')
        otp = data.get('otp')
        if otp_store.get(email) == otp:
            del otp_store[email]
            return jsonify({'msg': 'OTP verified'}), 200
        return jsonify({'msg': 'Invalid OTP'}), 400
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        email = data.get('email')
        new_password = data.get('new_password')
        otp = data.get('otp')
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'msg': 'User not found'}), 404
        if otp_store.get(email) != otp:
            return jsonify({'msg': 'Invalid OTP'}), 400
        user.password_hash = bcrypt.generate_password_hash(
            new_password).decode('utf-8')
        db.session.commit()
        del otp_store[email]
        return jsonify({'msg': 'Password reset successful'}), 200
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500
