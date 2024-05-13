
function start (){
    document.getElementById('startDate').valueAsDate = new Date((new Date).getTime() - 7 * 24 * 60 * 60 * 1000);
    document.getElementById('endDate').valueAsDate = new Date;
}
start()

new DataTable('#example', {
    paging: false,
    scrollCollapse: true,
    scrollY: '50vh'
});
document.getElementById('clear').addEventListener('click', clearTable);
function clearTable(){
    const dataTable = $('#example').DataTable(); // Получаем ссылку на DataTable

    dataTable.clear().draw();
}

document.getElementById('periodSelector').addEventListener('change', function() {
    const period = this.value;
    const endDate = new Date(); // Текущая дата
    let startDate;

    switch (period) {
        case 'week':
            // Вычисляем начальную дату для недели назад
            startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 дней назад
            document.getElementById('startDate').style.display = 'none';
            document.getElementById('endDate').style.display = 'none';
            break;
        case 'month':
            // Вычисляем начальную дату для месяца назад
            startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate()); // Один месяц назад
            document.getElementById('startDate').style.display = 'none';
            document.getElementById('endDate').style.display = 'none';
            break;
        default:
            document.getElementById('startDate').style.display = 'block';
            document.getElementById('endDate').style.display = 'block';
            return;
    }

    // Устанавливаем начальную и конечную даты
    document.getElementById('startDate').valueAsDate = startDate;
    document.getElementById('endDate').valueAsDate = endDate;
});


const dateButton  = document.getElementById('dateButton')
dateButton.addEventListener('click', async () => {
    // console.log(typeof(document.getElementById('startDate').value));
    // console.log(document.getElementById('endDate').value);

    const startDate = document.getElementById('startDate').value; // ваша минимальная дата
  const endDate = document.getElementById('endDate').value; // ваша максимальная дата

  try {
    const response = await fetch(`/orders?start_date=${startDate}&end_date=${endDate}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const tempData = await response.json();
    const data = tempData.data;
    // console.log(data);

// Проходимся по каждому объекту JSON в массиве
const dataTable = $('#example').DataTable(); // Получаем ссылку на DataTable



data.forEach(item => {
    // Проверяем, есть ли уже такая строка в таблице
    const existingRow = dataTable.rows().data().filter(row => {
        return row[0] === item.date && row[1] === item.amount && row[2] === item.currency && row[3] === item.type;
    });

    // Если такая строка уже есть, не добавляем ее
    if (existingRow.length === 0) {
        dataTable.row.add([
            item.date,
            item.amount,
            item.currency,
            item.type
        ]).draw(false); // Добавляем строку в DataTable и перерисовываем таблицу
    }

});


// Задаем начальный и конечный цвета
    let initialColor = dateButton.style.backgroundColor;
    let targetColor = 'limegreen';
    dateButton.style.backgroundColor = targetColor;
    targetColor = initialColor;
    initialColor = 'limegreen';

    // Задаем продолжительность анимации (в миллисекундах)
    const animationDuration = 5000; // 5 секунд

    // Задаем шаг изменения цвета (насколько изменить цвет за каждый шаг анимации)
    const step = 10; // Шаг изменения цвета

    // Вычисляем количество шагов анимации
    const numSteps = animationDuration / step;

    // Вычисляем изменение цвета для каждого шага
    const colorChange = [
        (parseInt(targetColor.substring(1, 3), 16) - parseInt(initialColor.substring(1, 3), 16)) / numSteps,
        (parseInt(targetColor.substring(3, 5), 16) - parseInt(initialColor.substring(3, 5), 16)) / numSteps,
        (parseInt(targetColor.substring(5, 7), 16) - parseInt(initialColor.substring(5, 7), 16)) / numSteps
    ];

    // Функция для изменения цвета кнопки по шагам
    let currentStep = 0;
    const changeColor = () => {
        if (currentStep < numSteps) {
            // Вычисляем новый цвет кнопки
            const newColor = `rgb(${parseInt(initialColor.substring(1, 3), 16) + colorChange[0] * currentStep}, 
                ${parseInt(initialColor.substring(3, 5), 16) + colorChange[1] * currentStep}, 
                ${parseInt(initialColor.substring(5, 7), 16) + colorChange[2] * currentStep})`;

            // Устанавливаем новый цвет кнопки
            dateButton.style.backgroundColor = newColor;

            // Увеличиваем текущий шаг
            currentStep++;

            // Запускаем следующий шаг через шаг времени
            setTimeout(changeColor, 5);
        } else {
            // Устанавливаем конечный цвет кнопки после завершения анимации
            dateButton.style.backgroundColor = targetColor;
        }
    };

    // Запускаем анимацию изменения цвета кнопки
    changeColor();

  } catch {
    console.error('Error fetching data:');
  }



 });

const fileInput = document.getElementById('fileToUpload');
const sendButton = document.getElementById('send');

sendButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch("/orders", {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('Все успешно');

        } else {
            console.error('Ошибка сервера:', response.status);
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
});

document.getElementById('show-table').addEventListener('click', function() {
            // Показываем таблицу
            document.querySelector('.data-table').style.display = 'flex';
            // Скрываем блок с графиками
            document.getElementById('grafiks').style.display = 'none';
            document.getElementById('show-graphs').style.backgroundColor = 'lightgray';
            document.getElementById('show-table').style.backgroundColor = 'mediumpurple';
        });

        document.getElementById('show-graphs').addEventListener('click', function() {
            // Скрываем таблицу
            document.querySelector('.data-table').style.display = 'none';
            // Показываем блок с графиками
            document.getElementById('grafiks').style.display = 'flex';
            document.getElementById('show-table').style.backgroundColor = 'lightgray';
            document.getElementById('show-graphs').style.backgroundColor = 'mediumpurple';
        });

        // Инициализация DataTable
        document.addEventListener('DOMContentLoaded', function() {
            var table = $('#example').DataTable();
        });
