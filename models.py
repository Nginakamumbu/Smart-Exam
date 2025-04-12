from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, time, date
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import MetaData, Column, Integer, String, Date, Time, ForeignKey, Enum, Boolean, LargeBinary, Text, TIMESTAMP
from sqlalchemy.orm import relationship
from extensions import db, bcrypt
import enum

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
class FeeStatus(enum.Enum):
    CLEARED = "cleared"
    NOT_CLEARED = "not cleared"

class Admin(db.Model):
    __tablename__ = 'Admins'

    admin_id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    _password_hash = Column(String(128))

    notifications = relationship('Notification', back_populates='admin')

    @hybrid_property
    def password(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"<Admin(admin_id={self.admin_id}, full_name='{self.full_name}')>"

class Student(db.Model):
    __tablename__ = 'Students'

    student_id = Column(Integer, primary_key=True, autoincrement=True)
    reg_no = Column(String(20), unique=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    contact = Column(String(15))
    fee_cleared = Column(Enum(FeeStatus), default=FeeStatus.NOT_CLEARED)
    fingerprint_template = Column(LargeBinary)
    _password_hash = Column(String(128))

    exam_registrations = relationship('ExamRegistration', back_populates='student')
    irregular_activities = relationship('IrregularActivity', back_populates='student')
    notifications = relationship('Notification', back_populates='student')
    time_reminders = relationship('TimeReminder', back_populates='student')
    exam_requirements = relationship('ExamRequirement', back_populates='student')

    @hybrid_property
    def password(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"<Student(student_id={self.student_id}, reg_no='{self.reg_no}', full_name='{self.full_name}')>"

class Examiner(db.Model):
    __tablename__ = 'Examiners'

    examiner_id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    _password_hash = Column(String(128))

    exam_schedules = relationship('ExamSchedule', back_populates='examiner')
    notifications = relationship('Notification', back_populates='examiner')

    @hybrid_property
    def password(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password.setter
    def password(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"<Examiner(examiner_id={self.examiner_id}, full_name='{self.full_name}')>"

class ExamSchedule(db.Model):
    __tablename__ = 'Exam_Schedules'

    schedule_id = Column(Integer, primary_key=True, autoincrement=True)
    exam_id = Column(Integer, ForeignKey('Exams.exam_id'), nullable=False)
    examiner_id = Column(Integer, ForeignKey('Examiners.examiner_id'), nullable=False) # Added examiner_id
    schedule_date = Column(Date, nullable=False)
    start_time = Column(Time)
    end_time = Column(Time, nullable=False)
    venue = Column(String(100))

    exam = relationship('Exam', back_populates='exam_schedules')
    examiner = relationship('Examiner', back_populates='exam_schedules') # Added examiner relationship

    def __repr__(self):
        return f"<ExamSchedule(schedule_id={self.schedule_id}, exam_id={self.exam_id}, schedule_date='{self.schedule_date}')>"

class Exam(db.Model):
    __tablename__ = 'Exams'

    exam_id = Column(Integer, primary_key=True, autoincrement=True)
    course_code = Column(String(20), nullable=False)
    course_name = Column(String(100), nullable=False)

    exam_registrations = relationship('ExamRegistration', back_populates='exam')
    irregular_activities = relationship('IrregularActivity', back_populates='exam')
    surveillance_events = relationship('SurveillanceEvent', back_populates='exam')
    time_reminders = relationship('TimeReminder', back_populates='exam')
    exam_requirements = relationship('ExamRequirement', back_populates='exam')
    exam_schedules = relationship('ExamSchedule', back_populates='exam')

    def __repr__(self):
        return f"<Exam(exam_id={self.exam_id}, course_code='{self.course_code}', course_name='{self.course_name}')>"

class ExamRegistration(db.Model):
    __tablename__ = 'Exam_Registrations'

    registration_id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey('Students.student_id'), nullable=False)
    exam_id = Column(Integer, ForeignKey('Exams.exam_id'), nullable=False)
    registered_on = Column(TIMESTAMP, default=datetime.utcnow)

    student = relationship('Student', back_populates='exam_registrations')
    exam = relationship('Exam', back_populates='exam_registrations')

    def __repr__(self):
        return f"<ExamRegistration(registration_id={self.registration_id}, student_id={self.student_id}, exam_id={self.exam_id})>"

class IrregularActivity(db.Model):
    __tablename__ = 'Irregular_Activities'

    activity_id = Column(Integer, primary_key=True, autoincrement=True)
    exam_id = Column(Integer, ForeignKey('Exams.exam_id'), nullable=False)
    student_id = Column(Integer, ForeignKey('Students.student_id'), nullable=False)
    description = Column(Text)
    reported_by = Column(Integer) # Consider making this a ForeignKey to Examiners or Admins if needed
    reported_at = Column(TIMESTAMP, default=datetime.utcnow)

    exam = relationship('Exam', back_populates='irregular_activities')
    student = relationship('Student', back_populates='irregular_activities')

    def __repr__(self):
        return f"<IrregularActivity(activity_id={self.activity_id}, exam_id={self.exam_id}, student_id={self.student_id})>"

class Notification(db.Model):
    __tablename__ = 'Notifications'

    notification_id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey('Students.student_id'))
    examiner_id = Column(Integer, ForeignKey('Examiners.examiner_id'))
    admin_id = Column(Integer, ForeignKey('Admins.admin_id'))
    message = Column(Text, nullable=False)
    notification_type = Column(String(100))
    sent_at = Column(TIMESTAMP, default=datetime.utcnow)

    student = relationship('Student', back_populates='notifications')
    examiner = relationship('Examiner', back_populates='notifications')
    admin = relationship('Admin', back_populates='notifications')

    def __repr__(self):
        return f"<Notification(notification_id={self.notification_id}, message='{self.message[:50]}...')>"

class SurveillanceEvent(db.Model):
    __tablename__ = 'Surveillance_Events'

    event_id = Column(Integer, primary_key=True, autoincrement=True)
    exam_id = Column(Integer, ForeignKey('Exams.exam_id'), nullable=False)
    camera_id = Column(String(20))
    event_time = Column(TIMESTAMP)
    event_type = Column(String(50))
    description = Column(Text)
    reported_by = Column(Integer) # Consider making this a ForeignKey
    reported_at = Column(TIMESTAMP, default=datetime.utcnow)

    exam = relationship('Exam', back_populates='surveillance_events')

    def __repr__(self):
        return f"<SurveillanceEvent(event_id={self.event_id}, exam_id={self.exam_id}, event_type='{self.event_type}')>"

class TimeReminder(db.Model):
    __tablename__ = 'Time_Reminders'

    reminder_id = Column(Integer, primary_key=True, autoincrement=True)
    exam_id = Column(Integer, ForeignKey('Exams.exam_id'), nullable=False)
    student_id = Column(Integer, ForeignKey('Students.student_id'), nullable=False)
    reminder_time = Column(Time)
    message = Column(Text)

    exam = relationship('Exam', back_populates='time_reminders')
    student = relationship('Student', back_populates='time_reminders')

    def __repr__(self):
        return f"<TimeReminder(reminder_id={self.reminder_id}, exam_id={self.exam_id}, student_id={self.student_id}, reminder_time={self.reminder_time})>"

class ExamRequirement(db.Model):
    __tablename__ = 'Exam_Requirements'

    requirement_id = Column(Integer, primary_key=True, autoincrement=True)
    exam_id = Column(Integer, ForeignKey('Exams.exam_id'), nullable=False)
    requirement_type = Column(String(100), nullable=False)
    met_by_student = Column(Boolean)
    student_id = Column(Integer, ForeignKey('Students.student_id'), nullable=False)

    exam = relationship('Exam', back_populates='exam_requirements')
    student = relationship('Student', back_populates='exam_requirements')

    def __repr__(self):
        return f"<ExamRequirement(requirement_id={self.requirement_id}, exam_id={self.exam_id}, student_id={self.student_id}, requirement_type='{self.requirement_type}')>"