from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from models import (
    db,
    User,
    Classroom,
    Enrollment,
    Quiz,
    Question,
    Notification,
    StudentIssue,
)
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from sqlalchemy.orm import joinedload

teacher_bp = Blueprint("teacher", __name__, url_prefix="/teacher")


def get_current_teacher_id():
    identity = get_jwt_identity()
    claims = get_jwt()
    if claims.get("role") != "teacher":
        raise Exception("Teacher role required")
    return identity


# Ensure question_type in API requests is one of: text, mcq_single, mcq_multiple, image_upload, date, time


# CLASSROOM MANAGEMENT
@teacher_bp.route("/add-classroom", methods=["POST"])
@jwt_required()
def add_classroom():
    try:
        teacher_id = get_current_teacher_id()
        print(f"[DEBUG] Creating classroom for teacher_id: {teacher_id}")
        data = request.get_json()
        if not data or "name" not in data:
            return jsonify(message="Classroom name is required"), 400

        new_classroom = Classroom(name=data["name"], teacher_id=teacher_id)
        db.session.add(new_classroom)
        db.session.commit()
        db.session.refresh(new_classroom)
        print(
            f"[DEBUG] Created classroom with id: {new_classroom.id} and teacher_id: {new_classroom.teacher_id}"
        )
        return jsonify(
            {
                "message": "Classroom created successfully",
                "classroom_id": new_classroom.id,
            }
        ), 201
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/<uuid:classroom_id>", methods=["PUT"])
@jwt_required()
def edit_classroom(classroom_id):
    try:
        teacher_id = get_current_teacher_id()
        classroom = Classroom.query.filter_by(
            id=classroom_id, teacher_id=teacher_id
        ).first_or_404(description="Classroom not found or you don't have permission.")
        data = request.get_json()
        classroom.name = data.get("name", classroom.name)
        db.session.commit()
        return jsonify(message="Classroom updated successfully")
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/<uuid:classroom_id>", methods=["DELETE"])
@jwt_required()
def delete_classroom(classroom_id):
    try:
        teacher_id = get_current_teacher_id()
        classroom = Classroom.query.filter_by(
            id=classroom_id, teacher_id=teacher_id
        ).first_or_404(description="Classroom not found or you don't have permission.")
        db.session.delete(classroom)
        db.session.commit()
        return jsonify(message="Classroom deleted successfully")
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/students-search", methods=["GET"])
@teacher_bp.route("/<uuid:classroom_id>/students-search", methods=["GET"])
@jwt_required()
def get_students(classroom_id=None):
    try:
        query = request.args.get("query", "").strip()
        students_query = User.query.filter(
            or_(User.username.ilike(f"%{query}%"), User.email.ilike(f"%{query}%")),
            User.role == "student",
        )
        if classroom_id:
            enrolled_ids = {
                e.student_id
                for e in Enrollment.query.filter_by(classroom_id=classroom_id).all()
            }
            filtered = [s for s in students_query.all() if s.id in enrolled_ids]
        else:
            filtered = students_query.all()
        result = [
            s.as_dict()
            if hasattr(s, "as_dict")
            else {"id": s.id, "username": s.username, "email": s.email}
            for s in filtered
        ]
        return jsonify(result), 200
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/<uuid:classroom_id>/add-student", methods=["POST"])
@jwt_required()
def add_student(classroom_id):
    try:
        teacher_id = get_current_teacher_id()
        Classroom.query.filter_by(id=classroom_id, teacher_id=teacher_id).first_or_404(
            description="Classroom not found or you don't have permission."
        )

        data = request.get_json()
        student = User.query.filter_by(email=data["email"], role="student").first()
        if not student:
            return jsonify(message="Student with that email not found"), 404

        if Enrollment.query.filter_by(
            classroom_id=classroom_id, student_id=student.id
        ).first():
            return jsonify(message="Student already enrolled in this classroom"), 409

        enrollment = Enrollment(classroom_id=classroom_id, student_id=student.id)
        notification = Notification(
            user_id=student.id,
            type="classroom_update",
            title="Added to new class",
            message="You have been added to a new classroom.",
            related_type="none",
        )

        db.session.add(enrollment)
        db.session.add(notification)
        db.session.commit()
        return jsonify(message="Student added and notified successfully"), 201
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


