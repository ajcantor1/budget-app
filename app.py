from factory import createApp
from flask import render_template

app = createApp()

@app.route('/')
@app.route('/login')
@app.route('/dashboard')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)





