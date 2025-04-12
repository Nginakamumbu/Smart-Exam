import os
import random
import string
from datetime import datetime, date, time, timedelta

from app import create_app  # Import create_app from app.py
from config import Config
from extensions import db, bcrypt
from models import Admin, Student, Examiner, ExamSchedule, Exam, ExamRegistration, IrregularActivity, Notification, SurveillanceEvent, TimeReminder, ExamRequirement, FeeStatus  # Import FeeStatus

# List of Kenyan first names (common and diverse)
kenyan_first_names = [
    "Akinyi", "Juma", "Wanjiru", "Kamau", "Atieno", "Onyango", "Njeri", "Kiprotich", "Zawadi", "Imani",
    "Baraka", "Zola", "Ayana", "Simba", "Mumbi", "Mwangi", "Chebet", "Korir", "Salim", "Fatuma",
    "Ali", "Naomi", "David", "Sarah", "Joseph", "Esther", "Daniel", "Rebecca", "Samuel", "Mercy"
]

# List of Kenyan last names (common and diverse)
kenyan_last_names = [
    "Ochieng", "Otieno", "Wambui", "Kariuki", "Adhiambo", "Oloo", "Mwangi", "Chepkwony", "Mwakazi", "Juma",
    "Abdullahi", "Omar", "Njoroge", "Kamau", "Koech", "Sang", "Maina", "Wanjala", "Kemboi", "Ayub",
    "Hassan", "Ali", "Mwangi", "Onyango", "Wanjiru", "Kariuki", "Atieno", "Ochieng", "Njeri", "Kamau"
]

def generate_random_string(length=10):
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))

def generate_kenyan_name():
    first_name = random.choice(kenyan_first_names)
    last_name = random.choice(kenyan_last_names)
    return f"{first_name} {last_name}"

def generate_random_reg_no(i):
    return f"ENE212-{i+1:03d}/2020"

def generate_random_email(name, domain):
    return f"{name.lower().replace(' ', '.')}@{domain}"

def generate_random_date(start_year=2024, end_year=2025):
    start = date(start_year, 1, 1)
    end = date(end_year, 12, 31)
    return start + timedelta(days=random.randint(0, (end - start).days))

def generate_random_time():
    return time(random.randint(8, 17), random.randint(0, 59), random.randint(0, 59))

def clear_database(app):
    with app.app_context():
        meta = db.metadata
        for table in reversed(meta.sorted_tables):
            if table.name != 'alembic_version':  # Prevent dropping Alembic's version table
                print(f"Clearing table: {table.name}")
                db.session.execute(table.delete())
        db.session.commit()
        print("All tables cleared.")

