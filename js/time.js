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

function getYearWeek(now)
{
    let onejan = new Date(now.getFullYear(), 0, 1);
    return week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
}

function getCurrentWeek(first_date)
{
    let mondate = getYearWeek(new Date(get_monday(first_date)));
    let todate = getYearWeek(new Date(get_monday(new Date())));
    return todate - mondate;
}