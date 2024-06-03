from flask import Flask,jsonify,render_template,request
from flask_cors import CORS
from chat import get_response
from run_notebook import execute_notebook
# import os

app = Flask(__name__)
CORS(app)


@app.get('/')
def get_data():
    data = {
        "message":"Hello this is api end point"
    }
    return jsonify(data)


@app.post('/predict')
def predict():
    text = request.get_json().get("message")
    if text == "hi":
        return jsonify({"answer":"hello, how are you?"})
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

@app.get('/map')
def map_endpoint():
    # Assuming the notebook is in the "Mapping2" directory
    # notebook_folder = 'Mapping2'
    # notebook_filename = 'mapping_Notebook.ipynb'
    # notebook_path = os.path.join(notebook_folder, notebook_filename)

    execute_notebook('mapping_Notebook')
    return jsonify({"message": "Notebook executed successfully"})

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True,port=5002)

