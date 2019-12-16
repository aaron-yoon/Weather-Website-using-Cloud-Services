import RPi.GPIO as GPIO
import dht11
import time
import datetime
import requests

# initialize GPIO
GPIO.setwarnings(True)
GPIO.setmode(GPIO.BCM)

# read data using pin 17
instance = dht11.DHT11(pin=17)

while True:
    result = instance.read()
    if result.is_valid():
        print("Last valid input: " + str(datetime.datetime.now()))
        print("Temperature: %d F" % ((result.temperature * 9/5)+32))
        #print("Temperature: %d C" % result.temperature)
        print("Humidity: %d  %%" % result.humidity)
        print("--------------------")
        task = {"IsPosting": "true", "Temperature": (result.temperature * 9/5)+32, "Humidity": result.humidity}
        resp = requests.post('https://t9mf1hc516.execute-api.us-east-2.amazonaws.com/dev/service/', json=task)

    time.sleep(3)