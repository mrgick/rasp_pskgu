/* Работа с Group_List элементом */

let GROUPSLIST

function generate_list(groups_found) {

    function add_group_to_list(name, ul) {
        let li = document.createElement('li');
        li.setAttribute('class', 'item');
        let a = document.createElement('a');
        a.setAttribute('href', '?group_name=' + name)
        li.appendChild(a);
        ul.appendChild(li);
        a.innerHTML = a.innerHTML + name;
    }

    let ul = document.createElement('ul');
    ul.setAttribute('id', 'Groups');
    GROUPSLIST.appendChild(ul);

    for (let i = 0; i < groups_found.length; i++) {
        add_group_to_list(groups_found[i], ul)
    }
}
