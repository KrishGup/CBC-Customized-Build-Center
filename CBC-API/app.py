import os
import subprocess
import tempfile
import logging
from flask import Flask, jsonify, request, send_file
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)
OPENSCAD_PATH = '/app/openscad.AppImage'  # Update this path to the actual location of OpenSCAD executable on your system

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

api.add_resource(HelloWorld, '/api/hello')
api.add_resource(RenderScad, '/api/render')
api.add_resource(GetStl, '/api/getstl')

if __name__ == "__main__":
    app.run(debug=os.getenv('FLASK_ENV') != 'production')