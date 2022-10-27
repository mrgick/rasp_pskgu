/* Работа с Group_Rasp элементом */

function rasp_add_empty() {
    let empty = document.createElement('h2');
    empty.innerHTML = empty.innerHTML + 'Расписание пустое';
    document.getElementById(group_rasp_id).appendChild(empty);
}

class full_rasp {
    constructor (group_json) {
        this.group_json = group_json

        this.name = group_json.name

        this.prefix = null
        switch(group_json.prefix[0].toLowerCase()) {
            case 'преподаватель':
                this.prefix = 'Преподаватель'
                break;

            case 'колледж':
                this.prefix = group_json.prefix[1].toLowerCase() == 'преподаватель'? 
                    'Преподаватель' : 'Группа'
                break;

            case 'ОФО':
            case 'ЗФО':
            default:
                this.prefix = 'Группа'
                break;
        }

        this.REs = (this.prefix == 'Преподаватель'? teacher_REs : group_REs)

        this.html = document.getElementById(group_rasp_id)
        
        this.original = group_json.page_url
        this.last_updated = group_json.last_updated

        this.days = Object.keys(group_json.days).sort()
        this.tables = []

        if (this.days.length > 0) {
            this.first_day = get_monday(this.days[0])
            this.last_day = this.days.at(-1)

            let day = this.first_day
            while (day <= this.last_day) {
                this.tables.push(new rasp_table(this, day))
                day = get_next_day(day, 7)
            }

            for (day of this.days) this.insert_day(day)

            this.week_now = this.get_week_now()
        }
        else {
            this.first_day = null
            this.last_day = null

            this.week_now = null
        }

        this.compared_with = []
        this.highlighted = null

        let table = document.getElementById('ComparePanel-table')
        
        if (table != null) {
            table = table.children[0]

            let tr = document.createElement('tr')
            tr.setAttribute('id', 'cmp_' + this.name)
            tr.style.borderBottom = '10px solid var(--color-background)'

            let td = document.createElement('td')
            td.innerText = '×'
            td.style.color = 'var(--color-halftone_text)'
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = this.name
            td.style.padding = '0 5px'
            td.style.cursor = 'pointer'
            td.onclick = function () { main_rasp.highlight_own_group() }
            tr.appendChild(td)

            td = new_clr_input(60, rec_themes[MODE]['vars']['--color-error'], this.name, true)
            td.style.width = '60px'
            let check_input = td.children[0]
            let div         = td.children[1]
            let clr_input   = td.children[2]

            clr_input.title = ''
            clr_input.oninput = function () {
                div.style.backgroundColor = clr_input.value
                main_rasp.colour_own_group(clr_input.value)
                check_input.checked = true
            }
            clr_input.onchange = null
            check_input.onchange = function () {
                if (check_input.checked) main_rasp.colour_own_group(clr_input.value)
                else main_rasp.decolour_own_group()
            }
            check_input.checked = false
            tr.appendChild(td)

            table.appendChild(tr)
        }
    }

    cover_days_to (day) {
        if (this.last_day < day) {
            let new_day = get_next_day(get_monday(this.last_day), 7)

            while (new_day <= day) {
                this.tables.push(new rasp_table(this, new_day))
                new_day = get_next_day(new_day, 7)
            }
            this.last_day = day

            generate_weekbar(weekbar_type)
        }

        else if (day < this.first_day) {
            let new_day = this.first_day
            do {
                new_day = get_next_day(new_day, -7)
                this.tables.unshift(new rasp_table(this, new_day, 'before'))
            } while (new_day > day)
            this.tables[0].set_week_cascadely(1)
            this.first_day = day

            wco_min_value = -2 - weeks_between(this.first_day, new Date())
            wco_max_value = weeks_between(new Date(), this.last_day) - -2
            week_cal_offset = 0
            generate_weekbar(weekbar_type)
        }
    }

    insert_day (day, group_json = null, group = null) {
        if (group_json == null) {
            if (!this.days.includes(day)) return
            else group_json = this.days[day]
        }

        this.cover_days_to(day)
        let table = this.get_table_contains(day)
        if (table !== null) table.insert_day(day, group_json, group)
    }

