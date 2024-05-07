const int xAxisPin = A0;
const int yAxisPin = A1;
const int buttonPin = 13;

int xAxisValue = 0;
int yAxisValue = 0;
bool buttonState = false;

void setup() {
    Serial.begin(9600);
    pinMode(buttonPin, INPUT);
}

void checkJoystickMovement() {
    int centerPositionX = 512;
    int centerPositionY = 512;
    int safeZoneThreshold = 100;

    if (xAxisValue > centerPositionX + safeZoneThreshold) {
        Serial.println("MOVE: RIGHT");
    } else if (xAxisValue < centerPositionX - safeZoneThreshold) {
        Serial.println("MOVE: LEFT");
    }

    if (yAxisValue > centerPositionY + safeZoneThreshold) {
        Serial.println("MOVE: UP");
    } else if (yAxisValue < centerPositionY - safeZoneThreshold) {
        Serial.println("MOVE: DOWN");
    }
}

void loop() {
    xAxisValue = analogRead(xAxisPin);
    yAxisValue = analogRead(yAxisPin);
    buttonState = digitalRead(buttonPin);

    // Print joystick values
    Serial.println("JOYSTICK:" + String(xAxisValue) + "," + String(yAxisValue) + "," + String(buttonState));

    checkJoystickMovement();

    /*if (Serial.available()) {
        Serial.flush();
        String message = Serial.readStringUntil('\n');
        message.trim();
        if (message == '\n' || message.equals("")) {
        return;
        }

        Serial.println("JOYSTICK:" + String(xAxisValue) + "," + String(yAxisValue) + "," + String(buttonState));

        delay(200);
  }*/ //wtf esto no sirve

    delay(100);
}