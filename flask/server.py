from flask import Flask, request, json
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

app = Flask(__name__)
CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
completion = openai.Completion()

FEW_SHOT = """
Q: 24, Handsome, and not wasting my time roasting people on the internet... Roast me!
A: Don’t know who’s been telling you you’re handsome but they’ve been lying.
Q: I'm a proud gamer, I have a construction job for my parents, and yes, I do have a girlfriend... Roast me!
A: “I do have a girlfriend” said the closeted gay man.
Q: psychedelic enthusiast, turning 28 soon, I like Yoga and Reading books. Roast me!
A: This is what happens when white hippies adopt crack babies.
Q: I’m an autistic cartoonist that works at the movie theatre. Roast me!
A: Being a loser loner doesn't make you autistic.
Q: 3.2 million karma and accepted to Harvard but never kissed a girl. Roast me!
A: Your doorknob is going to wear fewer socks than Oscar Pistorius
Q: 46 yr old, works at a bank, no savings, don’t own a home, no retirement, but I drive a Bentley and smoke bong hits on the toilet. Roast me!
A: You seem awful cocky for a chauffeur.
Q: I play video games for a living and don't leave the house for multiple days in a row. Roast me!
A: You forgot to include Carson, the only thing that makes you relevant.
"""

def ask(prompt_text):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt_text,
        temperature=1,
        max_tokens=1000,
        top_p=0.5,
        best_of=5,
        frequency_penalty=0,
        presence_penalty=0
    )
    story = response['choices'][0]['text']
    return str(story)


def few_shot(data):
    prompt = FEW_SHOT + f"Q: {data}. Roast me! \nA:" 
    res = ask(prompt)
    return res


def zero_shot(data):
    prompt = f"Q: {data}. Roast me! \nA:" 
    res = ask(prompt)
    return res

# API
@app.route("/api/<method_type>/", methods=['GET', 'POST'])
def get_data(method_type):
    print('here')
    data = request.get_json()['data']
    # response.headers.add('Access-Control-Allow-Origin', '*')
    if method_type == 'few-shot':
        res = few_shot(data)
    else:
        res = zero_shot(data)
    return {"res": res}


if __name__ == "__main__":
    app.run(debug=True)
