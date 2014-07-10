from flask import Flask, render_template 
from flask_sockets import Sockets
import pdb

app = Flask(__name__)
sockets = Sockets(app)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/socketserver')
def socket_server():
    pdb.set_trace()
    while True:
        message = ws.receive()

        if message:
            pdb.set_trace()

if __name__ == '__main__':
    app.run(debug=True)
