import base64
from models import *
from flask import Flask, request, jsonify
from config import Config
from extensions import db, bcrypt, migrate, jwt
from datetime import datetime
from flask import Blueprint
from http import HTTPStatus


# Define Blueprints
auth_bp = Blueprint('auth', __name__, url_prefix='/')
admin_bp = Blueprint('admin', __name__, url_prefix='/admin')
student_bp = Blueprint('student', __name__, url_prefix='/student')
examiner_bp = Blueprint('examiner', __name__, url_prefix='/examiner')
public_bp = Blueprint('public', __name__)
notification_bp = Blueprint('notifications', __name__, url_prefix='/notifications')
exam_bp = Blueprint('exam', __name__, url_prefix='/exams') # New blueprint for exam related routes

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(student_bp)
    app.register_blueprint(examiner_bp)
    app.register_blueprint(public_bp)
    app.register_blueprint(notification_bp)
    app.register_blueprint(exam_bp) # Register the new exam blueprint

    # Error Handlers
    @app.errorhandler(HTTPStatus.UNAUTHORIZED)
    def unauthorized(e):
        return jsonify({'message': 'Unauthorized access'}), HTTPStatus.UNAUTHORIZED

    @app.errorhandler(HTTPStatus.FORBIDDEN)
    def forbidden(e):
        return jsonify({'message': 'Forbidden'}), HTTPStatus.FORBIDDEN

    @app.errorhandler(HTTPStatus.NOT_FOUND)
    def not_found(e):
        return jsonify({'message': 'Resource not found'}), HTTPStatus.NOT_FOUND

    @app.errorhandler(HTTPStatus.CONFLICT)
    def conflict(e):
        return jsonify({'message': 'Resource already exists'}), HTTPStatus.CONFLICT

    @app.errorhandler(HTTPStatus.BAD_REQUEST)
    def bad_request(e):
        return jsonify({'message': 'Invalid request'}), HTTPStatus.BAD_REQUEST

    @app.errorhandler(Exception)
    def internal_server_error(e):
        app.logger.error(f"Internal Server Error: {e}")
        return jsonify({'message': 'Internal server error'}), HTTPStatus.INTERNAL_SERVER_ERROR

    return app

# Authentication Routes (in auth_bp)
@auth_bp.route('/login/student', methods=['POST'])
def login_student():
    data = request.get_json()
    reg_no = data.get('reg_no')
    password = data.get('password')

    student = Student.query.filter_by(reg_no=reg_no).first()

    if student and student.authenticate(password):
        # You would typically return a session token or similar mechanism here instead of JWT
        return jsonify({'message': 'Student logged in successfully', 'student_id': student.student_id}), HTTPStatus.OK
    return jsonify({'message': 'Invalid registration number or password'}), HTTPStatus.UNAUTHORIZED

@auth_bp.route('/login/admin', methods=['POST'])
def login_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    admin = Admin.query.filter_by(email=email).first()

    if admin and admin.authenticate(password):
        # You would typically return a session token or similar mechanism here instead of JWT
        return jsonify({'message': 'Admin logged in successfully', 'admin_id': admin.admin_id}), HTTPStatus.OK
    return jsonify({'message': 'Invalid email or password'}), HTTPStatus.UNAUTHORIZED

@auth_bp.route('/login/examiner', methods=['POST'])
def login_examiner():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    examiner = Examiner.query.filter_by(email=email).first()

    if examiner and examiner.authenticate(password):
        # You would typically return a session token or similar mechanism here instead of JWT
        return jsonify({'message': 'Examiner logged in successfully', 'examiner_id': examiner.examiner_id}), HTTPStatus.OK
    return jsonify({'message': 'Invalid email or password'}), HTTPStatus.UNAUTHORIZED

