Ctrl + Shift + v to view

# DOCUMENTATION
Here is how to set up this project after cloning the git repos

## Install python
Go to your terminal and type 
```
python
```
Follow instructions from there
i.e. download it from microsoft store


## Install python libraries
Go to terminal
```
pip install transformers torch flask flask-cors sentence-transformers datasets
```
It might take awhile go grab a drink while it loads

**Ok setup done**

## Running the project
Type this into the Terminal
```
python server.py
```
This might also take awhile. or not.

Now open index.html on browser to test the AI

### Some notes
Wait for the server to finish loading before doing anything on the webpage
Once its done, it will show you a debugger pin. it will take awhile.

#### GSM8K Purpose
gsm8k is a dataset for primary sch math qns in case u were wondering.

# What we need to do now
### populate the dataset
Here is a format
```
[
    {"prompt": "blablabla",
    "response": "blablabla"}
]
```
I also made a formatter: its in the 
'use this to make a copy-pastable json' 
folder. open the html on broswer