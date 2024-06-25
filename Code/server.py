"""This file shall contain the implementation of OptiFox server side code.

More details are listed in file README.md.
"""

from flask import render_template
import connexion
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth

# Initialize the Flask application
app = connexion.App(__name__, specification_dir="./")
app.add_api("swagger.yml")
auth = HTTPBasicAuth()

CORS(app.app, resources={r"/*": {"origins": "https://localhost:3000"}})

users = {"admin": "password"}


@app.route("/")
def home():
    # Render the 'patient_page.html' template when the home route is accessed
    return render_template("patient_page.html")


if __name__ == "__main__":
    # Enable debug mode for detailed error messages and auto-reloading
    app.run(host="0.0.0.0", port=3000)


# TODO : add security to the apis
@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username