    async compare_to (group) {
        let enter = document.getElementById('compare_name_enter')

        if (this.compared_with.indexOf(group) === -1 && group != this.name) try {
            let group_json = await get_group_info(group)
            if (group_json == null || group_json['detail'] != null) {
                if (enter != null) enter.setAttribute('class', 'compare_denied')
                return
            }

            this.compared_with.push(group)

            let cmp_prefix = null
            switch(group_json.prefix[0].toLowerCase()) {
                case 'преподаватель':
                    cmp_prefix = 'Преподаватель'
                    break;

                case 'колледж':
                    cmp_prefix = group_json.prefix[1].toLowerCase() == 'преподаватель'? 
                        'Преподаватель' : 'Группа'
                    break;

                case 'ОФО':
                case 'ЗФО':
                default:
                    cmp_prefix = 'Группа'
                    break;
            }

            this.REs = cmp_prefix == 'Преподаватель'? teacher_REs : group_REs

            for (let day in group_json.days) {
                this.insert_day(day, group_json.days[day], group)
            }

            let index = this.compared_with.indexOf(group)
            if (index < auto_colouring_compared_groups.length) {
                this.colour_compared_group(group, auto_colouring_compared_groups[index])
            }

            let table = document.getElementById('ComparePanel-table').children[0]

            let tr = document.createElement('tr')
            tr.setAttribute('id', 'cmp_' + group)
            //tr.style.borderBottom = '2px solid var(--color-background)'

            let td = document.createElement('td')
            td.innerText = '×'
            td.onclick = function () { main_rasp.stop_comparing(group) }
            tr.appendChild(td)

            td = document.createElement('td')
            td.innerText = group
            td.style.padding = '0 5px'
            td.style.cursor = 'pointer'
            td.onclick = function () { main_rasp.highlight_compared_group(group) }
            tr.appendChild(td)

            td = new_clr_input(60, auto_colouring_compared_groups[index], group, true)
            td.style.width = '60px'
            let check_input = td.children[0]
            let div         = td.children[1]
            let clr_input   = td.children[2]

            clr_input.title = ''
            clr_input.oninput = function () {
                div.style.backgroundColor = clr_input.value
                main_rasp.colour_compared_group(group, clr_input.value)
                check_input.checked = true
            }
            clr_input.onchange = null
            check_input.onchange = function () {
                if (check_input.checked) main_rasp.colour_compared_group(group, clr_input.value)
                else main_rasp.decolour_compared_group(group)
            }
            tr.appendChild(td)

            table.appendChild(tr)

            if (enter != null) enter.setAttribute('class', 'compare_accepted')
        }
        catch { if (enter != null) enter.setAttribute('class', 'compare_denied') }
        else if (enter != null) enter.setAttribute('class', 'compare_denied')
    }
    
    stop_comparing (group) {
        if (this.compared_with.indexOf(group) !== -1) {
            this.compared_with.splice(this.compared_with.indexOf(group), 1)
            for (let table of this.tables) table.remove_lessons_of(group)

            document.getElementById('cmp_' + group).remove()
        }
    }

    stop_comparing_all () {
        let groups = []
        for (let group of this.compared_with) groups.push(group)
        for (let group of groups) this.stop_comparing(group)
    }

    colour_own_group (colour) {
        let pale = merge_clrs(colour, rec_themes[MODE]['vars']['--color-background'])

        for (let table of this.tables) {
            if (table.lessons_of.hasOwnProperty(this.name)) {
                for (let lesson of table.lessons_of[this.name]) {
                    lesson.style.borderLeft = '3px solid ' + colour
                    lesson.style.backgroundColor = pale
                }
            }
        }
    }

    decolour_own_group () {
        for (let table of this.tables) {
            if (table.lessons_of.hasOwnProperty(this.name)) {
                for (let lesson of table.lessons_of[this.name]) {
                    lesson.style.borderLeft = ''
                    lesson.style.backgroundColor = ''
                }
            }
        }
    }

    colour_compared_group (group, colour) {
        if (group == this.name) return this.colour_own_group(colour)

        let pale = merge_clrs(colour, rec_themes[MODE]['vars']['--color-background'])

        if (this.compared_with.indexOf(group) !== -1) {
            for (let table of this.tables) {
                if (table.lessons_of.hasOwnProperty(group)) {
                    for (let lesson of table.lessons_of[group]) {
                        lesson.style.borderLeft = '3px solid ' + colour
                        lesson.style.backgroundColor = pale
                    }
                }
            }
        }
    }

