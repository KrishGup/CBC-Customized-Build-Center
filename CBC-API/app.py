from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

class HelloWorld(Resource):
    def get(self):
        return jsonify({"message": "Hello, world!"})

api.add_resource(HelloWorld, '/api/hello')

if __name__ == "__main__":
    app.run(debug=True)