# Admin Routes (in admin_bp)
@admin_bp.route('/register/admin', methods=['POST'])
def register_admin():
    # You would typically implement authentication/authorization checks here
    # to ensure only existing admins can register new admins

    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')

    if not full_name or not email or not password:
        return jsonify({'message': 'Full name, email, and password are required'}), HTTPStatus.BAD_REQUEST

    if Admin.query.filter_by(email=email).first():
        return jsonify({'message': 'Admin with this email already exists'}), HTTPStatus.CONFLICT

    new_admin = Admin(full_name=full_name, email=email)
    new_admin.password = password  # Password will be hashed by the model setter
    db.session.add(new_admin)
    db.session.commit()

    return jsonify({'message': 'Admin registered successfully!', 'admin_id': new_admin.admin_id}), HTTPStatus.CREATED

@admin_bp.route('/register/examiner', methods=['POST'])
def register_examiner():
    # You would typically implement authentication/authorization checks here
    # to ensure only existing admins can register new examiners

    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')

    if not full_name or not email or not password:
        return jsonify({'message': 'Full name, email, and password are required'}), HTTPStatus.BAD_REQUEST

    if Examiner.query.filter_by(email=email).first():
        return jsonify({'message': 'Examiner with this email already exists'}), HTTPStatus.CONFLICT

    new_examiner = Examiner(full_name=full_name, email=email)
    new_examiner.password = password  # Password will be hashed by the model setter
    db.session.add(new_examiner)
    db.session.commit()

    return jsonify({'message': 'Examiner registered successfully!', 'examiner_id': new_examiner.examiner_id}), HTTPStatus.CREATED


@admin_bp.route('/register/student', methods=['POST'])
def admin_register_student():
    # You would need to implement authentication/authorization checks here
    # based on your chosen method (e.g., checking for an admin session)

    data = request.get_json()
    reg_no = data.get('reg_no')
    full_name = data.get('full_name')
    contact = data.get('contact')
    password = data.get('password')
    fingerprint_data = data.get('fingerprint')

    if not reg_no or not full_name or not password or not fingerprint_data:
        return jsonify({'message': 'All fields including fingerprint are required'}), HTTPStatus.BAD_REQUEST

    if Student.query.filter_by(reg_no=reg_no).first():
        return jsonify({'message': 'Student with this registration number already exists'}), HTTPStatus.CONFLICT

    try:
        fingerprint_binary = base64.b64decode(fingerprint_data)
    except Exception as e:
        return jsonify({'message': 'Invalid fingerprint data'}), HTTPStatus.BAD_REQUEST

    new_student = Student(
        reg_no=reg_no,
        full_name=full_name,
        contact=contact,
        fingerprint_template=fingerprint_binary
    )
    new_student.password = password
    db.session.add(new_student)
    db.session.commit()

    notification = Notification(
        student_id=new_student.student_id,
        message=f"Welcome {full_name}, your registration was successful!",
        sent_at=datetime.utcnow()
    )
    db.session.add(notification)
    db.session.commit()

    return jsonify({'message': 'Student registered successfully!', 'student_id': new_student.student_id}), HTTPStatus.CREATED

@admin_bp.route('/student/<int:student_id>/fee_status', methods=['PUT'])
def update_fee_status(student_id):
    # You would need to implement authentication/authorization checks here

    data = request.get_json()
    fee_status_str = data.get("fee_cleared")

    if not fee_status_str or fee_status_str not in ["cleared", "not cleared"]:
        return jsonify({'message': 'Invalid input: fee_cleared must be "cleared" or "not cleared"'}), HTTPStatus.BAD_REQUEST

    student = Student.query.get(student_id)
    if not student:
        return jsonify({'message': 'Student not found'}), HTTPStatus.NOT_FOUND

    try:
        student.fee_cleared = FeeStatus(fee_status_str) # Convert string to Enum member
    except ValueError:
        return jsonify({'message': 'Invalid fee_cleared value'}), HTTPStatus.BAD_REQUEST

    db.session.commit()

    return jsonify({'message': 'Fee status updated successfully'}), HTTPStatus.OK
