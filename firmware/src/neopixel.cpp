// Nonhumanscentv2
// see https://github.com/eigenlucy/nonhumanscent/blob/bsec2/main.ato for connections

#include <Arduino.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif
#include <Wire.h>
#include <SPI.h>

#define DELAYVAL 500
// Which pin on the Arduino is connected to the NeoPixels?
#define NEOPIXEL_PIN      4 // On Trinket or Gemma, suggest changing this to be not 0.

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS 1 // 1 pixel

Adafruit_NeoPixel pixels(NUMPIXELS, NEOPIXEL_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
  clock_prescale_set(clock_div_1);
  #endif
  pixels.begin();
}

void loop() {
  pixels.clear(); // Set all pixel colors to 'off'

  for(int i=0; i<NUMPIXELS; i++) { // just one lol.

    pixels.setPixelColor(i, pixels.Color(255, 0, 0));
    pixels.show();
    delay(DELAYVAL);
  } 

}