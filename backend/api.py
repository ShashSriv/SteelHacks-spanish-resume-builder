from flask import Flask, jsonify, request
import helper_classes
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


# ----- global resume instance -----

def init_resume():
    r = helper_classes.Resume()
    r.personal = helper_classes.Personal()
    r.work1 = helper_classes.Work()
    r.work2 = helper_classes.Work()
    r.work3 = helper_classes.Work()
    r.certification = helper_classes.Certification()
    r.education = helper_classes.Education()
    r.skills = helper_classes.Skills()
    return r

resume = init_resume()

def ensure_list(x, name):
    if x is None:
        return []
    if not isinstance(x, list):
        raise ValueError(f"'{name}' must be a list.")
    return x

def ensure_map(x):
    if x is None:
        return {}
    if not isinstance(x, dict):
        raise ValueError("Payload must be a JSON object at the top level.")
    return x

@app.route("/data", methods=["POST"])
def get_data_from_vapi():
    data = request.get_json(silent=True) or {}

    # Personal: [name, email, phone, location]
    if "Personal" in data:
        p = data["Personal"]
        if len(p) > 0: resume.personal.name = p[0]
        if len(p) > 1: resume.personal.email = p[1]
        if len(p) > 2: resume.personal.phone = p[2]
        if len(p) > 3: resume.personal.location = p[3]

    # Education: [school, degree, start, end]
    if "Education" in data:
        e = data["Education"]
        if len(e) > 0: resume.education.school = e[0]
        if len(e) > 1: resume.education.degree = e[1]
        if len(e) > 2: resume.education.start = e[2]
        if len(e) > 3: resume.education.end = e[3]

    # WorkExperience1
    if "WorkExperience1" in data:
        w = data["WorkExperience1"]
        if len(w) > 0 and len(w) > 1:
            resume.work1.role = f"{w[1]}, {w[0]}"
        if len(w) > 2: resume.work1.start = w[2]
        if len(w) > 3: resume.work1.end = w[3]
        if len(w) > 4: resume.work1.description1 = w[4]
        if len(w) > 5: resume.work1.description2 = w[5]

    # WorkExperience2
    if "WorkExperience2" in data:
        w = data["WorkExperience2"]
        if len(w) > 0 and len(w) > 1:
            resume.work2.role = f"{w[1]}, {w[0]}"
        if len(w) > 2: resume.work2.start = w[2]
        if len(w) > 3: resume.work2.end = w[3]
        if len(w) > 4: resume.work2.description1 = w[4]
        if len(w) > 5: resume.work2.description2 = w[5]

    # WorkExperience3
    if "WorkExperience3" in data:
        w = data["WorkExperience3"]
        if len(w) > 0 and len(w) > 1:
            resume.work3.role = f"{w[1]}, {w[0]}"
        if len(w) > 2: resume.work3.start = w[2]
        if len(w) > 3: resume.work3.end = w[3]
        if len(w) > 4: resume.work3.description1 = w[4]
        if len(w) > 5: resume.work3.description2 = w[5]

    # Certifications: [name, issuer, year]
    if "Certifications" in data:
        c = data["Certifications"]
        if len(c) > 0: resume.certification.name = c[0]
        if len(c) > 1: resume.certification.issuer = c[1]
        if len(c) > 2: resume.certification.year = c[2]

    # Skills: [skill1, skill2, ...]
    if "Skills" in data:
        resume.skills.skills = data["Skills"]

    return jsonify({"ok": True}), 200

@app.route("/latest", methods=["GET"])
def latest():
    return jsonify(resume.to_dict()), 200

@app.route("/reset", methods=["POST"])
def reset():
    global resume
    resume = init_resume()
    return jsonify({"ok": True, "message": "Resume reset to empty defaults."}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