    decolour_compared_group (group) {
        if (group == this.name) return this.decolour_own_group(colour)

        if (this.compared_with.indexOf(group) !== -1) {
            for (let table of this.tables) {
                if (table.lessons_of.hasOwnProperty(group)) {
                    for (let lesson of table.lessons_of[group]) {
                        lesson.style.borderLeft = ''
                        lesson.style.backgroundColor = ''
                    }
                }
            }
        }
    }

    highlight_own_group () {
        if (this.highlighted == this.name) {
            this.stop_highlighting()
            return
        }
        else this.highlighted = this.name

        document.getElementById('cmp_' + this.name).style.opacity = '1'
        let text = ''
        for (let c_group of this.compared_with) {
            text += `div[class$='cmp_${c_group}'] {opacity: 0.25}`
            document.getElementById('cmp_' + c_group).style.opacity = '0.25'
        }
        document.getElementById('style_compare').innerHTML = text
    }

    highlight_compared_group (group) {
        if (group == this.name) return this.highlight_own_group()

        if (this.highlighted == group) {
            this.stop_highlighting()
            return
        }
        else this.highlighted = group

        if (this.compared_with.indexOf(group) !== -1) {
            let text = '.block_0, .block_1, .block_2, .block_3 { opacity: 0.25; } '
            document.getElementById('cmp_' + this.name).style.opacity = '0.25'
            document.getElementById('cmp_' + group).style.opacity = '1'

            for (let c_group of this.compared_with) {
                if (c_group !== group) {
                    text += `div[class$='cmp_${c_group}'] { opacity: 0.25; } `
                    document.getElementById('cmp_' + c_group).style.opacity = '0.25'
                }
            }
            document.getElementById('style_compare').innerHTML = text
        }
    }

    stop_highlighting () {
        document.getElementById('style_compare').innerHTML = ''
        document.getElementById('cmp_' + this.name).style.opacity = '1'
        for (let c_group of this.compared_with) {
            document.getElementById('cmp_' + c_group).style.opacity = '1'
        }
        this.highlighted = null
    }

    //hide_

    clipboard_link () {
        let link = document.location.toString().split('?')[0]
        link += '?group_name=' + this.name + '&compare_to=' + this.compared_with.join(',')
        copy_to_CB(link)
    }

    contains (day) { return (this.first_day <= day && day <= this.last_day) }

    get_table_contains (day) {
        for (let table of this.tables) {
            if (table.contains(day)) return table
        }
        return null
    }

    get_table_now () { return this.get_table_contains(date_to_str(new Date())) }
    get_week_now () { return this.get_table_now().week }

    set_week_cascadely (from, number) {
        let i = this.tables.indexOf(from)
        if (i !== -1) {
            let delta = 0
            for (i; i < this.tables.length; i++) {
                this.tables[i].set_week(number + delta)
                delta++
            }
        }
        this.week_now = this.get_week_now()
    }
}

class rasp_table {
    constructor (full_rasp_ref, day_date, where = 'after') {
        this.rasp = full_rasp_ref

        this.first_day = day_date
        this.last_day = get_next_day(this.first_day, 6)

        if (where === 'after') {
            this.html = insert_empty_table(null, day_date)
        }
        else if (where === 'before') {
            this.html = insert_empty_table(null, day_date, 'start')
        }
        else {
            this.html = insert_empty_table(null, day_date, where)
        }
        this.week = Number(this.html.getAttribute('id').replace('Week_', ''))

        this.lessons_of = {}
        this.lessons_of[this.rasp.name] = []
    }

    set_week (number) {
        let title = this.html.querySelector('h3.rasp-title')
        if (title != null) title.innerText = title.innerText.replace(this.week.toString(), number.toString())
        this.html.setAttribute('id', 'Week_' + number.toString())
        this.week = number
    }

    set_week_cascadely (number) {
        this.rasp.set_week_cascadely(this, number)
    }

