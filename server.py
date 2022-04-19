from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, session
import datetime
app = Flask(__name__)
app.secret_key = b'39153655e83ab04d954b8c5efee7019c50ea6145cc55373f60930e925fa98f71'

drink_data = {
    "1": {
        "id": "1",
        "name": "Cappuccino",
        "type": "Coffee",
        "ingredients": ["Coffee Powder", "White Sugar", "Milk", "Water"],
        "tools": ["Microwave", "Whisk"],
        "directions": ["White Sugar", "Coffee Powder", "Water", "Whisk", "Milk", "Whisk", "Microwave"],
        "match" :
        {
            "Coffee Powder": "Add Coffee Powder",
            "White Sugar": "Add White Sugar",
            "Milk": "Add Milk",
            "Water": "Add Water",
            "Microwave": "Microwave Ingredients",
            "Whisk": "Whisk Ingredients"
        },
        
        "number_steps": "7",
        "image": "https://media.istockphoto.com/photos/cappuccino-picture-id173245886?s=612x612"
    },
    "2": {
        "id": "2",
        "name": "Matcha Latte",
        "type": "Tea",
        "ingredients": ["Matcha Powder", "Milk", "Water", "Honey"],
        "tools": ["Microwave", "Whisk"],
        "directions": ["Water", "Microwave", "Matcha Powder", "Whisk", "Milk", "Honey", "Whisk", "Microwave"],
        "match":
        {
            "Matcha Powder": "Add Matcha Powder",
            "Milk": "Add Milk",
            "Honey": "Add Honey",
            "Water": "Add Water",
            "Microwave": "Microwave Ingredients",
            "Whisk": "Whisk Ingredients"
        },
        "number_steps": "8",
        "image": "https://media.istockphoto.com/photos/matcha-latte-green-milk-foam-cup-on-wood-table-at-cafe-trendy-powered-picture-id1325991061?s=612x612"
    },
    "3": {
        "id": "3",
        "name": "Hot Chocolate",
        "type": "Other",
        "ingredients": ["Cocoa Powder", "White Sugar", "Milk", "Vanilla Extract", "Mini Marshmallows"],
        "tools": ["Microwave", "Whisk"],
        "directions": ["Milk", "Microwave", "Cocoa Powder", "White Sugar", "Whisk", "Mini Marshmallows", "Microwave"],
        "match":
        {
            "Cocoa Powder": "Add Cocoa Powder",
            "White Sugar": "Add White Sugar",
            "Milk": "Add Milk",
            "Vanilla Extract": "Add Vanilla Extract",
            "Mini Marshmallows": "Add Mini Marshmallows",
            "Microwave": "Microwave Ingredients",
            "Whisk": "Whisk Ingredients"
        },
        "number_steps": "7",
        "image": "https://media.istockphoto.com/photos/homemade-warm-hot-chocolate-picture-id1320380734?s=612x612"
    }
}

ingredient_tool_data = {
    "1": {
        "id": "1",
        "name": "Whisk",
        "type": "tool",
        "image": "https://media.istockphoto.com/photos/whisk-picture-id489696253?s=612x612"
    },
    "2": {
        "id": "2",
        "name": "Microwave",
        "type": "tool",
        "image": "https://media.istockphoto.com/photos/modern-microwave-oven-picture-id139406154?s=612x612"
    },
    "3": {
        "id": "3",
        "name": "Coffee Powder",
        "type": "ingredient",
        "image": "https://media.istockphoto.com/photos/coffee-beans-and-ground-coffee-heap-isolated-on-white-background-picture-id1072068026?s=612x612"
    },
    "4": {
        "id": "4",
        "name": "White Sugar",
        "type": "ingredient",
        "image": "https://media.istockphoto.com/photos/white-sugar-picture-id490394238?s=612x612"
    },
    "5": {
        "id": "5",
        "name": "Milk",
        "type": "ingredient",
        "image": "https://media.istockphoto.com/photos/tall-glass-of-milk-against-a-white-background-picture-id172764098?s=612x612"
    },
    "6": {
        "id": "6",
        "name": "Water",
        "type": "ingredient",
        "image": "https://media.istockphoto.com/photos/glass-of-water-picture-id485685046?s=612x612"
    },
    "7": {
        "id": "7",
        "name": "Cocoa Powder",
        "type": "ingredient",
        "image": "https://media.istockphoto.com/photos/ground-cocoa-and-chocolate-pieces-isolated-on-white-background-picture-id473660712?s=2048x2048"
    },
    "8": {
        "id": "8",
        "name": "Vanilla Extract",
        "type": "ingredient",
        "image": "https://media.istockphoto.com/photos/bottle-of-vanilla-picture-id485610601?s=612x612"
    },
    "9": {
        "id": "9",
        "name": "Mini Marshmallows",
        "type": "ingredient",
        "image": "https://media.istockphoto.com/photos/delicious-puffy-marshmallows-on-lilac-background-flat-lay-picture-id1328289938?s=612x612"
    },
    "10": {
        "id": "10",
        "name": "Matcha Powder",
        "type": "ingredient",
        "image": "https://media.istockphoto.com/photos/heap-of-green-matcha-tea-powder-and-leaves-picture-id978314808?s=612x612"
    },
    "11": {
        "id": "11",
        "name": "Honey",
        "type": "ingredient",
        "image": "https://media.istockphoto.com/photos/bottle-of-honey-picture-id177231613?s=612x612"
    },
}

entry_num = 1

user_choices = {}

step = 0
score = 0
# ROUTES

@app.route('/')
def layout():
   return render_template('layout.html')

@app.route('/learn/<id>')
def learn(id=None):
    global user_choices
    userentrylearningtime=datetime.datetime.now()
    user_choices["userentrylearningtime"]=userentrylearningtime

    drink_info = drink_data[id]
    return render_template('learn.html', drink_info=drink_info, ingredient_tool_data=ingredient_tool_data, step=step)

@app.route('/view/<id>')
def view(id=None):
    drink_info = drink_data[id]
    return render_template('view.html', drink_info=drink_info, ingredient_tool_data=ingredient_tool_data)

@app.route('/front/<id>')
def front(id=None):
    drink_info = drink_data[id]
    return render_template('front.html', drink_info=drink_info, ingredient_tool_data=ingredient_tool_data)

@app.route('/quiz/<id>')
def quiz(id=None):
    drink_info = drink_data[id]
    return render_template('quiz.html', drink_info=drink_info, ingredient_tool_data=ingredient_tool_data, step=step, score=score)

# AJAX FUNCTIONS

# add new entry to user data
@app.route('/quiz/add', methods=['GET', 'POST'])
def add_user_choices():
    global user_choices
    global entry_num

    json_data = request.get_json()
    entry_to_save = json_data
    entry_to_save["type"] = "quiz"

    user_choices[entry_num] = entry_to_save
    entry_num += 1

    return jsonify(user_choices = user_choices)

@app.route('/learn/add', methods=['GET', 'POST'])
def add_user_choices2():
    global user_choices
    global entry_num

    json_data = request.get_json()
    entry_to_save = json_data
    entry_to_save["type"] = "learn"

    user_choices[entry_num] = entry_to_save
    entry_num += 1

    return jsonify(user_choices = user_choices)


@app.route('/update_step', methods=['GET', 'POST'])
def update_step():
    global term
    json_data = request.get_json()   
    step = json_data
    return jsonify(step=step)

@app.route('/update_score', methods=['GET', 'POST'])
def update_score():
    global term
    json_data = request.get_json()   
    score = json_data
    return jsonify(score=score)

if __name__ == '__main__':
   app.run(debug = True)

