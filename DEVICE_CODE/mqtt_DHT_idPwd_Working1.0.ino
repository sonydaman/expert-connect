
/*
  MQTT DHT22, when "temperature, c" is sent it returns the temperature in celcius
  when "humidity" is sent it returns the humidity as measured by the DHT22
  the signal pin is connected to a pull-ip resistor and GPIO 2
*/
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

#define DHTTYPE DHT11
#define DHTPIN  4
#define COMMANDPIN 13 
//PIN 13 is actually D7
//PIN 4 is actually D2

/*
 * 27.61.217.213
 * 
 * 
 * 
 */



// Update these with values suitable for your network.

//const char* ssid = "Basu's LinksysE900 ";
const char* ssid = "Airtel-E5573-F73B";
//const char* password = "AXG4adQG";
const char* password = "420ge515";
//const char* mqtt_server = "192.168.1.101:1883";
const char* mqtt_server = "broker.hivemq.com";
int mqtt_port=1883;
const char* clientID = "NodeMCUDevKit";
const char* outTopicTemp = "testtopic/Sumanta/RoomTemp";
const char* outTopicHum =  "testtopic/Sumanta/RoomHumid";
const char* outTopicBlkChn =  "testtopic/Sumanta/BlockChain";
const char* outTopicMqtt = "topic/SensorData";
const char* commandTopic = "topic/ControlData";
const char* inTopic = "testtopic/basu/temp2";
const char* sensorId = "sensor001";

/*
 * SensorType:TempC,Humidity,Lux
 * 
 * 
 */

//void gettemperature(void);

// Initialize DHT sensor 
// NOTE: For working with a faster than ATmega328p 16 MHz Arduino chip, like an ESP8266,
// you need to increase the threshold for cycle counts considered a 1 or 0.
// You can do this by passing a 3rd parameter for this threshold.  It's a bit
// of fiddling to find the right value, but in general the faster the CPU the
// higher the value.  The default for a 16mhz AVR is a value of 6.  For an
// Arduino Due that runs at 84mhz a value of 30 works.
// This is for the ESP8266 processor on ESP-01 
DHT dht(DHTPIN, DHTTYPE, 11); // 11 works fine for ESP8266

float humidity, temp_c;  // Values read from sensor
float humidity_his = 0.0;
float temp_c_his = 0.0;
// Generally, you should use "unsigned long" for variables that hold time
unsigned long previousMillis = 0;        // will store last temp was read
const long interval = 2000;              // interval at which to read sensor
 
WiFiClient espClient;
PubSubClient client(espClient);
char msg1[20];
char msg2[20];
char blkMsg[100];
//String blkMsg = "";



void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  // Conver the incoming byte array to a string
  payload[length] = '\0'; // Null terminator used to terminate the char array
  
  String message = (char*)payload;

  Serial.print("Message arrived on topic: [");
  Serial.print(topic);
  Serial.print("],-");
  Serial.print(message);
  Serial.print("-");
  Serial.println();
 // if (topic.equals("testtopic/Sumanta/Command")){
    if(message.equals("ON")){
        digitalWrite(COMMANDPIN, HIGH);
    }
    if (message.equals("OFF")){
       digitalWrite(COMMANDPIN, LOW);
    }
  //}

}

void publish(){
  gettemperature();

    if (temp_c_his != temp_c){
      dtostrf(temp_c , 2, 2, msg1);
      
      client.publish(outTopicTemp, msg1);
  
      Serial.print("Sending temperature:");
      Serial.println(temp_c);
      sprintf(blkMsg,"{\"deviceId\":\"%s\",\"SensorType\":\"TempC\",\"SensorValue\":\"%s\"}",sensorId,msg1);
      client.publish(outTopicMqtt,blkMsg);
      Serial.println(blkMsg);
      temp_c_his = temp_c;
    }

    if (humidity_his != humidity){
      Serial.print("Sending humidity:");
      Serial.println(humidity);
    
      dtostrf(humidity , 2, 2, msg2);
      client.publish(outTopicHum, msg2);
      sprintf(blkMsg,"{\"deviceId\":\"%s\",\"SensorType\":\"Humidity\",\"SensorValue\":\"%s\"}",sensorId,msg2);
      Serial.println(blkMsg);
      client.publish(outTopicMqtt,blkMsg);
      humidity_his = humidity;
    }
    /*
     * {"sensor":sensorId,"tempC":33,"humidity":77}
     */
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(clientID,"testuser", "testpass")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish(outTopicTemp, clientID);
      client.publish(outTopicHum, clientID);
      // ... and resubscribe
      client.subscribe(inTopic);
      client.subscribe(commandTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(COMMANDPIN,OUTPUT);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  dht.begin();           // initialize temperature sensor

}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  publish();
  //Serial.println("Sleeping for 5 Sec!!...");
  delay(250); // wait 250 ml before next publish
  //Serial.print("...Resuming after elapsing 5 Sec!!");
}

void gettemperature() {
  // Wait at least 2 seconds seconds between measurements.
  // if the difference between the current time and last time you read
  // the sensor is bigger than the interval you set, read the sensor
  // Works better than delay for things happening elsewhere also
  unsigned long currentMillis = millis();
 
  if(currentMillis - previousMillis >= interval) {
    // save the last time you read the sensor 
    previousMillis = currentMillis;   

    // Reading temperature for humidity takes about 250 milliseconds!
    // Sensor readings may also be up to 2 seconds 'old' (it's a very slow sensor)
    humidity = dht.readHumidity();          // Read humidity (percent)
    temp_c = dht.readTemperature();     // Read temperature as Celcius
    // Check if any reads failed and exit early (to try again).
    if (isnan(humidity) || isnan(temp_c)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }
  }
}

