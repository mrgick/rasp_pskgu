/* Работа с html элементами */

function add_td(name, tr, class_name, date_id)
{
    let td = document.createElement('td');
    if (class_name) td.setAttribute('class', class_name);
    if (date_id) td.setAttribute('id', date_id);
    td.innerHTML += name;
    tr.appendChild(td);
}

function add_div(text, element, class_name, class_name_2 = '')
{
    let div = document.createElement('div');
    if (class_name_2) div.setAttribute('class', class_name_2 + ' ' + class_name);
    else div.setAttribute('class', class_name);
    div.innerHTML += text;
    element.appendChild(div);
}
