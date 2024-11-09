import os
import subprocess
import tempfile
import logging
import requests
from flask import Flask, jsonify, request, send_file
from flask_restful import Api, Resource
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.utils import secure_filename

app = Flask(__name__)
api = Api(app)
CORS(app)
load_dotenv()
OPENSCAD_PATH = './bin/openscad.exe'  # Update this path to the actual location of OpenSCAD executable on your system
SLANT3D_API_KEY = os.getenv('SLANT3D_API_KEY')  # Read the API key from environment variables
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

class HelloWorld(Resource):
    def get(self):
        return jsonify({"message": "Hello, test!"})

class RenderScad(Resource):
    def post(self):
        data = request.get_json()
        scad_code = data['scadCode']
        with tempfile.NamedTemporaryFile(delete=False, suffix='.scad') as scad_file:
            scad_file.write(scad_code.encode('utf-8'))
            scad_file_path = scad_file.name
        png_file_path = scad_file_path.replace('.scad', '.png')
        try:
            result = subprocess.run([OPENSCAD_PATH, '-o', png_file_path, scad_file_path], check=True, capture_output=True, text=True)
            logging.info(f"OpenSCAD output: {result.stdout}")
        except FileNotFoundError:
            logging.error("OpenSCAD executable not found. Ensure it is installed and in the system's PATH.")
            return jsonify({"error": "OpenSCAD executable not found"}), 500
        except subprocess.CalledProcessError as e:
            logging.error(f"OpenSCAD process failed: {e.stderr}")
            return jsonify({"error": "OpenSCAD process failed", "details": e.stderr}), 500
        return send_file(png_file_path, mimetype='image/png')

class GetStl(Resource):
    def post(self):
        data = request.get_json()
        scad_code = data['scadCode']
        with tempfile.NamedTemporaryFile(delete=False, suffix='.scad') as scad_file:
            scad_file.write(scad_code.encode('utf-8'))
            scad_file_path = scad_file.name
        stl_file_path = scad_file_path.replace('.scad', '.stl')
        try:
            result = subprocess.run([OPENSCAD_PATH, '-o', stl_file_path, scad_file_path], check=True, capture_output=True, text=True)
            logging.info(f"OpenSCAD output: {result.stdout}")
        except FileNotFoundError:
            logging.error("OpenSCAD executable not found. Ensure it is installed and in the system's PATH.")
            return jsonify({"error": "OpenSCAD executable not found"}), 500
        except subprocess.CalledProcessError as e:
            logging.error(f"OpenSCAD process failed: {e.stderr}")
            return jsonify({"error": "OpenSCAD process failed", "details": e.stderr}), 500
        return send_file(stl_file_path, mimetype='application/sla')

class GetOrderTracking(Resource):
    def get(self, order_id):
        headers = {
            'api-key': SLANT3D_API_KEY,
            'Content-Type': 'application/json'
        }
        response = requests.get(f'https://www.slant3dapi.com/api/order/{order_id}/get-tracking', headers=headers)
        return response.json()

class FileUpload(Resource):
    def post(self):
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            return jsonify({"fileUrl": file_path}), 200

class SliceFile(Resource):
    def post(self):
        data = request.get_json()
        file_url = data['fileURL']
        response = requests.post('https://www.slant3dapi.com/api/slicer', json={'fileURL': file_url}, headers={
            'api-key': SLANT3D_API_KEY,
            'Content-Type': 'application/json'
        })
        return response.json()

class GetFilaments(Resource):
    def get(self):
        response = requests.get('https://www.slant3dapi.com/api/filament', headers={
            'api-key': SLANT3D_API_KEY,
            'Content-Type': 'application/json'
        })
        return response.json()

api.add_resource(HelloWorld, '/api/hello')
api.add_resource(RenderScad, '/api/render')
api.add_resource(GetStl, '/api/getstl')
api.add_resource(GetOrderTracking, '/api/order/<string:order_id>/get-tracking')
api.add_resource(FileUpload, '/api/upload')
api.add_resource(SliceFile, '/api/slice-file')
api.add_resource(GetFilaments, '/api/filaments')

if __name__ == "__main__":
    app.run(debug=os.getenv('FLASK_ENV') != 'production')