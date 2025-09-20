from flask import Flask, jsonify, request
from helper_classes import Resume, Personal, Work, Education, Certification, Skills


app = Flask(__name__)

STORE = {"resume": None}

def resume_from_json(payload: dict) -> Resume:
    """Build a Resume object from JSON (adjust keys to match your shape)."""
    r = Resume()

    # personal
    p = payload.get("personal", {})
    r.personal = Personal(
        name=p.get("name", ""),
        email=p.get("email", ""),
        phone=p.get("phone", ""),
        location=p.get("location", "")
    )

    # work (since you hard-coded work1..work3)
    work_list = payload.get("work", [])
    if len(work_list) > 0:
        w = work_list[0]
        r.work1 = Work(w.get("role",""), w.get("start",""), w.get("end",""), w.get("description", []))
    if len(work_list) > 1:
        w = work_list[1]
        r.work2 = Work(w.get("role",""), w.get("start",""), w.get("end",""), w.get("description", []))
    if len(work_list) > 2:
        w = work_list[2]
        r.work3 = Work(w.get("role",""), w.get("start",""), w.get("end",""), w.get("description", []))

    # education (single object in your current class)
    edu = payload.get("education", {})
    if isinstance(edu, dict):  # if your client sends an object
        r.education = Education(edu.get("school",""), edu.get("degree",""), edu.get("start",""), edu.get("end",""))
    elif isinstance(edu, list) and edu:  # if it sends a list, take first for now
        e = edu[0]
        r.education = Education(e.get("school",""), e.get("degree",""), e.get("start",""), e.get("end",""))

    # certifications (hard-coded 3)
    certs = payload.get("certifications", [])
    if len(certs) > 0:
        c = certs[0]; r.certification1 = Certification(c.get("name",""), c.get("issuer",""), c.get("year",""))
    if len(certs) > 1:
        c = certs[1]; r.certification2 = Certification(c.get("name",""), c.get("issuer",""), c.get("year",""))
    if len(certs) > 2:
        c = certs[2]; r.certification3 = Certification(c.get("name",""), c.get("issuer",""), c.get("year",""))

    # skills
    r.skills = Skills(payload.get("skills", []))

    # summary
    r.summary = payload.get("summary", "")

    return r

@app.route("/data", methods=["POST"])
def get_data_from_vapi():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({"error": "invalid JSON"}), 400

    # If every POST is a full snapshot, just replace the current resume
    resume = resume_from_json(payload)
    STORE["resume"] = resume

    return jsonify({"status": "ok"}), 200

@app.route("/data", methods=["GET"])
def data_to_frontend():
    if STORE["resume"] is None:
        return jsonify({"error": "no resume yet"}), 404
    return jsonify(STORE["resume"].to_dict()), 200

if __name__ == "__main__":
    # this actually starts the server
    app.run(host="127.0.0.1", port=5000, debug=True)