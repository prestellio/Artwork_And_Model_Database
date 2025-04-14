from flask import Flask
from flask import render_template

sfapp = Flask(__name__)

#Routes and renders the main HTML page
@sfapp.route("/")
def HomePageRender():
    return render_template('index.html')