# QUIZ & QUESTION MANAGEMENT
@teacher_bp.route("/<uuid:classroom_id>/add-quiz", methods=["POST"])
@jwt_required()
def add_quiz(classroom_id):
    try:
        teacher_id = get_current_teacher_id()
        print(
            f"[DEBUG] Adding quiz to classroom_id: {classroom_id} for teacher_id: {teacher_id}"
        )
        classroom = Classroom.query.filter_by(
            id=classroom_id, teacher_id=teacher_id
        ).first_or_404(description="Classroom not found or you don't have permission.")

        data = request.get_json()
        new_quiz = Quiz(
            classroom_id=classroom_id,
            title=data["title"],
            description=data.get("description"),
            difficulty=data["difficulty"],
            deadline=data.get("deadline"),
        )
        db.session.add(new_quiz)

        enrollments = Enrollment.query.filter_by(classroom_id=classroom_id).all()
        for enrollment in enrollments:
            notification = Notification(
                user_id=enrollment.student_id,
                type="quiz_assigned",
                title="New Quiz Assigned",
                message=f"A new quiz '{new_quiz.title}' has been assigned.",
                related_type="none",
            )
            db.session.add(notification)

        db.session.commit()
        print(
            f"[DEBUG] Created quiz with id: {new_quiz.id} for classroom_id: {classroom_id}"
        )
        return jsonify(
            {"message": "Quiz added and students notified", "quiz_id": str(new_quiz.id)}
        ), 201
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/quiz/<uuid:quiz_id>", methods=["PUT"])
@jwt_required()
def edit_quiz(quiz_id):
    try:
        teacher_id = get_current_teacher_id()
        quiz = Quiz.query.get_or_404(quiz_id)
        print(
            f"[DEBUG] Editing quiz_id: {quiz_id}, quiz.classroom_id: {quiz.classroom_id}, classroom.teacher_id: {quiz.classroom.teacher_id}, current teacher_id: {teacher_id}"
        )
        if str(quiz.classroom.teacher_id) != str(teacher_id):
            return jsonify(message="You don't have permission to edit this quiz"), 403
        data = request.get_json()
        quiz.title = data.get("title", quiz.title)
        quiz.description = data.get("description", quiz.description)
        quiz.is_published = data.get("is_published", quiz.is_published)
        db.session.commit()
        return jsonify(message="Quiz updated successfully")
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/quiz/<uuid:quiz_id>", methods=["DELETE"])
@jwt_required()
def delete_quiz(quiz_id):
    try:
        teacher_id = get_current_teacher_id()
        quiz = Quiz.query.get_or_404(quiz_id)
        print(
            f"[DEBUG] Deleting quiz_id: {quiz_id}, quiz.classroom_id: {quiz.classroom_id}, classroom.teacher_id: {quiz.classroom.teacher_id}, current teacher_id: {teacher_id}"
        )
        if str(quiz.classroom.teacher_id) != str(teacher_id):
            return jsonify(message="You don't have permission to delete this quiz"), 403
        db.session.delete(quiz)
        db.session.commit()
        return jsonify(message="Quiz deleted successfully")
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/<uuid:quiz_id>/add-question", methods=["POST"])
@jwt_required()
def add_question(quiz_id):
    try:
        data = request.get_json()
        new_question = Question(
            quiz_id=quiz_id,
            question_text=data["question_text"],
            question_type=data["question_type"],
            answer_key=data.get("answer_key"),
            difficulty=data.get("difficulty", "medium"),
        )
        db.session.add(new_question)
        db.session.commit()
        return jsonify(
            {
                "message": "Question added successfully",
                "question_id": str(new_question.id),
            }
        ), 201
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/question/<uuid:question_id>", methods=["PUT", "DELETE"])
@jwt_required()
def manage_question(question_id):
    try:
        teacher_id = get_current_teacher_id()
        question = Question.query.get_or_404(question_id)
        # Add authorization check
        if str(question.quiz.classroom.teacher_id) != str(teacher_id):
            return jsonify(
                message="You don't have permission to modify this question"
            ), 403
        if request.method == "PUT":
            data = request.get_json()
            question.question_text = data.get("question_text", question.question_text)
            question.answer_key = data.get("answer_key", question.answer_key)
            db.session.commit()
            return jsonify(message="Question updated successfully")
        if request.method == "DELETE":
            db.session.delete(question)
            db.session.commit()
            return jsonify(message="Question deleted successfully")
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


