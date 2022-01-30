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

// Генерация шапки таблицы
function generate_top(table) {
    // Генерация номеров пар
    function gen_num(table) {
        let tr = document.createElement('tr');
        add_td('Пары', tr)
        for (let i = 1; i < 8; i++) {
            add_td(i + '-я', tr)
        }
        table.appendChild(tr)
    }
    // Генерация времени пар
    function gen_time(table) {
        let tr = document.createElement('tr');
        add_td('Время', tr)
        add_td('08:30-10:00', tr)
        add_td('10:15-11:45', tr)
        add_td('12:30-14:00', tr)
        add_td('14:15-15:45', tr)
        add_td('16:00-17:30', tr)
        add_td('18:00-19:30', tr)
        add_td('19:40-21:10', tr)
        table.appendChild(tr)
    }

    gen_num(table)
    gen_time(table)
}