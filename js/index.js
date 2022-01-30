
async function main(find_name, group_name) {
    if (find_name) {

        //Generate groups_found
        let groups = await get_json("https://api-rasp-pskgu.herokuapp.com/groups?list_of_names=true")
        let list_names = groups.groups_list

        groups_found = []
        for (let i = 0; i < list_names.length; i++) {
            if (list_names[i].toLowerCase().indexOf(find_name.toLowerCase()) != -1) {
                if (groups_found.length > 5) {
                    break
                }
                groups_found.push(list_names[i])
            }
        }

        groups_found.sort()
        //console.log(groups_found);

        //Generate groups list
        let ul = document.createElement('ul');
        ul.setAttribute('id', 'Groups');
        document.getElementById('Groups_List').appendChild(ul);
        groups_found.forEach(renderGroupList);

        function renderGroupList(element, index, arr) {
            let li = document.createElement('li');
            li.setAttribute('class', 'item');
            let a = document.createElement('a');
            a.setAttribute('href', '?group_name=' + element)
            li.appendChild(a);
            ul.appendChild(li);
            a.innerHTML = a.innerHTML + element;

        }
        return
    } else if (group_name) {
        let group = await get_json("https://api-rasp-pskgu.herokuapp.com/groups?name=" + group_name)
        //console.log(group);

        let rasp = document.getElementById('Group_Rasp')

        //add name
        let name = document.createElement('h1');
        name.innerHTML = name.innerHTML + group.name;
        rasp.appendChild(name);

        let days_length = Object.keys(group.days).length
        if (days_length == 0) {
            let empty = document.createElement('h2');
            empty.innerHTML = empty.innerHTML + 'Расписание пустое';
            rasp.appendChild(empty);
            return
        }

        // generate tables
        let first_date = Object.keys(group.days)[0]
        let last_date = new Date(Object.keys(group.days)[days_length - 1])
        let day = get_monday(first_date)

        while (new Date(day) <= last_date) {
            let table = document.createElement('table');
            let tbody = document.createElement('tbody');

            generate_top(tbody)
            for (let i = 0; i < 7; i++) {
                let day_date = get_next_day(day, i)
                gen_row_data(tbody, day_date, group.days[day_date])
            }

            table.appendChild(tbody);
            rasp.appendChild(table);
            let div = document.createElement('br');
            rasp.appendChild(div);


            //console.log(day);
            day = get_next_day(day, 7)
        }
        return
    }
}



window.onload = async function () {
    const params = new URLSearchParams(window.location.search)
    let find_name = params.get("find_group_name")
    let group_name = params.get("group_name")
    await main(find_name, group_name)
}
