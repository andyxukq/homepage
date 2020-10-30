import flask, pymongo
app = flask.Flask(__name__)
db = pymongo.MongoClient("mongodb+srv://root:1CimCuL4dMGEpsg0@cluster0.yywuu.mongodb.net")

@app.route('/profile')
def profile():
	profile = db.homepage.profile.find_one()
	return profile["data"]

@app.route('/')
def root():
	return "homepage api"

if __name__=="__main__":
	app.run(debug=True, port=8080)
