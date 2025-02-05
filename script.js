
document.getElementById('humidityCalcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const outsideTemp = parseFloat(document.getElementById('outsideTemp').value);
    const outsideHumidity = parseFloat(document.getElementById('outsideHumidity').value);
    const insideTemp = parseFloat(document.getElementById('insideTemp').value);
    const insideHumidity = parseFloat(document.getElementById('insideHumidity').value);
    const airflowPower = parseFloat(document.getElementById('airflowPower').value);

    // Формула для расчета необходимого увлажнения
    const humidityDiff = insideHumidity - outsideHumidity;
    const airDensity = 1.225; // плотность воздуха в кг/м³ (при 20°C)
    const waterVaporDiff = humidityDiff * 0.003; // изменение массы водяного пара в воздухе

    const resultInLiters = airflowPower * waterVaporDiff * airDensity / 1000;

    document.getElementById('resultText').textContent = `Необходимое увлажнение: ${resultInLiters.toFixed(2)} литров в час.`;
});