@exam_bp.route('', methods=['POST'])
def create_exam():
    """Creates a new exam."""
    data = request.get_json()
    course_code = data.get('course_code')
    course_name = data.get('course_name')

    if not course_code or not course_name:
        return jsonify({'message': 'Course code and course name are required'}), HTTPStatus.BAD_REQUEST

    new_exam = Exam(
        course_code=course_code,
        course_name=course_name
    )
    db.session.add(new_exam)
    db.session.commit()

    return jsonify({'message': 'Exam created successfully', 'exam_id': new_exam.exam_id}), HTTPStatus.CREATED

@exam_bp.route('/schedule', methods=['POST'])
def create_exam_schedule():
    """Creates a new exam schedule for an existing exam."""
    data = request.get_json()
    exam_id = data.get('exam_id')
    examiner_id = data.get('examiner_id')
    schedule_date_str = data.get('schedule_date')
    start_time_str = data.get('start_time')
    end_time_str = data.get('end_time')
    venue = data.get('venue')

    if not exam_id or not examiner_id or not schedule_date_str or not end_time_str:
        return jsonify({'message': 'Exam ID, examiner ID, schedule date, and end time are required'}), HTTPStatus.BAD_REQUEST

    exam = Exam.query.get(exam_id)
    if not exam:
        return jsonify({'message': 'Exam not found'}), HTTPStatus.NOT_FOUND

    examiner = Examiner.query.get(examiner_id)
    if not examiner:
        return jsonify({'message': 'Examiner not found'}), HTTPStatus.NOT_FOUND

    try:
        schedule_date = datetime.strptime(schedule_date_str, '%Y-%m-%d').date()
        start_time = datetime.strptime(start_time_str, '%H:%M:%S').time() if start_time_str else None
        end_time = datetime.strptime(end_time_str, '%H:%M:%S').time()
    except ValueError:
        return jsonify({'message': 'Invalid date or time format'}), HTTPStatus.BAD_REQUEST

    new_schedule = ExamSchedule(
        exam_id=exam_id,
        examiner_id=examiner_id,
        schedule_date=schedule_date,
        start_time=start_time,
        end_time=end_time,
        venue=venue
    )
    db.session.add(new_schedule)
    db.session.commit()

    return jsonify({'message': 'Exam schedule created successfully', 'schedule_id': new_schedule.schedule_id}), HTTPStatus.CREATED

@exam_bp.route('/<int:exam_id>', methods=['GET'])
def get_exam(exam_id):
    exam = Exam.query.get(exam_id)
    if exam:
        return jsonify({
            'exam_id': exam.exam_id,
            'course_code': exam.course_code,
            'course_name': exam.course_name,
            
        }), HTTPStatus.OK
    return jsonify({'message': 'Exam not found'}), HTTPStatus.NOT_FOUND

# Public Routes (in public_bp)
@public_bp.route('/verify/fingerprint', methods=['POST'])
def verify_fingerprint():
    data = request.get_json()
    reg_no = data.get('reg_no')
    fingerprint_data = data.get('fingerprint_data')
    exam_id = data.get('exam_id') # Get exam_id for verification context

    student = Student.query.filter_by(reg_no=reg_no).first()
    exam = Exam.query.get(exam_id)

    if not student:
        return jsonify({'message': 'Student not found'}), HTTPStatus.NOT_FOUND
    if not exam:
        return jsonify({'message': 'Exam not found'}), HTTPStatus.NOT_FOUND
    if not fingerprint_data:
        return jsonify({'message': 'Fingerprint data not provided'}), HTTPStatus.BAD_REQUEST

    # --- Placeholder for actual fingerprint matching ---
    fingerprint_match = True

    # Check if the student is registered for the specific exam and fees are cleared
    registration = ExamRegistration.query.filter_by(student_id=student.student_id, exam_id=exam.exam_id).first()

    if fingerprint_match and student.fee_cleared and registration:
        # Further checks if the current time is within the exam schedule could be added
        return jsonify({'message': 'Fingerprint verified successfully. Student authorized for this exam.'}), HTTPStatus.OK
    elif not student.fee_cleared:
        return jsonify({'message': 'Student fees are not cleared'}), HTTPStatus.FORBIDDEN
    elif not registration:
        return jsonify({'message': 'Student is not registered for this exam'}), HTTPStatus.FORBIDDEN
    else:
        return jsonify({'message': 'Fingerprint verification failed'}), HTTPStatus.UNAUTHORIZED

