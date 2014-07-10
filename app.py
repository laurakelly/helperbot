from flask import Flask, render_template 
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)
app.debug=True

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/socketserver')
def socket_server(ws):
    print ws
    while True:
        message = ws.receive()

        ws.send("test")
