from flask import Flask, render_template
from flask import redirect, request, jsonify, url_for

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def Home():
    return render_template('home.html', title="Home page")

@app.route("/graph1")
def Graph1():
    return render_template('graph1.html', title="graph1")

@app.route("/graph2")
def Graph2():
    return render_template('graph2.html', title="graph2")

@app.route("/graph3")
def Graph3():
    return render_template('graph3.html', title="graph3")



if __name__ == '__main__':
    app.run(debug=True)
