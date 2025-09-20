from flask import Flask, jsonify, request
import helper_classes


app = Flask(__name__)

STORE = {"resume": None}

@app.route("/data", methods=["POST"])
def get_data_from_vapi():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({"error": "invalid JSON"}), 400



    return jsonify({"status": "ok"}), 200

@app.route("/data", methods=["GET"])
def data_to_frontend():
    if STORE["resume"] is None:
        return jsonify({"error": "no resume yet"}), 404
    return jsonify(STORE["resume"].to_dict()), 200

if __name__ == "__main__":
    # this actually starts the server
    app.run(host="127.0.0.1", port=5000, debug=True)