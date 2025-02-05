document.getElementById('humidityCalcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const outsideTemp = parseFloat(document.getElementById('outsideTemp').value);
    const outsideHumidity = parseFloat(document.getElementById('outsideHumidity').value);
    const insideTemp = parseFloat(document.getElementById('insideTemp').value);
    const insideHumidity = parseFloat(document.getElementById('insideHumidity').value);
    const airflowPower = parseFloat(document.getElementById('airflowPower').value);

    // Функция для расчета давления насыщения водяного пара
    function saturationPressure(temperature) {
        return 6.112 * Math.exp((17.67 * temperature) / (temperature + 243.5));
    }

    // Функция для расчета абсолютной влажности в г/м³
    function absoluteHumidity(temperature, humidity) {
        const P = saturationPressure(temperature);  // Давление насыщения
        return (humidity / 100) * P;  // Абсолютная влажность в г/м³
    }

    // Абсолютная влажность за окном
    const outsideAbsoluteHumidity = absoluteHumidity(outsideTemp, outsideHumidity);

    // Абсолютная влажность в помещении
    const insideAbsoluteHumidity = absoluteHumidity(insideTemp, insideHumidity);

    // Разница в абсолютной влажности
    const humidityDifference = insideAbsoluteHumidity - outsideAbsoluteHumidity;

    // Необходимое увлажнение в граммах в час
    const requiredWaterInGrams = humidityDifference * airflowPower;

    // Переводим граммы в литры
    const requiredWaterInLiters = requiredWaterInGrams / 1000;

    // Отображаем результат
    document.getElementById('resultText').textContent = `Необходимое увлажнение: ${requiredWaterInLiters.toFixed(2)} литров в час.`;
});
