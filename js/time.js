/* Файл для работы со временем */

function date_to_str(date) {
    return date.toISOString().split('T')[0];
}

function get_monday(date) {
    date = new Date(date);
    let day = date.getDay();
    let diff = date.getDate() - day + (day == 0 ? -6 : 1);
    date = new Date(date.setDate(diff))
    return date_to_str(date);
}

function get_next_day(date, n = 1) {
    date = new Date(date);
    let diff = date.getDate() + n;
    date = new Date(date.setDate(diff))
    return date_to_str(date);
}

const monthNames = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

const weekNames = [
    "Воскресенье", "Понедельник", "Вторник",
    "Среда", "Четверг", "Пятница", "Суббота"
];

const was_updated = {   'year' : ['год'   , 'года'  , 'лет'    ],
                        'month': ['месяц' , 'месяца', 'месяцев'],
                        'week' : ['неделю', 'недели', 'недель' ],
                        'day'  : ['день'  , 'дня'   , 'дней'   ]}

function getYearWeek(now)
{
    let onejan = new Date(now.getFullYear(), 0, 1);
    return week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
}

function getCurrentWeek(first_date)
{
    let mondate = getYearWeek(new Date(get_monday(first_date)));
    let todate = getYearWeek(new Date(get_monday(new Date())));
    return todate - mondate + 1;
}

function try_insert_ago (period, interval, difference) {
    let result = Math.floor(difference/interval)
    if (result > 0) return `${result} ${was_updated[period][result == 1? 0 : (result < 5? 1 : 2)]} назад)`
    else return false
}

function insert_date_of_last_update (last_date, last_update) {
    let difference = new Date() - last_update
    difference /= 1000*60*60*24

    let div = document.getElementById('date_of_last_update')
    if (div) {
        div.innerHTML = `
        <p>Последнее обновление:</p>
        <p>${last_update.getDate()} ${monthNames[last_update.getMonth()]} ${last_update.getFullYear()} (</p>
        `

        if (difference < 1) div.innerHTML += '<p>Обновлено сегодня</p>'
        else if (difference < 2) div.innerHTML += '<p>Обновлено вчера</p>'
        else for (i of [['year', 365], ['month', 30], ['week', 7], ['day', 1]]) {
            let result = try_insert_ago(...i, difference)
            if (result) {
                div.children[1].innerText += result
                break
            }
        }
    }

    if (difference > 30) {
        if (div) div.children[1].setAttribute('style', 'color: var(--color-error)')
        if (last_date <= new Date()) {
            up_warning('Все занятия по данному расписанию закончились, ' + 
                       'а последнее обновление было больше месяца назад. ' + 
                       'Возможно, оно более не используется.')
        }
    }  
}
