/* Работа с html элементами */

function add_td(name, tr, class_name)
{
    let td = document.createElement('td');
    if (class_name) td.setAttribute('class', class_name);
    td.innerHTML += name;
    tr.appendChild(td);
}

function add_div(text, element, class_name)
{
    let div = document.createElement('div');
    div.setAttribute('class', class_name);
    div.innerHTML += text;
    element.appendChild(div);
}
