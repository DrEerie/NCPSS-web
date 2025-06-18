import sqlite3

conn = sqlite3.connect('database/school_portal.db')
c = conn.cursor()

c.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('student', 'staff')) NOT NULL
)
''')

conn.commit()
conn.close()
print("Database initialized.")

# Add this to your init_db.py after creating the table

from werkzeug.security import generate_password_hash

conn = sqlite3.connect('database/school_portal.db')
cursor = conn.cursor()

# Sample users
cursor.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
               ('student1', generate_password_hash('pass123'), 'student'))
cursor.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
               ('staff1', generate_password_hash('admin123'), 'staff'))

conn.commit()
conn.close()
