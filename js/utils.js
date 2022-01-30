// Get data from api (make request)
async function get_json(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

//--------------------------
//Working with time
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
//--------------------------

//--------------------------
//Working with tables

function add_td(name, tr) {
    let td = document.createElement('td');
    td.innerHTML += name
    tr.appendChild(td)
}

function gen_row_data(table, day, day_info) {
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
//--------------------------