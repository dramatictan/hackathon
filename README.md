ctrl + shift + v to view









# DOCUMENTATION
Heres how to set up this project after cloning the git repo

## Install python
go to ur terminal and type 
```
python
```
and follow instructions from there
i.e. download it from microsoft store


## Install python libraries
go to terminal
```
pip install transformers torch flask flask-cors sentence-transformers datasets
```
it might take awhile go grab a drink while it loads

**ok setup done**

## running the project
terminal
```
python server.py
```
this might also take awhile. or not.

now open index.html on browser to test the ai

### some notes
wait for the server to finish loading before doing anything on the webpage
once its done, it will show you a debugger pin. it will take awhile.

gsm8k is a dataset for primary sch math qns in case u were wondering.

# What we need to do now
### populate the dataset
heres a format
```
[
    {"prompt": "blablabla",
    "response": "blablabla"}
]
```
I also made a formatter: its in the 
'use this to make a copy-pastable json' 
folder. open the html on broswer