# OTHER TEACHER ROUTES
@teacher_bp.route("/student-issues")
@jwt_required()
def get_student_issues():
    try:
        teacher_id = get_current_teacher_id()
        issues = (
            db.session.query(StudentIssue)
            .join(Classroom)
            .filter(Classroom.teacher_id == teacher_id)
            .all()
        )
        return jsonify(
            [
                {
                    "id": i.id,
                    "title": i.title,
                    "description": i.description,
                    "status": i.status,
                }
                for i in issues
            ]
        )
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/updates")
@jwt_required()
def teacher_updates():
    try:
        teacher_id = get_current_teacher_id()
        notifications = (
            Notification.query.filter_by(user_id=teacher_id)
            .order_by(Notification.created_at.desc())
            .all()
        )
        return jsonify(
            [
                {"id": n.id, "title": n.title, "message": n.message}
                for n in notifications
            ]
        )
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


teacher_no_classroom_bp = Blueprint(
    "teacher_no_classroom", __name__, url_prefix="/teacher"
)


@teacher_no_classroom_bp.route("/my-quizzes")
@jwt_required()
def my_quizzes():
    try:
        teacher_id = get_current_teacher_id()

        quizzes = (
            db.session.query(Quiz)
            .join(Classroom)
            .filter(Classroom.teacher_id == teacher_id)
            .options(joinedload(Quiz.classroom), joinedload(Quiz.questions))
            .all()
        )

        quiz_data = []
        for quiz in quizzes:
            quiz_data.append(
                {
                    "id": str(quiz.id),
                    "title": quiz.title,
                    "description": quiz.description,
                    "difficulty": quiz.difficulty,
                    "deadline": quiz.deadline.isoformat() if quiz.deadline else None,
                    "is_published": quiz.is_published,
                    "created_at": quiz.created_at.isoformat(),
                    "question_count": len(quiz.questions),
                    "classroom_name": quiz.classroom.name,
                }
            )

        return jsonify({"data": quiz_data})
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_no_classroom_bp.route("/evaluation")
@jwt_required()
def evaluation():
    try:
        return jsonify(message="Teacher evaluation page")
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_no_classroom_bp.route("/feedback")
@jwt_required()
def feedback():
    try:
        return jsonify(message="Teacher feedback page")
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_no_classroom_bp.route("/submissions")
@jwt_required()
def submissions():
    try:
        return jsonify(message="Teacher submissions page")
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_no_classroom_bp.route("/profile", methods=["GET", "PUT"])
@jwt_required()
def teacher_profile():
    try:
        teacher_id = get_current_teacher_id()
        user = User.query.get_or_404(teacher_id)

        if request.method == "GET":
            return jsonify(
                {
                    "username": user.username,
                    "email": user.email,
                    "user_metadata": user.user_metadata,
                }
            )
        elif request.method == "PUT":
            data = request.get_json()
            user.username = data.get("username", user.username)
            user.email = data.get("email", user.email)
            user.user_metadata = data.get("user_metadata", user.user_metadata)
            db.session.commit()
            return jsonify(message="Profile updated successfully")
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/classrooms", methods=["GET"])
@jwt_required()
def get_classrooms():
    try:
        teacher_id = get_current_teacher_id()
        classrooms = Classroom.query.filter_by(teacher_id=teacher_id).all()
        return jsonify([{"id": str(c.id), "name": c.name} for c in classrooms])
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500


@teacher_bp.route("/classrooms-and-students", methods=["GET"])
@jwt_required()
def get_classrooms_and_students():
    try:
        teacher_id = get_current_teacher_id()
        classrooms = (
            Classroom.query.filter_by(teacher_id=teacher_id)
            .options(joinedload(Classroom.students))
            .all()
        )
        return jsonify(
            [
                {
                    "id": str(c.id),
                    "name": c.name,
                    "students": [
                        {"id": str(s.id), "name": s.username} for s in c.students
                    ],
                }
                for c in classrooms
            ]
        )
    except Exception as e:
        print(str(e))
        return jsonify(message="Internal server error"), 500
