// Nonhumanscentv2
// see https://github.com/eigenlucy/nonhumanscent/blob/bsec2/main.ato for connections

#include <Arduino.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"

#define BME_SCK 12
#define BME_MISO 13
#define BME_MOSI 11
#define SEN1_CS 45

#define BOOT_BUTTON_PIN 5 // GPIO0 is hardwired to be the boot pin anyway.

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME680 sen1(SEN1_CS, BME_MOSI, BME_MISO,  BME_SCK);

#define DELAYVAL 500
// Which pin on the Arduino is connected to the NeoPixels?
#define NEOPIXEL_PIN      4 // On Trinket or Gemma, suggest changing this to be not 0.

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS 1 // 1 pixel

Adafruit_NeoPixel pixels(NUMPIXELS, NEOPIXEL_PIN, NEO_GRB + NEO_KHZ800);

void rebootToBootloader() {
  Serial.println("Rebooting to bootloader mode...");
  Serial.flush();
  delay(100);
  
  // Set GPIO0 (BOOT) low and reset
  
  //pinMode(0, OUTPUT);
  //digitalWrite(0, LOW);
  //delay(100);
  
  // Trigger software reset
  ESP.restart();
}

void setup() {
  pinMode(BOOT_BUTTON_PIN, INPUT_PULLUP);
  if (digitalRead(BOOT_BUTTON_PIN) == LOW) {
    rebootToBootloader();
  }
  pixels.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
  #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
  clock_prescale_set(clock_div_1);
  #endif
  pixels = new Adafruit_NeoPixel(numPixels, pin, pixelFormat);
  pixels->begin():

  Serial.begin(115200);
  Serial.println("Serial working!");
  // Serial.println(F("BME680 test"));

  // if (!sen1.begin()) {
  //   Serial.println("Could not find a valid BME680 sensor, check wiring!");
  //   while (1);
  //   }
  //   sen1.setTemperatureOversampling(BME680_OS_8X);
  //   sen1.setHumidityOversampling(BME680_OS_2X);
  //   sen1.setPressureOversampling(BME680_OS_4X);
  //   sen1.setIIRFilterSize(BME680_FILTER_SIZE_3);
  //   sen1.setGasHeater(320, 150); // 320*C for 150 ms
}

void loop() {
  pixels.clear(); // Set all pixel colors to 'off'

  for(int i=0; i<NUMPIXELS; i++) { // just one lol.

    pixels.setPixelColor(i, pixels.Color(0, 150, 0));
    pixels.show();
    delay(DELAYVAL);
  } 


  // if (! sen1.performReading()) {
  //   Serial.println("Failed to perform reading :(");
  //   return;
  // }
  // Serial.print("Temperature = ");
  // Serial.print(sen1.temperature);
  // Serial.println(" *C");

  // Serial.print("Pressure = ");
  // Serial.print(sen1.pressure / 100.0);
  // Serial.println(" hPa");

  // Serial.print("Humidity = ");
  // Serial.print(sen1.humidity);
  // Serial.println(" %");

  // Serial.print("Gas = ");
  // Serial.print(sen1.gas_resistance / 1000.0);
  // Serial.println(" KOhms");

  // Serial.print("Approx. Altitude = ");
  // Serial.print(sen1.readAltitude(SEALEVELPRESSURE_HPA));
  // Serial.println(" m");

  // Serial.println();
  // delay(2000);
}

