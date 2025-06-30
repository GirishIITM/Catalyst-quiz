from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from models import db, User
import random
import string

# Blueprint for auth routes
auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# In-memory OTP store (for demo; use persistent store in production)
otp_store = {}

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    if not all([email, username, password, role]):
        return jsonify({'msg': 'Missing fields'}), 400
    if User.query.filter((User.email == email) | (User.username == username)).first():
        return jsonify({'msg': 'User already exists'}), 409
    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(email=email, username=username, password_hash=hashed_pw, role=role)
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'User created successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({'msg': 'Invalid credentials'}), 401
    access_token = create_access_token(identity=str(user.id))
    return jsonify({'access_token': access_token, 'user': {'id': str(user.id), 'email': user.email, 'username': user.username, 'role': user.role}})

@auth_bp.route('/send-otp', methods=['POST'])
def send_otp():
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

@auth_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    email = data.get('email')
    otp = data.get('otp')
    if otp_store.get(email) == otp:
        del otp_store[email]
        return jsonify({'msg': 'OTP verified'}), 200
    return jsonify({'msg': 'Invalid OTP'}), 400

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('new_password')
    otp = data.get('otp')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    if otp_store.get(email) != otp:
        return jsonify({'msg': 'Invalid OTP'}), 400
    user.password_hash = bcrypt.generate_password_hash(new_password).decode('utf-8')
    db.session.commit()
    del otp_store[email]
    return jsonify({'msg': 'Password reset successful'}), 200