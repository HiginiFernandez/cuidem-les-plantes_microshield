function mostra_temp_hum_dist () {
    OLED12864_I2C.clear()
    OLED12864_I2C.showString(
    0,
    0,
    "Temp:" + convertToText(input.temperature()) + " C",
    1
    )
    OLED12864_I2C.showString(
    0,
    1,
    "Humitat:" + convertToText(humitatTerra),
    1
    )
    OLED12864_I2C.showString(
    0,
    2,
    "Llum:" + convertToText(input.lightLevel()),
    1
    )
}
input.onButtonPressed(Button.A, function () {
    music.setBuiltInSpeakerEnabled(true)
    mostra_temp_hum_dist()
})
input.onButtonPressed(Button.B, function () {
    music.setBuiltInSpeakerEnabled(false)
})
function Benvinguda () {
    OLED12864_I2C.rect(
    0,
    0,
    62,
    25,
    1
    )
    OLED12864_I2C.showString(
    1,
    1,
    "Connectem",
    1
    )
    OLED12864_I2C.showString(
    1,
    2,
    "plaques",
    1
    )
}
// Si connectem el motor a M1 ocupem els pins 0 i 1, M2: 2 i3; M3: 4 i 5; M4: 6 i 7
let Distancia_aigua = 0
let humitatTerra = 0
OLED12864_I2C.init(60)
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
humitatTerra = pins.analogReadPin(AnalogReadWritePin.P1)
strip.showColor(neopixel.colors(NeoPixelColors.White))
Benvinguda()
basic.forever(function () {
    Distancia_aigua = sonar.ping(
    DigitalPin.P12,
    DigitalPin.P13,
    PingUnit.Centimeters
    )
    humitatTerra = pins.analogReadPin(AnalogReadWritePin.P1)
    if (humitatTerra >= 130 && humitatTerra <= 300) {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
        microshield.MotorStop(microshield.Motors.M4)
    } else if (humitatTerra < 130) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        microshield.MotorRun(microshield.Motors.M4, 50)
    } else {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        microshield.MotorStop(microshield.Motors.M4)
    }
    if (Distancia_aigua >= 8) {
        OLED12864_I2C.showString(
        0,
        3,
        "  Aigua NO OK",
        0
        )
        // El brunzidor ocupa el pin 0. Canviar l'interruptor per utilitzar la funció debrunzidor
        music.play(music.stringPlayable("C5 F C5 F C5 F C5 F ", 150), music.PlaybackMode.UntilDone)
    } else {
        OLED12864_I2C.showString(
        0,
        3,
        "  Aigua OK           ",
        0
        )
    }
})
