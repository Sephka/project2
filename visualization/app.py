from flask import Flask, render_template
from flask import redirect, request, jsonify, url_for
print("Hello World!")
app = Flask(__name__)

@app.route("/")
@app.route("/home")
def Home():
    return render_template('index.html', title="Home page")

@app.route("/PopBrands")
def Graph1():
    return render_template('PopBrands.html', title="Most Popular Brands By Votes")

@app.route("/DistilleryMap")
def Graph3():
    return render_template('DistilleryMap.html', title="Distillery Map")



if __name__ == '__main__':
    app.run(debug=True)
