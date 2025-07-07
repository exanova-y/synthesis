#include <Arduino.h>
#include <Adafruit_TinyUSB.h>

void setup()
{
    Serial.begin(115200);
}

void loop()
{
   // wait for a second
   delay(1000);
   Serial.println("A new second has dawned");

}