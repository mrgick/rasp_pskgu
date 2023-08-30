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

        this.prefix = get_prefix_from(group_json.prefix)

        this.REs = (this.prefix == 'Преподаватель'? teacher_REs : group_REs)

        document.querySelector('container.rpage').innerHTML += `
            <div id="${group_rasp_id}"></div>
        `
        this.type = 'tables'

        this.html = document.getElementById(group_rasp_id)
        
        this.original = group_json.page_url
        this.last_updated = group_json.last_updated

        this.days = Object.keys(group_json.days).sort()
        this.tables = []

        if (this.days.length > 0) {
            this.first_day = new Rasptime(this.days[0])
            this.first_day.backward_to_monday()
            this.last_day = new Rasptime(this.days.at(-1))
            this.last_day.backward_to_monday()

            let day = this.first_day.date
            while (day <= this.last_day.date) {
                this.tables.push(new rasp_table(this, day))
                day = Rasptime.get_next_day(day, 7)
            }

            for (day of this.days) this.insert_day(day)

            this.week_now = this.get_week_now()
            this.weeks_total = this.tables.length
        }
        else {
            this.first_day = new Rasptime('9999-01-01')
            this.last_day  = new Rasptime('0001-01-01')
            this.week_now = -1
            this.weeks_total = 0
        }

        this.compared_with = []
        this.highlighted = null

        this.last_visited = null
        this.last_used_anim = '_2'

        let switcher = document.getElementById('rasp_type_switcher')
        if (switcher) {
            switcher.setAttribute('class', 'switcher-to_list_type')
            switcher.setAttribute('onclick', 'rasp_type="list"; save_mode_to_cookie(); window.location.reload()')
            switcher.querySelector('label').innerText = 'Списочный вид'
        }
    }

    cover_days_to (day) {
        day = Rasptime.date_from_any(day)

        if (this.last_day.date < day) {
            let new_day = Rasptime.get_next_day(Rasptime.get_monday(this.last_day), 7)

            while (new_day <= day) {
                this.tables.push(new rasp_table(this, new_day))
                new_day = Rasptime.get_next_day(new_day, 7)
            }
            this.last_day = new Rasptime(day)

            this.weeks_total = this.tables.length

            generate_weekbar(weekbar_type)
        }

        else if (day < this.first_day.date) {
            let new_day = this.first_day.date
            do {
                new_day = Rasptime.get_next_day(new_day, -7)
                this.tables.unshift(new rasp_table(this, new_day, 'before'))
            } while (new_day > day)
            this.first_day = new Rasptime(day)

            this.tables[0].set_week_cascadely(1)

            week_cal_offset = 0
            generate_weekbar(weekbar_type)
        }
    }

    insert_day (day, group_json = null, group = null) {
        day = Rasptime.date_from_any(day)

        if (group_json == null) {
            if (!this.days.includes(day)) return
            else group_json = this.days[day]
        }

        this.cover_days_to(day)
        let table = this.get_table_contains(day)
        if (table !== null) table.insert_day(day, group_json, group)
    }

    insert_event (event) {
        let table = this.get_table_contains(event.date)
        if (table) return table.insert_event(event)
        else return null
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

            let cmp_prefix = get_prefix_from(group_json.prefix)

            this.REs = cmp_prefix == 'Преподаватель'? teacher_REs : group_REs

            for (let day in group_json.days) {
                this.insert_day(day, group_json.days[day], group)
            }

            this.REs = this.prefix == 'Преподаватель'? teacher_REs : group_REs

            let index = this.compared_with.indexOf(group)
            if (index < auto_colouring_compared_groups.length) {
                this.colour_compared_group(group, auto_colouring_compared_groups[index])
            }

            this.build_compare_panel(group)

            if (enter != null) enter.setAttribute('class', 'compare_accepted')
        }
        catch { if (enter != null) enter.setAttribute('class', 'compare_denied') }
        else if (enter != null) enter.setAttribute('class', 'compare_denied')
    }

    build_compare_panels () {
        for (let group of this.compared_with) this.build_compare_panel(group)
    }

    build_compare_panel (group) {
        if (this.compared_with.indexOf(group) !== -1 && group != this.name) try {
            let index = this.compared_with.indexOf(group)
            if (index < auto_colouring_compared_groups.length) {
                this.colour_compared_group(group, auto_colouring_compared_groups[index])
            }

            let list = document.getElementById('Compare_list')
            let preview = document.createElement('div')
            preview.setAttribute('class'  , 'compared_group_elem')
            preview.setAttribute('id'     , 'pre_cmp_' + group)
            preview.onclick = function () { main_rasp.highlight_compared_group(group) }
            preview.innerHTML = `
            <div style="background-color: ${auto_colouring_compared_groups[index]}"></div>
            <label>${group}</label>
            `
            list.appendChild(preview)

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
            td.onclick = function () { main_rasp.highlight_compared_group(group) }
            tr.appendChild(td)

            td = new_clr_input(cmp_clr_input_width, auto_colouring_compared_groups[index], group, true, 3, 3, cmp_clr_input_height)
            td.style.width = cmp_clr_input_width.toString() + 'px'
            let check_input = td.children[0]
            let div         = td.children[1]
            let clr_input   = td.children[2]

            let preview_clr = preview.children[0]

            clr_input.title = ''
            clr_input.oninput = function () {
                div.style.backgroundColor = clr_input.value
                preview_clr.style.backgroundColor = clr_input.value
                main_rasp.colour_compared_group(group, clr_input.value)
                check_input.checked = true
            }
            clr_input.onchange = null
            check_input.onchange = function () {
                if (check_input.checked) {
                    main_rasp.colour_compared_group(group, clr_input.value)
                    preview_clr.style.opacity = '1'
                }
                else {
                    main_rasp.decolour_compared_group(group)
                    preview_clr.style.opacity = '.1'
                }
            }
            tr.appendChild(td)

            table.appendChild(tr)
        } catch (error) {console.error(error)}
    }
    
    stop_comparing (group) {
        if (this.compared_with.indexOf(group) !== -1) {
            this.compared_with.splice(this.compared_with.indexOf(group), 1)
            for (let table of this.tables) table.remove_lessons_of(group)

            try { document.getElementById('pre_cmp_' + group).remove() } catch {}
            try { document.getElementById(    'cmp_' + group).remove() } catch {}
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

        document.getElementById('pre_cmp_' + this.name).style.opacity = '1'
        document.getElementById(    'cmp_' + this.name).style.opacity = '1'
        let text = ''
        for (let c_group of this.compared_with) {
            text += `
            div[class$='pre_cmp_${c_group}'] {opacity: 0.25}
            div[class$='cmp_${c_group}'] {opacity: 0.25}
            `
            document.getElementById('pre_cmp_' + c_group).style.opacity = '0.25'
            document.getElementById(    'cmp_' + c_group).style.opacity = '0.25'
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
            document.getElementById('pre_cmp_' + this.name).style.opacity = '0.25'
            document.getElementById(    'cmp_' + this.name).style.opacity = '0.25'
            document.getElementById('pre_cmp_' + group).style.opacity = '1'
            document.getElementById(    'cmp_' + group).style.opacity = '1'

            for (let c_group of this.compared_with) {
                if (c_group !== group) {
                    text += `
                    div[class$='pre_cmp_${c_group}'] { opacity: 0.25; }
                    div[class$='cmp_${c_group}'] { opacity: 0.25; }
                    `
                    document.getElementById('pre_cmp_' + c_group).style.opacity = '0.25'
                    document.getElementById(    'cmp_' + c_group).style.opacity = '0.25'
                }
            }
            document.getElementById('style_compare').innerHTML = text
        }
    }

    stop_highlighting () {
        document.getElementById('style_compare').innerHTML = ''
        document.getElementById('pre_cmp_' + this.name).style.opacity = '1'
        document.getElementById(    'cmp_' + this.name).style.opacity = '1'
        for (let c_group of this.compared_with) {
            document.getElementById('pre_cmp_' + c_group).style.opacity = '1'
            document.getElementById(    'cmp_' + c_group).style.opacity = '1'
        }
        this.highlighted = null
    }

    //hide_

    clipboard_link () {
        let link = document.location.toString().split('?')[0]
        link += '?group_name=' + this.name + '&compare_to=' + this.compared_with.join(',')
        copy_to_CB(link)
    }

    contains (day) { 
        day = Rasptime.date_from_any(day)
        return (this.first_day.date <= day && day <= this.last_day.date) 
    }

    get_table_index_contains (day) {
        for (let i = 0; i < this.tables.length; i++) {
            if (this.tables[i].contains(day)) return i
        }
        return null
    }

    get_table_contains (day) {
        console.log(this.tables)
        for (let table of this.tables) {
            if (table.contains(day)) return table
        }
        return null
    }

    get_table_now () { return this.get_table_contains(Rasptime.date_now()) }
    get_week_now () { return this.get_table_now()?.week }

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
        this.weeks_total = this.tables.length
    }

    get_monday_at_week (week_num) {
        return this.first_day.copy().backward_to_monday().next_day((week_num - 1)*7)
    }

    get_week_num_at_day (day) {
        let table = this.get_table_contains(day)
        return table == null? null : table.week
    }

    get_lessons_on_day (date, group = null) {
        date = Rasptime.date_from_any(date)
        if (this.compared_with.indexOf(group) === -1) group = this.name

        let result = {}
        for (let i = 0; i < lessons_count; i++) result[i+1] = []

        let table = this.get_table_contains(date)

        if (table != null) {
            let lessons = table.lessons_of[group]
            for (let lesson of lessons) {
                let lid = lesson.parentElement.id
                if (lid.startsWith(date)) {
                    let num = Number(lid.split('-').at(-1))
                    result[num].push(lesson)
                }
            }
        }

        return result
    }

    get_next_lesson_after (day, time = '08:00') {
        day = Rasptime.date_from_any(day)
        let ans = Rasptime.lesson_and_bool_from_time(time)
        time = ans[0] + 1 + (ans[1]? 0 : 1)

        if (time > lessons_count + 1) {
            day = Rasptime.get_next_day(day)
            time = 1
        }
        let min_date_id = day + '-' + time.toString()

        let table_index = this.get_table_index_contains(day)
        if (table_index == null) return null

        while (table_index < this.tables.length) {
            let table = this.tables[table_index]
            let lessons = table.lessons_of[this.name]

            for (let lesson of lessons) {
                if (lesson.parentElement.getAttribute('id') >= min_date_id) return lesson
            }

            table_index++
        }

        return null
    }

    get_next_lesson_from_now () {
        let now = new Rasptime()
        return this.get_next_lesson_after(now.date, now.time)
    }

    get_prev_lesson_before (day, time = '08:00') {
        day = Rasptime.date_from_any(day)
        time = Rasptime.lesson_from_time(time) + 1

        if (time < 1) {
            day = Rasptime.get_next_day(day, -1)
            time = lessons_count
        }
        let max_date_id = day + '-' + time.toString()

        let table_index = this.get_table_index_contains(day)
        if (table_index == null) return null

        while (table_index > 0) {
            let table = this.tables[table_index]
            let lessons = table.lessons_of[this.name]

            for (let i = lessons.length-1; i > 0; i--) {
                if (lessons[i].parentElement.getAttribute('id') <= max_date_id) return lessons[i]
            }

            table_index--
        }

        return null
    }

    get_prev_lesson_from_now () {
        let now = new Rasptime()
        return this.get_prev_lesson_before(now.date, now.time)
    }

    lid_from_lesson (node) { return node.parentElement.getAttribute('id') }

    track_time_cell (lesson, status) {
        let cell = document.getElementById(lesson)
        if (cell) switch (status) {
            case 'usual':
                try {cell.removeAttribute('style')}
                catch {}
                break

            case 'disable': 
                cell.style['background'] = 'rgba(128, 128, 128, 0.25)'
                cell.style['opacity'] = '0.5' 
                break

            case 'active': 
                cell.style['background'] = 'var(--color-time_tracking)'
                break

            case 'part_active': 
                let p = get_lesson_percentage()
                cell.style['background'] = `linear-gradient(to right, var(--color-time_tracking) ${p}%, transparent ${p}%)`
                break

            case 'in_future': 
            default:
                cell.style['backgroundColor'] = 'transparent'
                break
        }
    }

    get_day_workload (day = 'today') {
        if (day == 'today') day = Rasptime.date_now()
        let workload = []
        for (let i = 0; i < lessons_count; i++) workload.push(0)

        if (!this.contains(day)) return workload

        let week_nodes = this.get_table_contains(day).lessons_of[this.name]
        for (let lesson of week_nodes) {
            if (lesson.getAttribute('class') == 'block_0' && 
                lesson.parentElement.id.startsWith(day)
                ) {
                let pair = Number(lesson.parentElement.id.split('-').at(-1)) - 1
                workload[pair] = 1
            }
        }

        return workload
    }

    fill_week_list (list) {
        let week_count = this.tables.length

        for (let week = 0; week < week_count; week++) {
            let first_week_day = this.tables[week].first_day.obj_date
            let last_week_day  = this.tables[week].last_day.obj_date

            const dayDate = first_week_day.getDate().toString()
            const dayMonth = monthNames[first_week_day.getMonth()].toString()
            const nextDayDate = last_week_day.getDate().toString()
            const nextDayMonth = monthNames[last_week_day.getMonth()].toString()

            let tr = document.createElement('tr')
            tr.onclick = function () { main_rasp.go_to('Week_' + (week + 1).toString()) }

            let td_1 = document.createElement('td')
            let td_2 = document.createElement('td')
            let td_3 = document.createElement('td')
            let td_4 = document.createElement('td')
            let td_5 = document.createElement('td')
            let td_6 = document.createElement('td')

            td_1.innerText = (week + 1).toString() + ')'
            td_2.innerText = dayDate
            td_3.innerText = dayMonth
            td_4.innerText = '-'
            td_5.innerText = nextDayDate
            td_6.innerText = nextDayMonth

            tr.appendChild(td_1)
            tr.appendChild(td_2)
            tr.appendChild(td_3)
            tr.appendChild(td_4)
            tr.appendChild(td_5)
            tr.appendChild(td_6)

            list.appendChild(tr)
        }
        try {list.children[this.week_now - 1].setAttribute('style', 'font-weight: bold')}
        catch {}
    }

    go_to (elem_id = null, rewrite_hash = true) {
        if (type_of(elem_id) != 'string') elem_id = Rasptime.date_now()

        if (rewrite_hash) document.location.hash = '#' + elem_id

        let block = document.getElementById(elem_id)
        if (block) {
            block.scrollIntoView()
            document.children[0].scrollBy(0, -160)
            if (this.last_visited != null) this.last_visited.classList.remove('temporary_highlighted' + this.last_used_anim)
            this.last_visited = block
            this.last_used_anim = (this.last_used_anim == ''? '_2' : '')
            block.classList.add('temporary_highlighted' + this.last_used_anim)
        }
    }
}

