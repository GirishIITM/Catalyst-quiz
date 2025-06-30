from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .models import (
    User,
    Classroom,
    Enrollment,
    Quiz,
    Question,
    Option,
    Notes,
    Submission,
    StudentAnswer,
    AIFeedback,
    StudentIssue,
    Notification
)
