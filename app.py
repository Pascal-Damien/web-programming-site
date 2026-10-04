"""
Web Programming — Flask application (Week 4).

Download this file from e-learning and REPLACE all the contents of your existing
app.py with it. Then run your app as usual.

You do NOT need to understand this code yet — server-side form handling is taught 
in a later session. 
"""

from flask import Flask, render_template, request

app = Flask(__name__)

from quiz_api import init_quiz
init_quiz(app)


@app.route("/")
def home():
    """Serve the portfolio home page."""
    weekly_work = [
        {"week": 2, "title": "History of the Internet", "url": "/internet-history"},
        {"week": 2, "title": "History of the Web", "url": "/web-history"},
        {"week": 2, "title": "History of the Internet (AI)", "url": "/internet-history-ai"},
        {"week": 2, "title": "History of the Web (AI)", "url": "/web-history-ai"},
        {"week": 4, "title": "Engineering Student Profile", "url": "/submit-profile"},
        {"week": 5, "title": "JavaScript app", "url": "/quiz"},
    ]
    return render_template("index.html", weekly_work=weekly_work)


@app.route("/internet-history")
def internet_history():
    return render_template("internet-history.html")


@app.route("/web-history")
def web_history():
    return render_template("web-history.html")


@app.route("/internet-history-ai")
def internet_history_ai():
    return render_template("internet-history-ai.html")


@app.route("/web-history-ai")
def web_history_ai():
    return render_template("web-history-ai.html")


@app.route("/submit-profile", methods=["GET", "POST"])
def submit_profile():
    """
    GET  -> show the profile form (you build templates/profile_form.html).
    POST -> read the submitted fields and show the profile page
            (templates/profile.html, which extends your base.html).
    """
    if request.method == "POST":
        data = request.form.to_dict()                   # all single-value fields
        skills = request.form.getlist("skills")         # checkboxes -> list
        software = request.form.getlist("software")     # multiple <select> -> list
        return render_template(
            "profile.html", data=data, skills=skills, software=software
        )

    # First visit (GET): just show the empty form.
    return render_template("profile-form.html")

@app.route("/quiz", methods=["GET", "POST"])
def quiz():
    return render_template("quiz.html")


if __name__ == "__main__":
    app.run(debug=True)