    insert_day (day, group_json = null, group = null) {
        if (!this.contains(day)) return
        if (group_json == null) group_json = this.rasp.group_json.days[day]
        if (group_json == null) return

        let comparing = ''
        if (group == null) group = this.rasp.name
        else comparing = '_cmp_' + group

        if (!this.lessons_of.hasOwnProperty(group)) this.lessons_of[group] = []

        for (let lesson_time in group_json) {
            let content = divide(group_json[lesson_time], this.rasp.REs)

            let td = this.html.querySelector('td#' + CSS.escape(day + '-' + lesson_time))
            if (td == null) continue

            for (let lesson in content) { // for each block (lesson)
                let div = document.createElement('div')
                div.setAttribute('class', 'block_' + lesson + comparing)
                this.lessons_of[group].push(div)
                td.appendChild(div)

                if (group != this.rasp.name) {
                    try {
                        let same = true
                        let cmp_lesson_content = group_json[lesson_time][lesson]
                        let main_lesson_content = this.rasp.group_json.days[day][lesson_time][lesson]

                        if (cmp_lesson_content.length != main_lesson_content.length) same = false

                        if (same) for (let i = 0; i < cmp_lesson_content.length; i++) {
                            if (cmp_lesson_content[i] !== main_lesson_content[i]) {
                                same = false
                                break
                            }
                        }

                        if (same) {
                            div.innerText = 'полностью аналогично'
                            continue
                        }
                    }
                    catch {}
                }

                for (let sub_div of content[lesson]) { // for each div in block
                    let text_div = document.createElement('div')
                    text_div.setAttribute('class', 'base ' + sub_div[0])

                    if (['teacher', 'group'].indexOf(sub_div[0].split('-')[0]) !== -1) {
                        text_div.setAttribute('style', 'cursor: pointer')
                        text_div.setAttribute('onclick', `go_to_link(event, '${sub_div[1]}', '${sub_div[0]}')`)
                    }
                    else text_div.addEventListener('click', (event) => {highlight_same(event.altKey, sub_div[0])})

                    text_div.innerText = sub_div[1]
                    div.appendChild(text_div)
                }
            }
        }
    }

    remove_lessons_of (group) {
        if (this.lessons_of.hasOwnProperty(group)) {
            for (let block of this.lessons_of[group]) block.remove()
            delete this.lessons_of[group]
        }
    }

    contains (day) {
        return (this.first_day <= day && day <= this.last_day)
    }
}

function get_empty_table_tag (week, first_week_day) {
    let table = document.createElement('div')
    table.setAttribute('class', group_rasp_id_table)
    table.setAttribute('id', 'Week_' + week.toString())

    first_week_day = get_monday(first_week_day)

    top_table = '<tr><td class="rasp-table-date"><p>Дата</p></td>'
    for (let i = 1; i <= 7; i++) top_table += `
    <td class="rasp-table-shedule">
        <div class="rasp-table-shedule-pair">${i}-я пара</div>
        <div class="rasp-table-shedule-time">${lessons_time[i*2-2]}-${lessons_time[i*2-1]}</div>
    </td>`
    top_table += '</tr>'

    middle_table = ''
    for (let day = 1; day <= 7; day++) {
        unformated_day = get_next_day(first_week_day, day-1)
        formated_day = new Date(unformated_day)

        middle_table += `
        <tr>
            <td class="rasp-table-day" id="${unformated_day}">
                <p class="rasp-table-day-date">${formated_day.getDate()} ${monthNames[formated_day.getMonth()]}</p>
                <p class="rasp-table-day-weekdate">${weekNames[formated_day.getDay()]}</p>
            </td>
        `

        for (let lesson = 1; lesson <= 7; lesson++) {
            middle_table += `
            <td class="rasp-table-pair" id="${unformated_day}-${lesson}"></td>
            `
        }

        middle_table += '</tr>'
    }

    formated_day = new Date(first_week_day)
    formated_first_day = `${formated_day.getDate()} ${monthNames[formated_day.getMonth()]}`
    formated_day = new Date(get_next_day(first_week_day, 6))
    formated_last_day = `${formated_day.getDate()} ${monthNames[formated_day.getMonth()]}`

    table.innerHTML= `
    <h3 class="rasp-title">${week}-я неделя (${formated_first_day} - ${formated_last_day})</h3>
    <table class="rasp-table">
        <tbody>
            ${top_table}

            ${middle_table}
        </tbody>
    </table>
    <br>
    `

    let last_tr = table.querySelector('table > tbody > tr:nth-last-child(1)')
    last_tr.children[last_tr.childElementCount - 1].style.borderRadius = '0 0 20px 0'

    return table
}

