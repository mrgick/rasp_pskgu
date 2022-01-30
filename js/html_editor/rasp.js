/* Работа с Group_Rasp элементом */

function rasp_add_group_name(group_name) {
    let name = document.createElement('h1');
    name.innerHTML = name.innerHTML + group_name;
    RASP.appendChild(name);
}

function rasp_add_empty() {
    let empty = document.createElement('h2');
    empty.innerHTML = empty.innerHTML + 'Расписание пустое';
    RASP.appendChild(empty);
}

function generate_table(group, day) {

    let table = document.createElement('table');
    let tbody = document.createElement('tbody');

    generate_top(tbody)
    for (let i = 0; i < 7; i++) {
        let day_date = get_next_day(day, i)
        gen_row_data(tbody, day_date, group.days[day_date], group.prefix[0])
    }

    table.appendChild(tbody);
    RASP.appendChild(table);
    let div = document.createElement('br');
    RASP.appendChild(div);
}


// Генерация шапки таблицы
num_cls = ['1-я', '2-я', '3-я', '4-я', '5-я', '6-я', '7-я']
time_cls = ['08:30-10:00', '10:15-11:45', '12:30-14:00', '14:15-15:45', '16:00-17:30', '18:00-19:30', '19:40-21:10']

function generate_top(table) {

    function div_in_td(txt1, txt2, tr, class_name) {
        let td = document.createElement('td');
        add_div(txt1, td, class_name + '1')
        add_div(txt2, td, class_name + '2')
        tr.appendChild(td)
    }

    let tr = document.createElement('tr');
    add_td('Дата', tr)
    for (let i = 0; i < 7; i++) {
        div_in_td(num_cls[i], time_cls[i], tr, 'top')
    }
    table.appendChild(tr)
}
