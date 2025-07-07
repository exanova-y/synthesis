#include <Arduino.h>
#include <Adafruit_TinyUSB.h>

/* This sketch demonstrates USB CDC Serial echo (Centre for Disease Control and prevention) using SerialTinyUSB which
 * is available for both core with built-in USB support and without.
 * Note: on core with built-in support Serial is alias to SerialTinyUSB
 */

 // for tiny usb the baud rate in serial doesn't matter

void setup() 
{
  // Manual begin() is required on core without built-in support e.g. mbed rp2040
  if (!TinyUSBDevice.isInitialized()) {
    TinyUSBDevice.begin(0);
  }
}

void loop() 
{
  #ifdef TINYUSB_NEED_POLLING_TASK
  // Manual call tud_task since it isn't called by Core's background
  TinyUSBDevice.task();
  #endif

  uint8_t buf[64];
  uint32_t count = 0;
  while (SerialTinyUSB.available()) {
    buf[count++] = (uint8_t) toupper(SerialTinyUSB.read());
  }

  if (count) {
    SerialTinyUSB.write(buf, count);
  }
}