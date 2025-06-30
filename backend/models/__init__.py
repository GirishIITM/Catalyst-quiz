import time
import uuid
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy import Enum, ForeignKey, JSON, Text, Boolean, Float, String, Integer, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

# SQLAlchemy instance (should be initialized in main.py and imported here)
db = SQLAlchemy()

# 1. User
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(Enum('teacher', 'student', name='user_roles'), nullable=False)
    metadata = db.Column(JSON, default={})
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Relationships
    classrooms = relationship('Classroom', back_populates='teacher', foreign_keys='Classroom.teacher_id')
    enrollments = relationship('Enrollment', back_populates='student', foreign_keys='Enrollment.student_id')
    notes = relationship('Notes', back_populates='teacher', foreign_keys='Notes.teacher_id')
    submissions = relationship('Submission', back_populates='student', foreign_keys='Submission.student_id')
    student_issues = relationship('StudentIssue', back_populates='student', foreign_keys='StudentIssue.student_id')
    notifications = relationship('Notification', back_populates='user', foreign_keys='Notification.user_id')

# 2. Classroom
class Classroom(db.Model):
    __tablename__ = 'classrooms'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(120), nullable=False)
    teacher_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Relationships
    teacher = relationship('User', back_populates='classrooms', foreign_keys=[teacher_id])
    enrollments = relationship('Enrollment', back_populates='classroom', foreign_keys='Enrollment.classroom_id')
    quizzes = relationship('Quiz', back_populates='classroom', foreign_keys='Quiz.classroom_id')
    student_issues = relationship('StudentIssue', back_populates='classroom', foreign_keys='StudentIssue.classroom_id')

# 3. Enrollment
class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    classroom_id = db.Column(UUID(as_uuid=True), db.ForeignKey('classrooms.id'), nullable=False)
    student_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Relationships
    classroom = relationship('Classroom', back_populates='enrollments', foreign_keys=[classroom_id])
    student = relationship('User', back_populates='enrollments', foreign_keys=[student_id])

# 4. Quiz
class Quiz(db.Model):
    __tablename__ = 'quizzes'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(Text)
    classroom_id = db.Column(UUID(as_uuid=True), db.ForeignKey('classrooms.id'), nullable=False)
    tags = db.Column(ARRAY(db.String), default=[])
    difficulty = db.Column(Enum('easy', 'medium', 'hard', name='quiz_difficulty'), nullable=False)
    is_published = db.Column(Boolean, default=False)
    deadline = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    published_at = db.Column(db.DateTime)
    # Relationships
    classroom = relationship('Classroom', back_populates='quizzes', foreign_keys=[classroom_id])
    questions = relationship('Question', back_populates='quiz', foreign_keys='Question.quiz_id')
    submissions = relationship('Submission', back_populates='quiz', foreign_keys='Submission.quiz_id')