class rasp_table {
    constructor (full_rasp_ref, day_date, where = 'after') {
        this.rasp = full_rasp_ref

        this.first_day = new Rasptime(day_date)
        this.last_day = new Rasptime(day_date)
        this.last_day.next_day(6)

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

    insert_event (event) {
        let td = this.html.querySelector('td#' + CSS.escape(event.date.date + '-' + event.lesson))
        if (td) {
            let block_event = td.querySelector('div.block_event')
            if (!block_event) {
                block_event = document.createElement('div')
                block_event.setAttribute('class', 'block_event')
                td.appendChild(block_event)
            }

            let event_div = document.createElement('div')
            event_div.setAttribute('style', `background-color: ${event.event_colour}`)
            event_div.setAttribute('title', event.description)
            event_div.setAttribute('class', 'base')
            event_div.innerText = event.heading
            event_div.onclick = () => {
                mobile_version? open_event_editor() : switch_event_list()
                main_rasp.go_to('event_blank_' + event.eid.toString(), false)
            }

            block_event.appendChild(event_div)

            if (event.hide_lessons) {
                for (block of td.children) block.style.opacity = 0.5
                block_event.style.opacity = 1
            }

            return event_div
        }
        else return null
    }

    contains (day) {
        day = Rasptime.date_from_any(day)
        return (this.first_day.date <= day && day <= this.last_day.date)
    }
}

function get_empty_table_tag (week, first_week_day) {
    let table = document.createElement('div')
    table.setAttribute('class', group_rasp_id_table)
    table.setAttribute('id', 'Week_' + week.toString())

    first_week_day = new Rasptime(first_week_day)
    first_week_day.backward_to_monday()
    const formated_first_day = first_week_day.get_rasp_date()

    let top_table = '<tr><td class="rasp-table-date"><p>Дата</p></td>'
    for (let i = 1; i <= lessons_count; i++) top_table += `
    <td class="rasp-table-shedule">
        <div class="rasp-table-shedule-pair">${num_cls[i-1]}</div>
        <div class="rasp-table-shedule-time">${time_cls[i-1]}</div>
    </td>`
    top_table += '</tr>'

    let middle_table = ''
    for (let day = 1; day <= 7; day++) {
        middle_table += `
        <tr>
            <td class="rasp-table-day" id="${first_week_day.date}">
                <p class="rasp-table-day-date">${first_week_day.get_rasp_date()}</p>
                <p class="rasp-table-day-weekdate">${first_week_day.get_week_day_name()}</p>
            </td>
        `

        for (let lesson = 1; lesson <= lessons_count; lesson++) {
            middle_table += `
            <td class="rasp-table-pair" id="${first_week_day.date}-${lesson}"></td>
            `
        }

        middle_table += '</tr>'
        first_week_day.next_day()
    }

    first_week_day.next_day(-1)
    const formated_last_day = first_week_day.get_rasp_date()

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
    if (type_of(insert_after) == 'number') {
        child = document.getElementById('Week_' + insert_after.toString())
    }
    else if (type_of(insert_after) == 'string') {
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
        if (child == null) first_week_day = Rasptime.date_now()
        else first_week_day = Rasptime.get_next_day(child.querySelector('tbody > :last-child').children[0].getAttribute('id'), 1)
    }
    else first_week_day = Rasptime.date_from_any(first_week_day)

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

function generate_printable_table (group, day, week_number) {
    let rasp = document.createElement('div')
    rasp.classList.add('Printable_rasp')
    rasp.id = `Week_${week_number}`

    day = new Rasptime(day)
    day.backward_to_monday()
    const formated_first_day = day.get_rasp_date()
    day.next_day(6)
    const formated_last_day = day.get_rasp_date()
    day.next_day(-6)

    rasp.innerHTML  = `
    <div>
        <h3 class="rasp-title">${week_number}-я неделя (${formated_first_day} - ${formated_last_day})</h3>
        <h3 class="rasp-group">${group.name.replaceAll('_', ' ')}</h3>
    </div>
    `
    let table = document.createElement('table')
    table.classList.add('rasp-table')
    let tbody = document.createElement('tbody')

    generate_top(tbody)
    for (let i = 0; i < lessons_count; i++) {
        let day_date = Rasptime.get_next_day(day.date, i)
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

    table.appendChild(tbody)
    rasp.appendChild(table)
    let div = document.createElement('br')
    rasp.appendChild(div)
    document.getElementById('Printable_Group_Rasp').appendChild(rasp)
}

// Генерация шапки таблицы
function generate_top(table) {

    function div_in_td(txt1, txt2, tr, class_name) {
        let td = document.createElement('td')
        td.classList.add(class_name)
        add_div(txt1, td, class_name + '-pair')
        add_div(txt2, td, class_name + '-time')
        tr.appendChild(td)
    }

    let tr = document.createElement('tr');
    add_td('<p>Дата</p>', tr, 'rasp-table-date')
    for (let i = 0; i < lessons_count; i++) {
        div_in_td(num_cls[i], time_cls[i], tr, 'rasp-table-shedule')
    }
    table.appendChild(tr)
}