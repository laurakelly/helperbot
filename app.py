from flask import Flask, render_template 
from flask_sockets import Sockets
import json

app = Flask(__name__)
sockets = Sockets(app)

@app.route('/')
def index():
    return render_template("index.html")

@sockets.route('/socketserver')
def socket_server(ws):
    while True:
        message = ws.receive()
        tickets = []

        if (message == 'test'):
            print ("*******************")
            print ("test received")
            ws.emit("test", '{"blah": "blah"}')
        if (message == 'get:list'):
            ws.send(json.dumps({ "initialize_tickets": tickets }))
        #if (message.get("new_ticket")):
        #    tickets.append(message['new_ticket'])
        #if (message.get("remove_ticket")):
            # remove ticket