# 5. Question
class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    quiz_id = db.Column(UUID(as_uuid=True), db.ForeignKey('quizzes.id'), nullable=False)
    question_text = db.Column(Text, nullable=False)
    question_type = db.Column(Enum('text', 'mcq_single', 'mcq_multiple', 'image_upload', 'date', 'time', name='question_types'), nullable=False)
    answer_key = db.Column(JSON)
    tags = db.Column(ARRAY(db.String), default=[])
    difficulty = db.Column(Enum('easy', 'medium', 'hard', name='question_difficulty'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Relationships
    quiz = relationship('Quiz', back_populates='questions', foreign_keys=[quiz_id])
    options = relationship('Option', back_populates='question', foreign_keys='Option.question_id')
    student_answers = relationship('StudentAnswer', back_populates='question', foreign_keys='StudentAnswer.question_id')

# 6. Option
class Option(db.Model):
    __tablename__ = 'options'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    question_id = db.Column(UUID(as_uuid=True), db.ForeignKey('questions.id'), nullable=False)
    label = db.Column(db.String(10), nullable=False)
    text = db.Column(Text, nullable=False)
    is_correct = db.Column(Boolean)
    # Relationships
    question = relationship('Question', back_populates='options', foreign_keys=[question_id])

# 7. Notes
class Notes(db.Model):
    __tablename__ = 'notes'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    teacher_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    classroom_id = db.Column(UUID(as_uuid=True), db.ForeignKey('classrooms.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(Text)
    tags = db.Column(ARRAY(db.String), default=[])
    file_url = db.Column(db.String(255))
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Relationships
    teacher = relationship('User', back_populates='notes', foreign_keys=[teacher_id])
    classroom = relationship('Classroom', foreign_keys=[classroom_id])

# 8. Submission
class Submission(db.Model):
    __tablename__ = 'submissions'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    quiz_id = db.Column(UUID(as_uuid=True), db.ForeignKey('quizzes.id'), nullable=False)
    student_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    classroom_id = db.Column(UUID(as_uuid=True), db.ForeignKey('classrooms.id'), nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(Enum('submitted', 'evaluated', name='submission_status'), nullable=False)
    score = db.Column(Float)
    # Relationships
    quiz = relationship('Quiz', back_populates='submissions', foreign_keys=[quiz_id])
    student = relationship('User', back_populates='submissions', foreign_keys=[student_id])
    student_answers = relationship('StudentAnswer', back_populates='submission', foreign_keys='StudentAnswer.submission_id')
    ai_feedback = relationship('AIFeedback', back_populates='submission', foreign_keys='AIFeedback.submission_id')

# 9. Student Answer
class StudentAnswer(db.Model):
    __tablename__ = 'student_answers'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    submission_id = db.Column(UUID(as_uuid=True), db.ForeignKey('submissions.id'), nullable=False)
    question_id = db.Column(UUID(as_uuid=True), db.ForeignKey('questions.id'), nullable=False)
    response_text = db.Column(Text)
    response_image_url = db.Column(db.String(255))
    # Relationships
    submission = relationship('Submission', back_populates='student_answers', foreign_keys=[submission_id])
    question = relationship('Question', back_populates='student_answers', foreign_keys=[question_id])

# 10. AIFeedback
class AIFeedback(db.Model):
    __tablename__ = 'ai_feedbacks'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    submission_id = db.Column(UUID(as_uuid=True), db.ForeignKey('submissions.id'), nullable=False)
    feedback_text = db.Column(Text)
    score_breakdown = db.Column(JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Relationships
    submission = relationship('Submission', back_populates='ai_feedback', foreign_keys=[submission_id])

# 11. StudentIssue
class StudentIssue(db.Model):
    __tablename__ = 'student_issues'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    classroom_id = db.Column(UUID(as_uuid=True), db.ForeignKey('classrooms.id'), nullable=False)
    related_type = db.Column(Enum('quiz', 'note', 'submission', 'general', name='issue_related_type'), nullable=False)
    related_id = db.Column(UUID(as_uuid=True), nullable=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(Text)
    status = db.Column(Enum('open', 'in_progress', 'resolved', 'closed', name='issue_status'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Relationships
    student = relationship('User', back_populates='student_issues', foreign_keys=[student_id])
    classroom = relationship('Classroom', back_populates='student_issues', foreign_keys=[classroom_id])

# 12. Notification
class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    type = db.Column(Enum('quiz_assigned', 'submission_feedback', 'issue_response', 'note_uploaded', 'classroom_update', 'general', name='notification_type'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    message = db.Column(Text)
    is_read = db.Column(Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    related_type = db.Column(Enum('quiz', 'submission', 'issue', 'note', 'classroom', 'none', name='notification_related_type'), nullable=False)
    related_id = db.Column(UUID(as_uuid=True), nullable=True)
    # Relationships
    user = relationship('User', back_populates='notifications', foreign_keys=[user_id])
