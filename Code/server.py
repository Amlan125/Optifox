"""This file shall contain the implementation of OptiFox server side code.

More details are listed in file README.md.
"""

from flask import render_template
import connexion

# Initialize the Flask application
app = connexion.App(__name__, specification_dir="./")
app.add_api("swagger.yml")


@app.route("/")
def home():
    # Render the 'patient_page.html' template when the home route is accessed
    return render_template("patient_page.html")


if __name__ == "__main__":
    # Enable debug mode for detailed error messages and auto-reloading
    app.run()
