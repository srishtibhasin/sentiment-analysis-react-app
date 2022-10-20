import time
import joblib
from flask import Flask, request, jsonify, abort, make_response

app = Flask(__name__)

MODEL_PATH = "../../models/sklearn_linearsvc_trained.joblib"

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

class SentimentClassifier:
    def __init__(self):
        self.model = self._get_trained_clf()

    def _get_trained_clf(self):
        return joblib.load(MODEL_PATH)  # LOAD TRAINED CLASSIFIER

    def predict(self, text):
        return self.model.predict([text])[0]

classifier = SentimentClassifier()

def _parse_request_body():
    """Extract first and last name from request."""
    request_body = request.get_json(force=True)
    try:
        text = request_body["text"]
        if not isinstance(text, str):
            text = str(text)
    except KeyError:
        # Missing first or last name fields.
        response_body = {"error": "Missing 'text' key in request body"}
        response = make_response(jsonify(response_body), 400)
        abort(response)
    return text

@app.route('/api/post', methods=['POST'])
def simple_post():
    inp = _parse_request_body()
    return jsonify({"output": inp+"!!"})

@app.route('/api/reverse', methods=['POST', 'GET'])
def reverse_text():
    inp = _parse_request_body()
    # return inp[::-1]
    return jsonify({"output": inp[::-1]})

@app.route("/api/predict", methods=["POST"])
def predict():
    """Respond to requests for a prediction."""
    text = _parse_request_body()
    if text.strip() == "":
        return jsonify({"output": ""})
    sentiment = classifier.predict(text)
    return jsonify({"output": sentiment})
