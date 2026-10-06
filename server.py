from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

events = [
    {"id": 1, "title": "Tech Meetup"},
    {"id": 2, "title": "Flask Workshop"},
]


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Event Catalog API"}), 200


@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events), 200


@app.route("/events", methods=["POST"])
def create_event():
    data = request.get_json(silent=True)
    if not data or not str(data.get("title", "")).strip():
        return jsonify({"error": "Title is required"}), 400

    new_id = max((e["id"] for e in events), default=0) + 1
    new_event = {"id": new_id, "title": data["title"].strip()}
    events.append(new_event)
    return jsonify(new_event), 201


if __name__ == "__main__":
    app.run(debug=True)