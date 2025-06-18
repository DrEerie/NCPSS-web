# IMPORTS
# ===============================
from flask import Flask, render_template, request, redirect, url_for, flash, abort, send_from_directory
from flask_login import LoginManager, UserMixin, login_user, current_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
import os
import sqlite3

# ===============================
# FLASK APP SETUP
# ===============================
app = Flask(__name__)
app.secret_key = 'supersecretkey'  # ⛔ In production, use os.environ.get("SECRET_KEY")

# ===============================
# LOGIN MANAGER SETUP
# ===============================
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login_student'

# ===============================
# DATABASE SETUP
# ===============================
DATABASE_PATH = os.path.join('database', 'school_portal.db')

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ===============================
# USER CLASS lOADED FROM DB
# ===============================
class User(UserMixin):
    def __init__(self, id, username, role):
        self.id = id
        self.username = username
        self.role = role

    @staticmethod
    def get_by_id(user_id):
        conn = get_db_connection()
        user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        conn.close()
        if user:
            return User(user["id"], user["username"], user["role"])
        return None

    @staticmethod
    def get_by_username(username):
        conn = get_db_connection()
        user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        conn.close()
        if user:
            return User(user["id"], user["username"], user["role"]), user["password"]
        return None, None

# ===============================
# LOGIN USER LOADER
# ===============================
@login_manager.user_loader
def load_user(user_id):
    return User.get_by_id(user_id)

# ===============================
# ROUTES – MAIN
# ===============================
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

# ===============================
# STUDENT LOGIN
# ===============================
@app.route('/pages/student', methods=['GET', 'POST'])
def login_student():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user, hashed_pw = User.get_by_username(username)

        if user and user.role == 'student' and check_password_hash(hashed_pw, password):
            login_user(user)
            return redirect(url_for('dashboard_student'))
        else:
            flash('Invalid student credentials.', 'error')
    return render_template('pages/login_student.html')

# ===============================
# STAFF LOGIN
# ===============================
@app.route('/login/staff', methods=['GET', 'POST'])
def login_staff():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user, hashed_pw = User.get_by_username(username)

        if user and user.role == 'staff' and check_password_hash(hashed_pw, password):
            login_user(user)
            return redirect(url_for('dashboard_staff'))
        else:
            flash('Invalid staff credentials.', 'error')
    return render_template('pages/login_staff.html')

# ===============================
# DASHBOARDS
# ===============================
@app.route('/dashboard/student')
@login_required
def dashboard_student():
    if current_user.role != 'student':
        abort(403)
    return render_template('dashboard/student.html', username=current_user.username)

@app.route('/dashboard/staff')
@login_required
def dashboard_staff():
    if current_user.role != 'staff':
        abort(403)
    return render_template('dashboard/staff.html', username=current_user.username)

# Handle the form submission for the staff dashboard
@app.route('/dashboard/staff/add', methods=['POST'])
@login_required
def add_staff():
    if current_user.role != 'staff':
        abort(403)  # Only staff can access this route

    name = request.form.get('name')
    position = request.form.get('position')

    if not name or not position:
        flash('Name and Position are required.', 'error')
        return redirect(url_for('dashboard_staff'))

    conn = get_db_connection()
    try:
        conn.execute("INSERT INTO staff (name, position) VALUES (?, ?)", (name, position))
        conn.commit()
        flash('Staff member added successfully!', 'success')
    except sqlite3.Error as e:
        flash(f'Error adding staff member: {e}', 'error')
    finally:
        conn.close()

    return redirect(url_for('dashboard_staff'))

# ===============================
# OTHER PAGES
# ===============================
@app.route('/admissions')
def admissions():
    return render_template('pages/admission.html')

@app.route('/introduction')
def introduction():
    return render_template('pages/introduction.html')

@app.route('/faqs')
def faqs():
    return render_template('pages/faq.html')


@app.route('/components/<component_name>')
def load_component(component_name):
    try:
        return render_template(f'components/{component_name}')
    except:
        abort(404)

@app.route('/assets/<path:filename>')
def send_asset(filename):
    return send_from_directory('assets', filename)

#paths for student dashboard
@app.route('/profile')
@login_required
def profile():
    return render_template('dashboard/profile.html')

@app.route('/courses')
@login_required
def courses():
    return render_template('dashboard/courses.html')

@app.route('/notifications')
@login_required
def notifications():
    return render_template('dashboard/notifications.html')

# ===============================
# MAIN
# ===============================
if __name__ == '__main__':
    app.run(debug=True)