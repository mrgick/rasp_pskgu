/* Работа с Group_List элементом */

function generate_list(groups_found) {

    function add_group_to_list(name, ul) {
        let li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('class', 'groups-list__item');
        let a = document.createElement('a');
        a.setAttribute('href', '?group_name=' + name);
        a.setAttribute('class', 'groups-list__item-link');
        li.appendChild(a);
        ul.appendChild(li);
        a.innerHTML = a.innerHTML + name;
    }

    let ul = document.createElement('ul');
    ul.setAttribute('id', 'Groups');
    ul.setAttribute('class', 'groups-list');
    document.getElementById('Groups_List').appendChild(ul);

    for (let i = 0; i < groups_found.length; i++) {
        add_group_to_list(groups_found[i], ul)
    }
}