def seed_database():
    app = create_app()  # Create the Flask app instance
    with app.app_context():
        clear_database(app)  # Clear all tables before seeding
        db.create_all()  # Ensure tables are created (in case they were dropped)
        print("Starting database seeding...")

        # --- Admins ---
        admins_data = [
            {"full_name": "Asaph Muhia", "email": "asaph.muhia@admin.jkuat.ke", "password": "7980"}
        ]
        admins = []
        for data in admins_data:
            admin = Admin(full_name=data["full_name"], email=data["email"])
            admin.password = data["password"]
            admins.append(admin)
            db.session.add(admin)
        db.session.commit()  # Commit Admins

        # --- Students ---
        students_data = [
            {"full_name": "Faith Ngina", "reg_no": "ENE212-001/2020", "fee_cleared": FeeStatus.CLEARED, "password": "1234"},
            {"full_name": "Judy Wangechi", "reg_no": "ENE212-002/2020", "fee_cleared": FeeStatus.NOT_CLEARED, "password": "5678"},
            {"full_name": generate_kenyan_name(), "reg_no": generate_random_reg_no(2), "fee_cleared": random.choice([FeeStatus.CLEARED, FeeStatus.NOT_CLEARED]), "password": "9012"},
            {"full_name": generate_kenyan_name(), "reg_no": generate_random_reg_no(3), "fee_cleared": random.choice([FeeStatus.CLEARED, FeeStatus.NOT_CLEARED]), "password": "3456"},
            {"full_name": generate_kenyan_name(), "reg_no": generate_random_reg_no(4), "fee_cleared": random.choice([FeeStatus.CLEARED, FeeStatus.NOT_CLEARED]), "password": "7890"},
            {"full_name": generate_kenyan_name(), "reg_no": generate_random_reg_no(5), "fee_cleared": random.choice([FeeStatus.CLEARED, FeeStatus.NOT_CLEARED]), "password": "1235"},
            {"full_name": generate_kenyan_name(), "reg_no": generate_random_reg_no(6), "fee_cleared": random.choice([FeeStatus.CLEARED, FeeStatus.NOT_CLEARED]), "password": "5677"},
            {"full_name": generate_kenyan_name(), "reg_no": generate_random_reg_no(7), "fee_cleared": random.choice([FeeStatus.CLEARED, FeeStatus.NOT_CLEARED]), "password": "9013"},
            {"full_name": generate_kenyan_name(), "reg_no": generate_random_reg_no(8), "fee_cleared": random.choice([FeeStatus.CLEARED, FeeStatus.NOT_CLEARED]), "password": "3455"},
            {"full_name": generate_kenyan_name(), "reg_no": generate_random_reg_no(9), "fee_cleared": random.choice([FeeStatus.CLEARED, FeeStatus.NOT_CLEARED]), "password": generate_random_string(8)} # Keeping one random password
        ]
        students = []
        for data in students_data:
            student = Student(reg_no=data["reg_no"], full_name=data["full_name"], contact='07' + ''.join(random.choice(string.digits) for _ in range(8)), fingerprint_template=os.urandom(100), fee_cleared=data["fee_cleared"])
            student.password = data["password"]
            students.append(student)
            db.session.add(student)
        db.session.commit()  # Commit Students

        # --- Examiners ---
        examiners_data = [
            {"full_name": "Drew Muchene", "email": "drew.muchene@examiner.jkuat.ke", "password": "3544"},
            {"full_name": "Alicia Achieng", "email": "alicia.achieng@examiner.jkuat.ke", "password": "9100"},
            {"full_name": "Mary Muthoni", "email": "mary.muthoni@examiner.jkuat.ke", "password": "5687"}
        ]
        examiners = []
        for data in examiners_data:
            examiner = Examiner(full_name=data["full_name"], email=data["email"])
            examiner.password = data["password"]
            examiners.append(examiner)
            db.session.add(examiner)
        db.session.commit()  # Commit Examiners

        # --- Exams ---
        exams_data = [
            {"course_code": "ENG101", "course_name": "Introduction to English", "examiner": examiners[0]},
            {"course_code": "MAT205", "course_name": "Advanced Mathematics", "examiner": examiners[1]},
            {"course_code": "SCI102", "course_name": "Basic Science", "examiner": examiners[2]},
            {"course_code": "COM301", "course_name": "Communication Skills", "examiner": random.choice(examiners)}
        ]
        exams = []
        for data in exams_data:
            exam = Exam(course_code=data["course_code"], course_name=data["course_name"])
            exams.append(exam)
            db.session.add(exam)
        db.session.commit()  # Commit exams first to get their IDs

        # --- Exam Schedules ---
        exam_schedules = []
        for exam_data in exams_data:  # Iterate through exam data
            exam = db.session.get(Exam, exams[exams_data.index(exam_data)].exam_id)
            schedule_date = generate_random_date()
            start_time = generate_random_time()
            end_time = (datetime.combine(date.today(), start_time) + timedelta(hours=2)).time()
            venue = random.choice(["Lecture Hall A", "Lecture Hall B", "Main Auditorium"])
            examiner_id = exam_data["examiner"].examiner_id
            schedule = ExamSchedule(exam_id=exam.exam_id, examiner_id=examiner_id, schedule_date=schedule_date, start_time=start_time, end_time=end_time, venue=venue)
            exam_schedules.append(schedule)
            db.session.add(schedule)
        db.session.commit()

        # --- Exam Registrations ---
        exam_registrations = []
        for student in students:
            num_registrations = random.randint(1, len(exams))
            registered_exams = random.sample(exams, num_registrations)
            for exam in registered_exams:
                registration = ExamRegistration(student_id=student.student_id, exam_id=exam.exam_id, registered_on=datetime.utcnow())
                exam_registrations.append(registration)
                db.session.add(registration)
        db.session.commit()

        # --- Irregular Activities ---
        irregular_activities = []
        for _ in range(5):
            student = random.choice(students)
            exam = random.choice(exams)
            examiner = random.choice(examiners)
            activity = IrregularActivity(exam_id=exam.exam_id, student_id=student.student_id, description=f"Observed {generate_random_string(20)}", reported_by=examiner.examiner_id, reported_at=datetime.utcnow())
            irregular_activities.append(activity)
            db.session.add(activity)
        db.session.commit()

        # --- Notifications ---
        notifications = []
        for student in students[:3]: # Sending to the first 3 students
            notification = Notification(student_id=student.student_id, message=f"Welcome to the Smart Exam System, {student.full_name}!", sent_at=datetime.utcnow(), notification_type="registration")
            notifications.append(notification)
            db.session.add(notification)
        for examiner in examiners:
            notification = Notification(examiner_id=examiner.examiner_id, message=f"New exams scheduled for you.", sent_at=datetime.utcnow(), notification_type="exam_schedule")
            notifications.append(notification)
            db.session.add(notification)
        db.session.commit()

        # --- Surveillance Events ---
        surveillance_events = []
        for exam in exams:
            for _ in range(2):
                event_time = datetime.utcnow() - timedelta(minutes=random.randint(1, 60))
                event = SurveillanceEvent(exam_id=exam.exam_id, camera_id=f"CAM-{random.randint(10, 50)}", event_time=event_time, event_type=random.choice(["suspicious_movement", "unauthorized_item"]), description=generate_random_string(30), reported_by=random.choice([e.examiner_id for e in examiners] + [a.admin_id for a in admins]), reported_at=datetime.utcnow())
                surveillance_events.append(event)
                db.session.add(event)
        db.session.commit()

        # --- Time Reminders ---
        time_reminders = []
        for registration in exam_registrations[:5]: # Creating reminders for the first 5 registrations
            exam_obj = db.session.get(Exam, registration.exam_id)
            if exam_obj and exam_obj.exam_schedules:
                schedule = exam_obj.exam_schedules[0] # Assuming one schedule per exam for simplicity
                if schedule.start_time:
                    reminder_time = (datetime.combine(schedule.schedule_date, schedule.start_time) - timedelta(minutes=random.randint(5, 15))).time()
                    reminder = TimeReminder(exam_id=exam_obj.exam_id, student_id=registration.student_id, reminder_time=reminder_time, message=f"Reminder: Your exam for {exam_obj.course_name} starts soon.")
                    time_reminders.append(reminder)
                    db.session.add(reminder)
        db.session.commit()

        # --- Exam Requirements ---
        exam_requirements = []
        requirement_types = ["National ID", "Student ID", "Clearance Form"]
        for registration in exam_registrations[:5]: # Creating requirements for the first 5 registrations
            for req_type in requirement_types:
                met = random.choice([True, False])
                requirement = ExamRequirement(exam_id=registration.exam_id, student_id=registration.student_id, requirement_type=req_type, met_by_student=met)
                exam_requirements.append(requirement)
                db.session.add(requirement)
        db.session.commit()

        print("Successfully seeded data for all tables with specified details and Kenyan student names.")

if __name__ == '__main__':
    seed_database()