from flask import Flask, render_template, redirect, url_for, abort, send_from_directory
from flask_login import LoginManager, UserMixin, login_user, current_user, logout_user

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Use env vars later for production

login_manager = LoginManager()
login_manager.init_app(app)

# Dummy user class
class User(UserMixin):
    def __init__(self, id):
        self.id = id

# Minimal user_loader
@login_manager.user_loader
def load_user(user_id):
    return User(user_id)  # Normally you'd fetch user from DB


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login/student')
def login_student():
    return render_template('pages/login_student.html')

@app.route('/login/staff')
def login_staff():
    return render_template('pages/login_staff.html')

@app.route('/admissions')
def admissions():
    return render_template('pages/admission.html')

@app.route('/introduction')
def introduction():
    return render_template('pages/introduction.html')
                           

@app.route('/components/<component_name>')
def load_component(component_name):
    try:
        return render_template(f'components/{component_name}')
    except:
        abort(404)

@app.route('/assets/<path:filename>')
def send_asset(filename):
    return send_from_directory('assets', filename)

@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