function insert_empty_table (week = null, first_week_day = null, insert_after = null) {
    let child = null
    if (typeof insert_after == 'number') {
        child = document.getElementById('Week_' + insert_after.toString())
    }
    else if (typeof insert_after == 'string') {
        if (insert_after === 'start') child = document.getElementById(group_rasp_id).children[0]
        else child = document.getElementById(insert_after)
    }
    else if (typeof insert_after == 'object') {
        child = insert_after
    } 
    else return

    if (insert_after == null) {
        let rasps = document.getElementById(group_rasp_id)
        if (rasps.childElementCount == 0) child = null
        else child = rasps.lastChild
    } 
    
    if (week == null) {
        if (child == null) week = 1
        else week = Number(child.getAttribute('id').replace('Week_', '')) + 1
    }

    if (first_week_day == null) {
        if (child == null) first_week_day = date_to_str(new Date())
        else first_week_day = get_next_day(child.querySelector('tbody > :last-child').children[0].getAttribute('id'), 1)
    }

    table = get_empty_table_tag(week, first_week_day)

    if (insert_after === 'start') child.insertAdjacentElement('beforeBegin', table)
    else if (child == null) {
        rasps = document.getElementById(group_rasp_id)
        if (rasps == null) return
        else rasps.appendChild(table)
    }
    else child.insertAdjacentElement('afterEnd', table)

    return table
}

function clear_all () { document.getElementById(group_rasp_id).innerHTML = '' }

function generate_printable_table(group, day, week_number) {
    let rasp = document.createElement('div');
    rasp.classList.add('Printable_rasp');
    rasp.id = `Week_${week_number}`
    const dayDate = new Date(day).getDate();
    const dayMonth = monthNames[new Date(day).getMonth()];
    const nextDayDate = new Date(get_next_day(day, 6)).getDate();
    const nextDayMonth = monthNames[new Date(get_next_day(day, 6)).getMonth()];
    rasp.innerHTML  = `
    <div>
        <h3 class="rasp-title">${week_number}-я неделя (${dayDate} ${dayMonth} - ${nextDayDate} ${nextDayMonth})</h3>
        <h3 class="rasp-group">${group.name.replaceAll('_', ' ')}</h3>
    </div>
    `;
    let table = document.createElement('table');
    table.classList.add('rasp-table');
    let tbody = document.createElement('tbody');

    generate_top(tbody)
    for (let i = 0; i < 7; i++) {
        let day_date = get_next_day(day, i)
        gen_row_data(tbody, day_date, group.days[day_date], group.prefix[0])
    }
    used_class_names = create_used_class_names()

    //========================================= should to be remade in future =========================================//
    let i = 1
    while (document.getElementById('Week_' + i)) {
        try {
            eval(`Week_${i}.children[1].children[0].children[7].children[7].style['border-radius'] = '0px 0px 20px 0px'`)
            i++
        } catch {break}
    }
    //========================================= should to be remade in future =========================================//

    table.appendChild(tbody);
    rasp.appendChild(table);
    let div = document.createElement('br');
    rasp.appendChild(div);
    document.getElementById('Printable_Group_Rasp').appendChild(rasp);
}


// Генерация шапки таблицы
num_cls = ['1-я пара', '2-я пара', '3-я пара', '4-я пара', '5-я пара', '6-я пара', '7-я пара']
time_cls = ['08:30-10:00', '10:15-11:45', '12:30-14:00', '14:15-15:45', '16:00-17:30', '18:00-19:30', '19:40-21:10']

function generate_top(table) {

    function div_in_td(txt1, txt2, tr, class_name) {
        let td = document.createElement('td');
        td.classList.add(class_name);
        add_div(txt1, td, class_name + '-pair')
        add_div(txt2, td, class_name + '-time')
        tr.appendChild(td)
    }

    let tr = document.createElement('tr');
    add_td('<p>Дата</p>', tr, 'rasp-table-date')
    for (let i = 0; i < 7; i++) {
        div_in_td(num_cls[i], time_cls[i], tr, 'rasp-table-shedule')
    }
    table.appendChild(tr)
}