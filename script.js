document.getElementById('humidityCalcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получаем значения из формы
    const outsideTemp = parseFloat(document.getElementById('outsideTemp').value);
    const outsideHumidity = parseFloat(document.getElementById('outsideHumidity').value);
    const insideTemp = parseFloat(document.getElementById('insideTemp').value);
    const insideHumidity = parseFloat(document.getElementById('insideHumidity').value);
    const airflowPower = parseFloat(document.getElementById('airflowPower').value);

    // Проверка на валидность введенных данных
    if (isNaN(outsideTemp) || isNaN(outsideHumidity) || isNaN(insideTemp) || isNaN(insideHumidity) || isNaN(airflowPower)) {
        alert("Пожалуйста, введите корректные числовые значения.");
        return; // Прерываем выполнение, если данные некорректны
    }

    // Функция для расчета давления насыщения водяного пара
    function saturationPressure(temperature) {
        return 6.112 * Math.exp((17.67 * temperature) / (temperature + 243.5));  // Давление насыщения
    }

    // Функция для расчета абсолютной влажности в г/м³
    function absoluteHumidity(temperature, humidity) {
        const P = saturationPressure(temperature); // Давление насыщения
        return (humidity / 100) * P * 2.167; // Абсолютная влажность в г/м³
    }

    // Абсолютная влажность за окном
    const outsideAbsoluteHumidity = absoluteHumidity(outsideTemp, outsideHumidity);
    // Абсолютная влажность в помещении
    const insideAbsoluteHumidity = absoluteHumidity(insideTemp, insideHumidity);

    // Разница в абсолютной влажности
    const humidityDifference = insideAbsoluteHumidity - outsideAbsoluteHumidity;

    // Проверка, что разница положительная, иначе увлажнение не требуется
    if (humidityDifference <= 0) {
        document.getElementById('resultText').textContent = "Увлажнение не требуется, влажность внутри уже достаточно высокая.";
        return;
    }

    // Необходимое увлажнение в граммах в час
    const requiredWaterInGrams = humidityDifference * airflowPower;

    // Переводим граммы в литры
    const requiredWaterInLiters = requiredWaterInGrams / 1000;

    // Логирование промежуточных результатов для отладки
    console.log("Температура за окном:", outsideTemp);
    console.log("Влажность за окном:", outsideHumidity);
    console.log("Абсолютная влажность за окном:", outsideAbsoluteHumidity);
    console.log("Абсолютная влажность в помещении:", insideAbsoluteHumidity);
    console.log("Разница влажности:", humidityDifference);
    console.log("Необходимое увлажнение в граммах:", requiredWaterInGrams);
    console.log("Необходимое увлажнение в литрах:", requiredWaterInLiters);

    // Отображаем результат с точностью до 2 знаков
    document.getElementById('resultText').textContent = `Необходимое увлажнение: ${requiredWaterInLiters.toFixed(2)} литров в час.`;
});
