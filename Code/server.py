"""Content in this file is authored by OptiFox Developer (Purushotham Koduri).

This file shall contain the implementation of OptiFox server side code. More details are
listed in file README.md.
"""

from flask import Flask, render_template

# Initialize the Flask application
app = Flask(__name__)


@app.route("/")
def home():
    # Render the 'patient_page.html' template when the home route is accessed
    return render_template("patient_page.html")


if __name__ == "__main__":
    # Enable debug mode for detailed error messages and auto-reloading
    app.run(debug=True)
