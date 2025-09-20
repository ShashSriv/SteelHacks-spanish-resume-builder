from flask import Flask, jsonify, request
import helper_classes


app = Flask(__name__)



# ----- global resume instance -----
resume = helper_classes.Resume()
resume.personal = helper_classes.Personal()
resume.work1 = helper_classes.Work()
resume.work2 = helper_classes.Work()
resume.work3 = helper_classes.Work()
resume.certification = helper_classes.Certification()
resume.education = helper_classes.Education()
resume.skills = helper_classes.Skills()

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
        if len(c) > 0: resume.certification1.name = c[0]
        if len(c) > 1: resume.certification1.issuer = c[1]
        if len(c) > 2: resume.certification1.year = c[2]

    # Skills: [skill1, skill2, ...]
    if "Skills" in data:
        resume.skills.skills = data["Skills"]

    return jsonify({"ok": True}), 200

@app.route("/latest", methods=["GET"])
def latest():
    return jsonify(resume.to_dict()), 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)