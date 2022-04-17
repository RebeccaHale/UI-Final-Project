from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

drink_data = {
    "1": {
        "id": "1",
        "name": "Cappuccino",
        "type": "Coffee",
        "ingredients": ["Coffee Powder", "White Sugar", "Milk", "Water"],
        "tools": ["Microwave", "Whisk"],
        "directions": ["Add White Sugar", "Add Coffee Powder", "Add Water", "Whisk Ingredients", "Add Milk", "Whisk Ingredients", "Microwave Ingredients"],
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
        "directions": ["Add Water", "Microwave Ingredients", "Add Matcha Powder", "Whisk Ingredients", "Add Milk", "Add Honey", "Whisk Ingredients", "Microwave Ingredients"],
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
        "directions": ["Add Milk", "Microwave Ingredients", "Add Cocoa Powder", "Add White Sugar", "Whisk Ingredients", "Add Mini Marshmallows", "Microwave Ingredients"],
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
        "image": "https://media.istockphoto.com/photos/cappuccino-picture-id173245886?s=612x612"
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

# ROUTES

@app.route('/')
def layout():
   return render_template('layout.html')   

@app.route('/learn/<id>')
def learn_coffee(id=None):
    drink_info = drink_data[id]
    return render_template('learn.html', drink_info=drink_info, ingredient_tool_data=ingredient_tool_data)

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
    return render_template('quiz.html', drink_info=drink_info, ingredient_tool_data=ingredient_tool_data)

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


if __name__ == '__main__':
   app.run(debug = True)




