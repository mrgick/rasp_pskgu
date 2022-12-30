/* Работа с Group_List элементом */

function generate_list(groups_found, column_length = 50) {

    function add_group_to_list(name, ul) {
        let li = document.createElement('li');
        //li.setAttribute('class', 'item');
        li.setAttribute('class', 'groups-list__item');
        let a = document.createElement('a');
        a.setAttribute('href', '?group_name=' + name);
        a.setAttribute('class', 'groups-list__item-link');
        a.innerText = name;
        li.appendChild(a);
        ul.appendChild(li);
    }

    let lists = Math.floor((groups_found.length - 1) / column_length)

    if (lists == 0) {
        let ul = document.createElement('ul');
        ul.setAttribute('id', 'Groups');
        ul.setAttribute('class', 'groups-list');
        document.getElementById('Groups_List').appendChild(ul);

        for (let i = 0; i < groups_found.length; i++) {
            add_group_to_list(groups_found[i], ul)
        }
    }

    else for (let list = 0; list <= lists; list++) {
        let ul = document.createElement('ul');
        ul.setAttribute('id'   , 'Groups_' + list);
        ul.setAttribute('class', 'groups-list');
        ul.setAttribute('style', `display: inline-block; 
                                  min-width: 200px; 
                                  margin: 20px; 
                                  vertical-align: top;`);
        document.getElementById('Groups_List').appendChild(ul);

        let amount = document.createElement('li')
        amount.innerText = `Результаты ${column_length*list} - ${column_length*(list + 1)}`
        ul.appendChild(amount)

        for (let i = column_length*list; i < column_length*(list + 1); i++) {
            if (groups_found.length <= i) break
            add_group_to_list(groups_found[i], ul)
        }
    }
}