# Student Routes (in student_bp)
@student_bp.route('/register/exam/<int:exam_id>', methods=['POST'])
def register_for_exam(exam_id):
    # You would need to implement authentication/authorization checks here
    # to identify the logged-in student

    data = request.get_json() # You might need to get student info from the session or another source
    student_id = data.get('student_id') # Assuming you have a way to identify the student
    exam = Exam.query.get(exam_id)
    student = Student.query.get(student_id)

    if not student:
        return jsonify({'message': 'Student not found'}), HTTPStatus.NOT_FOUND
    if not exam:
        return jsonify({'message': 'Exam not found'}), HTTPStatus.NOT_FOUND

    if ExamRegistration.query.filter_by(student_id=student_id, exam_id=exam.exam_id).first():
        return jsonify({'message': 'Student already registered for this exam'}), HTTPStatus.CONFLICT

    if not student.fee_cleared:
        return jsonify({'message': 'Student fees are not cleared'}), HTTPStatus.FORBIDDEN

    new_registration = ExamRegistration(student_id=student_id, exam_id=exam.exam_id)
    db.session.add(new_registration)
    db.session.commit()
    return jsonify({'message': 'Student registered for the exam successfully'}), HTTPStatus.CREATED

# Examiner Routes (in examiner_bp)
@examiner_bp.route('/report/irregular', methods=['POST'])
def report_irregular_activity():
    # You would need to implement authentication/authorization checks here
    # to identify the logged-in examiner

    data = request.get_json() # You might need to get examiner info from the session or another source
    examiner_id = data.get('examiner_id') # Assuming you have a way to identify the examiner
    exam_id = data.get('exam_id')
    student_id = data.get('student_id')
    description = data.get('description')

    exam = Exam.query.get(exam_id)
    student = Student.query.get(student_id)
    examiner = Examiner.query.get(examiner_id)

    if not exam or not student or not examiner:
        return jsonify({'message': 'Invalid exam, student, or examiner ID'}), HTTPStatus.BAD_REQUEST

    new_activity = IrregularActivity(exam_id=exam_id, student_id=student_id,
                                        description=description, reported_by=examiner_id)
    db.session.add(new_activity)
    db.session.commit()

    notification_message = f"Irregular activity reported for student {student.full_name} in exam {exam.course_name}: {description} by Examiner {examiner.full_name}"
    new_notification = Notification(examiner_id=examiner_id, message=notification_message, notification_type='irregular_activity')
    db.session.add(new_notification)
    db.session.commit()

    return jsonify({'message': 'Irregular activity reported successfully'}), HTTPStatus.CREATED

# Notification Routes (in notification_bp)
@notification_bp.route('/send', methods=['POST'])
def send_notification():
    # You would need to implement authentication/authorization checks here

    data = request.get_json()
    recipient_type = data.get('recipient_type')
    recipient_id = data.get('recipient_id')
    message = data.get('message')

    if not recipient_type or not recipient_id or not message:
        return jsonify({'message': 'Recipient type, recipient ID, and message are required'}), HTTPStatus.BAD_REQUEST

    new_notification = Notification(message=message)

    if recipient_type == 'student':
        student = Student.query.get(recipient_id)
        if not student:
            return jsonify({'message': 'Student recipient not found'}), HTTPStatus.NOT_FOUND
        new_notification.student_id = recipient_id
    elif recipient_type == 'examiner':
        examiner = Examiner.query.get(recipient_id)
        if not examiner:
            return jsonify({'message': 'Examiner recipient not found'}), HTTPStatus.NOT_FOUND
        new_notification.examiner_id = recipient_id
    elif recipient_type == 'admin':
        admin = Admin.query.get(recipient_id)
        if not admin:
            return jsonify({'message': 'Admin recipient not found'}), HTTPStatus.NOT_FOUND
        new_notification.admin_id = recipient_id
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({'message': 'Notification sent successfully'}), HTTPStatus.CREATED

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)