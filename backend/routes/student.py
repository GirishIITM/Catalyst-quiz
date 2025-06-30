from flask import Blueprint, jsonify, request
from backend.models import db, User, Classroom, Quiz, Question, Enrollment, Notes, Submission, StudentIssue, Notification, StudentAnswer
from flask_jwt_extended import jwt_required, get_jwt_identity
import uuid

student_bp = Blueprint('student', __name__, url_prefix='/student')

def get_current_student_id():
    identity = get_jwt_identity()
    if identity.get('role') != 'student':
        raise Exception("Student role required")
    return identity['id']

@student_bp.route('/<uuid:classroom_id>/dashboard')
@jwt_required()
def student_dashboard(classroom_id):
    student_id = get_current_student_id()
    quizzes = Quiz.query.filter_by(classroom_id=classroom_id, is_published=True).order_by(Quiz.deadline.desc()).limit(5).all()
    submissions = Submission.query.filter_by(student_id=student_id, classroom_id=classroom_id).order_by(Submission.submitted_at.desc()).limit(5).all()

    return jsonify({
        "upcoming_quizzes": [{"id": q.id, "title": q.title, "deadline": q.deadline} for q in quizzes],
        "recent_submissions": [{"quiz_title": s.quiz.title, "score": s.score} for s in submissions]
    })

@student_bp.route('/profile', methods=['GET', 'PUT'])
@jwt_required()
def profile():
    student_id = get_current_student_id()
    user = User.query.get(student_id)
    if not user:
        return jsonify(message="User not found"), 404

    if request.method == 'GET':
        return jsonify({
            "username": user.username,
            "email": user.email,
            "metadata": user.metadata
        })
    elif request.method == 'PUT':
        data = request.get_json()
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        # Add more fields to update as needed
        db.session.commit()
        return jsonify(message="Profile updated successfully")

@student_bp.route('/<uuid:classroom_id>/notes')
@jwt_required()
def view_notes(classroom_id):
    notes = Notes.query.filter_by(classroom_id=classroom_id).all()
    return jsonify([{
        "id": note.id,
        "title": note.title,
        "description": note.description,
        "file_url": note.file_url,
        "uploaded_at": note.uploaded_at
    } for note in notes])

@student_bp.route('/<uuid:classroom_id>/quizzes')
@jwt_required()
def view_quizzes(classroom_id):
    quizzes = Quiz.query.filter_by(classroom_id=classroom_id, is_published=True).all()
    return jsonify([{
        "id": quiz.id,
        "title": quiz.title,
        "description": quiz.description,
        "deadline": quiz.deadline
    } for quiz in quizzes])

@student_bp.route('/<uuid:classroom_id>/quiz-start/<uuid:quiz_id>')
@jwt_required()
def quiz_start(classroom_id, quiz_id):
    student_id = get_current_student_id()
    # Check if student is enrolled
    Enrollment.query.filter_by(classroom_id=classroom_id, student_id=student_id).first_or_404()
    
    quiz = Quiz.query.filter_by(id=quiz_id, classroom_id=classroom_id, is_published=True).first_or_404()
    first_question = Question.query.filter_by(quiz_id=quiz.id).order_by(Question.created_at.asc()).first()
    
    return jsonify({
        "quiz_id": quiz.id,
        "title": quiz.title,
        "description": quiz.description,
        "first_question_id": first_question.id if first_question else None
    })

@student_bp.route('/<uuid:quiz_id>/question/<uuid:question_id>', methods=['GET', 'POST'])
@jwt_required()
def handle_question(quiz_id, question_id):
    student_id = get_current_student_id()
    question = Question.query.filter_by(id=question_id, quiz_id=quiz_id).first_or_404()
    
    if request.method == 'GET':
        # Find the next question ID
        questions = Question.query.filter_by(quiz_id=quiz_id).order_by(Question.created_at.asc()).all()
        q_ids = [q.id for q in questions]
        
        current_index = -1
        # Manual search because list.index() with UUIDs can be tricky
        for i, qid in enumerate(q_ids):
            if str(qid) == str(question_id):
                current_index = i
                break
                
        next_question_id = q_ids[current_index + 1] if current_index != -1 and current_index + 1 < len(q_ids) else None

        return jsonify({
            "id": question.id,
            "question_text": question.question_text,
            "question_type": question.question_type,
            "options": [{"id": o.id, "label": o.label, "text": o.text} for o in question.options],
            "next_question_id": next_question_id
        })

    if request.method == 'POST':
        data = request.get_json()
        
        # Find or create a submission
        submission = Submission.query.filter_by(quiz_id=quiz_id, student_id=student_id).first()
        if not submission:
            submission = Submission(quiz_id=quiz_id, student_id=student_id, classroom_id=question.quiz.classroom_id, status='submitted')
            db.session.add(submission)
            db.session.flush() # Flush to get submission.id
        
        # Check if an answer for this question already exists
        existing_answer = StudentAnswer.query.filter_by(submission_id=submission.id, question_id=question_id).first()
        if existing_answer:
            # Update existing answer
            existing_answer.response_text = data.get('response_text')
            existing_answer.response_image_url = data.get('response_image_url')
        else:
            # Create new answer
            student_answer = StudentAnswer(
                submission_id=submission.id,
                question_id=question_id,
                response_text=data.get('response_text'),
                response_image_url=data.get('response_image_url')
            )
            db.session.add(student_answer)
            
        db.session.commit()
        return jsonify(message="Answer submitted successfully")

@student_bp.route('/<uuid:quiz_id>/result')
@jwt_required()
def quiz_result(quiz_id):
    student_id = get_current_student_id()
    submission = Submission.query.filter_by(quiz_id=quiz_id, student_id=student_id).first_or_404()
    
    # In a real app, you might calculate the score here if it's not already done
    return jsonify({
        "status": submission.status,
        "score": submission.score,
        "submitted_at": submission.submitted_at
    })

@student_bp.route('/<uuid:classroom_id>/report-issue', methods=['POST'])
@jwt_required()
def report_issue(classroom_id):
    student_id = get_current_student_id()
    data = request.get_json()
    new_issue = StudentIssue(
        student_id=student_id,
        classroom_id=classroom_id,
        title=data['title'],
        description=data.get('description'),
        related_type=data.get('related_type'),
        related_id=data.get('related_id'),
        status='open'
    )
    db.session.add(new_issue)
    db.session.commit()
    return jsonify(message="Issue reported successfully"), 201

@student_bp.route('/updates')
@jwt_required()
def student_updates():
    student_id = get_current_student_id()
    notifications = Notification.query.filter_by(user_id=student_id).order_by(Notification.created_at.desc()).all()
    return jsonify([{"id": n.id, "title": n.title, "message": n.message} for n in notifications])

@student_bp.route('/submissions')
@jwt_required()
def submissions(classroom_id):
    return jsonify(message=f"Viewing submissions for classroom {classroom_id}")

@student_bp.route('/feedback')
@jwt_required()
def feedback(classroom_id):
    return jsonify(message=f"Viewing feedback for classroom {classroom_id}") 