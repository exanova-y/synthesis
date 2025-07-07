#include <Arduino.h>

void setup()
{
    pinMode(0, OUTPUT);
    digitalWrite(0, HIGH);
    Serial.begin(115200);
   
}

void loop()
{
   // wait for a second
   delay(1000);
   Serial.println("A new second has dawned");
 
}