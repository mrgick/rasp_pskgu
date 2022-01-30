/* Файл генерации данных таблицы*/

// Генерация строки данных
function gen_row_data(table, day, day_info, prefix) {
    let tr = document.createElement('tr');
    add_td(day, tr)
    if (day_info) {
        for (let i = 1; i <= 7; i++) {
            if (day_info[i]) {
                add_td(day_info[i], tr)
            }
            else {
                add_td('', tr)
            }
        }
        //console.log(day_info);
    }
    else {
        for (let i = 0; i < 7; i++) {
            add_td('', tr)
        }
    }
    //console.log(day);
    table.appendChild(tr)
}
