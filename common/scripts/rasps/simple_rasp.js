/* Работа с Simple_Group_Rasp элементом */

class simple_rasp {
    constructor (group_json) {
        this.group_json = group_json

        this.name = group_json.name
        
        this.prefix = get_prefix_from(group_json.prefix)

        this.REs = this.prefix == 'Преподаватель'? teacher_REs : group_REs

        document.querySelector('container.rpage').innerHTML += `
            <div id="Simple_Group_Rasp"></div>
        `
        this.type = 'list'

        this.html = document.getElementById('Simple_Group_Rasp')
        
        this.original = group_json.page_url
        this.last_updated = group_json.last_updated

        let sorted_days = Object.keys(group_json.days).sort()
        this.days = []
        this.tables = {}

        this.compared_with = []
        this.highlighted = null

        if (sorted_days.length > 0) {
            this.first_day = new Rasptime(sorted_days[0])
            this.last_day = new Rasptime(sorted_days.at(-1))
            this.week_now = -1

            let day = this.first_day.date
            while (day <= this.last_day.date) {
                this.days.push(day)
                this.tables[day] = new rasp_day(this, day, false)
                this.tables[day].insert_day(group_json.days[day])
                day = Rasptime.get_next_day(day)
            }

            this.set_week_cascadely(this.first_day, 1)
        }
        else {
            this.first_day = new Rasptime('9999-01-01')
            this.last_day  = new Rasptime('0001-01-01')
            this.week_now = -1
        }

        this.last_visited = null
        this.last_used_anim = '_2'

        let switcher = document.getElementById('rasp_type_switcher')
        switcher.setAttribute('class', 'switcher-to_tables_type')
        switcher.setAttribute('onclick', 'rasp_type="tables"; save_mode_to_cookie(); window.location.reload()')
        switcher.querySelector('label').innerText = 'Табличный вид'
    }

    cover_days_to (day) {
        day = Rasptime.date_from_any(day)

        if (this.last_day.date < day) {
            let new_day = Rasptime.get_next_day(this.last_day)

            while (new_day <= day) {
                this.days.push(new_day)
                this.tables[new_day] = new rasp_day(this, new_day, false)
                new_day = Rasptime.get_next_day(new_day)
            }
            this.last_day = new Rasptime(day)

            this.set_week_cascadely(Rasptime.date_now(), this.week_now)

            generate_weekbar(weekbar_type)
        }

        else if (day < this.first_day.date) {
            let new_day = Rasptime.get_next_day(this.first_day, -1)

            do {
                this.days.unshift(new_day)
                this.tables[new_day] = new rasp_day(this, new_day, false)
                new_day = Rasptime.get_next_day(new_day, -1)
            } while (new_day >= day)
            
            this.first_day = new Rasptime(day)

            this.set_week_cascadely(this.first_day, 1)

            week_cal_offset = 0
            generate_weekbar(weekbar_type)
        }
    }

    insert_day (day, group_json = null, group = null) {
        if (group != null && group != this.name) {
            let cls_day = this.tables[day]
            if (cls_day !== null) cls_day.insert_day(group_json, group)
            else {
                this.tables[day] = new rasp_day(this, day)
                this.tables[day].insert_day(group_json, group)
            }
            return
        }

        if (group_json == null) {
            if (!this.days.includes(day)) return
            else group_json = this.tables[day]
        }

        let cls_day = this.tables[day]
        if (cls_day !== null) cls_day.insert_day(group_json, group)
        else {
            this.tables[day] = new rasp_day(this, day)
            this.tables[day].insert_day(group_json, group)
        }
    }

    insert_event (event) {
        let table = this.tables[event.date.date]
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

            this.#insert_column(group)

            let sorted_days = Object.keys(group_json.days).sort()
            if (sorted_days.at( 0) < this.first_day.date) this.cover_days_to(sorted_days.at( 0))
            if (sorted_days.at(-1) > this.last_day .date) this.cover_days_to(sorted_days.at(-1))

            for (let day of this.days) {
                this.insert_day(day, group_json.days[day], group)
            }
            //////////////////
            
            this.REs = this.prefix == 'Преподаватель'? teacher_REs : group_REs

            let index = this.compared_with.indexOf(group)
            if (index < auto_colouring_compared_groups.length) {
                this.colour_compared_group(group, auto_colouring_compared_groups[index])
            }

            this.build_compare_panel(group)

            if (enter != null) enter.setAttribute('class', 'compare_accepted')
        }
        catch (e) { console.error(e); if (enter != null) enter.setAttribute('class', 'compare_denied') }
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
        } catch (error) {console.log(error)}
    }
    
    stop_comparing (group) {
        if (this.compared_with.indexOf(group) !== -1) {
            this.compared_with.splice(this.compared_with.indexOf(group), 1)
            for (let day of this.days) this.tables[day].remove_lessons_of(group)

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

        let elems = document.getElementsByClassName('group_' + this.name)
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.borderLeft = '3px solid ' + colour
            elems[i].style.backgroundColor = pale
        }
    }

    decolour_own_group () {
        let elems = document.getElementsByClassName('group_' + this.name)
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.borderLeft = ''
            elems[i].style.backgroundColor = ''
        }
    }

    colour_compared_group (group, colour) {
        if (group == this.name) return this.colour_own_group(colour)

        let pale = merge_clrs(colour, rec_themes[MODE]['vars']['--color-background'])

        let elems = document.getElementsByClassName('group_' + group)
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.borderLeft = '3px solid ' + colour
            elems[i].style.backgroundColor = pale
        }
    }

    decolour_compared_group (group) {
        if (group == this.name) return this.decolour_own_group(colour)

        let elems = document.getElementsByClassName('group_' + group)
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.borderLeft = ''
            elems[i].style.backgroundColor = ''
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

    clipboard_link () {
        let link = document.location.toString().split('?')[0]
        link += '?group_name=' + this.name + '&compare_to=' + this.compared_with.join(',')
        copy_to_CB(link)
    }

    contains (day) { 
        day = Rasptime.date_from_any(day)
        return (this.first_day.date <= day && day <= this.last_day.date) 
    }

    get_table_contains (day) {
        return this.tables[day]
    }

    get_table_now () { return this.get_table_contains(Rasptime.date_now()) }
    get_week_now () { return this.get_table_now().week }

    set_week_cascadely (from, number) {
        from = Rasptime.date_from_any(from)
        let table = this.tables[from]
        if (table != null) {
            let weekday = table.day.week_day
            let delta = 0
            let day = from

            while (day <= this.last_day.date) {
                this.tables[day].set_week(number + delta)
                weekday++
                if (weekday == 7) weekday = 0
                else if (weekday == 1) delta++
                day = Rasptime.get_next_day(day)
            }

            this.week_now = this.get_week_now()
            this.weeks_total = this.tables[this.last_day.date].week
        }
    }

    get_monday_at_week (week_num) {
        return this.first_day.copy().backward_to_monday().next_day((week_num - 1)*7)
    }

    get_week_num_at_day (day) {
        let table = this.tables[day]
        return table == null? null : table.week
    }

    get_lessons_on_day (date, group = null) {
        if (this.compared_with.indexOf(group) === -1) group = this.name

        let result = {}
        for (let i = 0; i < lessons_count; i++) result[i+1] = []

        let day = this.tables[Rasptime.date_from_any(date)]
        if (day != null) {
            let lessons = day.lessons_of[group]
            for (let lesson of lessons) {
                let num = Number(lesson.parentElement.parentElement.id.split('-').at(-1))
                result[num].push(lesson)
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

        if (!this.contains(day)) return null

        while (day < this.last_day.date) {
            let table = this.tables[day]
            let lessons = table.lessons_of[this.name]

            for (let lesson of lessons) {
                if (lesson.parentElement.parentElement.getAttribute('id') >= min_date_id) return lesson
            }

            day = Rasptime.get_next_day(day)
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

        if (!this.contains(day)) return null

        while (this.first_day.date < day) {
            let table = this.tables[day]
            let lessons = table.lessons_of[this.name]

            for (let i = lessons.length-1; i > 0; i--) {
                if (lessons[i].parentElement.parentElement.getAttribute('id') <= max_date_id) return lessons[i]
            }

            day = Rasptime.get_next_day(day, -1)
        }

        return null
    }

    get_prev_lesson_from_now () {
        let now = new Rasptime()
        return this.get_prev_lesson_before(now.date, now.time)
    }

    lid_from_lesson (node) { return node.parentElement.parentElement.getAttribute('id') }

    track_time_cell (lesson, status) {
        let tr = document.getElementById(lesson)
        if (tr) {
            let cell = tr.children[0]
            switch (status) {
                case 'usual':
                    try {
                        cell.removeAttribute('style')
                        tr.removeAttribute('style')
                    }
                    catch {}
                    break
    
                case 'disable':
                    tr.style['opacity'] = '0.5' 
                    break

                case 'active':
                    cell.style['background'] = 'var(--color-time_tracking)'
                    tr.style['opacity'] = '0.5' 
                    break
    
                case 'part_active': 
                    let p = get_lesson_percentage()
                    if (Math.abs(p - 100) < 0.001) tr.style['opacity'] = '0.5' 
                    else cell.style['background'] = `linear-gradient(to bottom, var(--color-time_tracking) ${p}%, transparent ${p}%)`
                    break
    
                case 'in_future': 
                default:
                    cell.style['opacity'] = 'transparent'
                    break
            }
        }
    }

    get_day_workload (day = 'today') {
        if (day == 'today') day = Rasptime.date_now()
        let workload = []
        for (let i = 0; i < lessons_count; i++) workload.push(0)

        if (!this.contains(day)) return workload

        let day_nodes = this.tables[day].lessons_of[this.name]
        for (let lesson of day_nodes) {
            let pair = Number(lesson.parentElement.parentElement.id.split('-').at(-1)) - 1
            workload[pair] = 1
        }

        return workload
    }

    fill_week_list (list) {
        let i = 0
        let s_weekday = this.first_day.week_day

        for (let day of this.days) {
            let first_week_day = new Date(day)

            const dayDate = first_week_day.getDate().toString()
            const dayMonth = monthNames[first_week_day.getMonth()].toString()

            const day_workload = this.get_day_workload(day)
            let td_6_str = ''
            for (let i of day_workload) td_6_str += (i == 0? '◇' : '◈')

            let tr = document.createElement('tr')
            tr.onclick = function () { main_rasp.go_to(day) }

            let td_1 = document.createElement('td')
            let td_2 = document.createElement('td')
            let td_3 = document.createElement('td')
            let td_4 = document.createElement('td')
            let td_5 = document.createElement('td')
            let td_6 = document.createElement('td')

            td_1.innerText = (++i).toString() + ')'
            td_2.innerText = dayDate
            td_3.innerText = dayMonth
            td_4.innerText = '-'
            td_5.innerText = weekNamesShort[s_weekday]
            td_6.innerText = td_6_str

            if (dayDate === '1') tr.style.borderTop = '3px solid var(--color-link)'
            else if (s_weekday == 1) tr.style.borderTop = '2px dashed var(--color-link)'

            tr.appendChild(td_1)
            tr.appendChild(td_2)
            tr.appendChild(td_3)
            tr.appendChild(td_4)
            tr.appendChild(td_5)
            tr.appendChild(td_6)

            list.appendChild(tr)

            s_weekday++
            if (s_weekday == 7) s_weekday = 0
        }
        try {
            let block = list.children[Rasptime.days_between(this.first_day, new Date())]
            block.style['font-weight'] = 'bold'
            block.style['background-color'] = 'var(--color-light)'
        }
        catch {}
    }

    go_to (elem_id = null, rewrite_hash = true) {
        if (type_of(elem_id) != 'string') elem_id = Rasptime.date_now()

        if (elem_id.startsWith('Week_')) elem_id = this.get_monday_at_week(elem_id.replace('Week_', '')).date

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

    #insert_column  (group) { for (let day of this.days) this.tables[day].insert_column (group) }
    #insert_columns (group) { for (let day of this.days) this.tables[day].insert_columns(group) }
    #remove_column  (group) { for (let day of this.days) this.tables[day].remove_column (group) }
    #remove_columns (group) { for (let day of this.days) this.tables[day].remove_columns(group) }
}

class rasp_day {
    constructor (full_rasp_ref, day_date, with_date_check = true) {
        this.rasp = full_rasp_ref

        if (with_date_check) {
            if (this.rasp.days.indexOf(day_date) === -1) {
                this.rasp.cover_days_to(day_date)
                return
            }
        }

        this.day = new Rasptime(day_date)

        this.html = insert_empty_simple_day(this.day)

        this.lessons = {}
        for (let i = 1; i <= lessons_count; i++) {
            this.lessons[i] = document.getElementById(this.day.date + '-' + i)

            let td = document.createElement('td')
            td.classList.add('group_' + this.rasp.name)
            this.lessons[i].appendChild(td)
        }

        this.insert_columns(this.rasp.compared_with)

        this.hidden = false

        this.lessons_of = {}
        this.lessons_of[this.rasp.name] = []

        this.week = -1
    }

    check_for_hiding_up () {
        if (this.hidden) {
            for (let group_lessons of Object.values(this.lessons_of)) {
                if (group_lessons.length > 0) {
                    this.show_up()
                    return
                }
            }
        }
        else {
            for (let group_lessons of Object.values(this.lessons_of)) {
                if (group_lessons.length > 0) return
            }
            this.hide_up()
        }
    }

    show_up () {
        if (this.hidden) {
            this.hidden = false
            this.html.querySelector('thead').classList.remove('hidden')
            this.html.querySelector('tbody').classList.remove('hidden')
            this.html.querySelector('tfoot').classList.add('hidden')
        }
    }

    hide_up () {
        if (!this.hidden) {
            this.hidden = true
            this.html.querySelector('thead').classList.add('hidden')
            this.html.querySelector('tbody').classList.add('hidden')
            this.html.querySelector('tfoot').classList.remove('hidden')
        }
    }

    insert_column (group) {
        for (let i = 1; i <= lessons_count; i++) {
            let tr = this.lessons[i]
            let td = document.createElement('td')
            td.classList.add('group_' + group)
            tr.appendChild(td)
        }
    }

    insert_columns (groups) {
        for (let group of groups) this.insert_column(group)
    }

    remove_column (group) {
        for (let i = 1; i <= lessons_count; i++) {
            let tr = this.lessons[i]
            let td = tr.querySelector(':scope > td.group_' + group)
            if (td) td.remove()
        }
    }

    remove_columns (groups) {
        for (let group of groups) this.remove_column(group)
    }

    insert_day (group_json = null, group = null) {
        if (group_json == null) {
            this.check_for_hiding_up()
            return
        }

        let comparing = ''
        if (group == null) group = this.rasp.name
        else comparing = '_cmp_' + group

        if (!this.lessons_of.hasOwnProperty(group)) this.lessons_of[group] = []

        for (let lesson_time in group_json) {
            let content = divide(group_json[lesson_time], this.rasp.REs)

            let tr = this.rasp.html.querySelector('tr#' + CSS.escape(this.day.date + '-' + lesson_time))
            if (tr == null) continue
            let td = tr.querySelector('.group_' + CSS.escape(group))

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

                        if (same) div.innerText = 'полностью аналогично'
                        continue
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
                    else {
                        text_div.addEventListener('click', (event) => {highlight_same(event.altKey, sub_div[0])})
                        //text_div.setAttribute('onclick', `highlight_same(event, '${sub_div[0]}')`)
                    }

                    text_div.innerText = sub_div[1]
                    div.appendChild(text_div)
                }
            }
        }

        this.check_for_hiding_up()
    }

    remove_lessons_of (group) {
        if (this.lessons_of.hasOwnProperty(group)) {
            for (let block of this.lessons_of[group]) block.remove()
            delete this.lessons_of[group]
        }
        this.remove_column(group)
        this.check_for_hiding_up()
    }

    insert_event (event) {
        let tr = this.html.querySelector('tr#' + CSS.escape(event.date.date + '-' + event.lesson))
        let td = null
        if (tr) td = tr.children[1]
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

            this.show_up()

            return event_div
        }
        else return null
    }

    contains (day) {
        return (this.day.date == Rasptime.date_from_any(day))
    }

    set_week (number) {
        this.week = number
    }
}

function insert_empty_simple_day (day) {
    let table = document.getElementById('Simple_Group_Rasp')
    if (table == null) return

    let day_table = document.createElement('table')
    day_table.setAttribute('id', day.date)
    day_table.setAttribute('class', 'simple_rasp-day_table')
    day_table.innerHTML = `
        <thead class="simple_rasp-day_start">
            <th colspan="999">
                <div>
                    <p>${day.get_week_day_name(false)}</p>
                    <h1>${day.get_rasp_date()}</h1>
                </div>
            </th>
        </thead>
        <tbody>
        </tbody>
        <tfoot class="hidden">
            <tr colspan="999">
                <td>VVVV ${day.get_rasp_date()} нет занятий VVVV</td>
            </tr>
        </tfoot>
    `

    let day_tbody = day_table.querySelector('tbody')

    for (let i = 1; i <= lessons_count; i++) {
        let tr    = document.createElement('tr')
        let td    = document.createElement('td')
        let stime = document.createElement('h2')
        let etime = document.createElement('h3')
        let decln = document.createElement('div')
        let dummy = document.createElement('p')

        stime.innerText = lessons_time[(i - 1)*2    ]
        etime.innerText = lessons_time[(i - 1)*2 + 1]

        td.appendChild(stime)
        td.appendChild(etime)
        td.appendChild(decln)
        td.appendChild(dummy)
        tr.appendChild(td)
        tr.setAttribute('id', day.date + '-' + i)
        tr.setAttribute('class', 'simple_rasp-pair')
        day_tbody.appendChild(tr)
    }

    if (table.childElementCount == 0) table.appendChild(day_table)
    else if (table.children[table.childElementCount-1].id < day.date) table.appendChild(day_table)
    else table.insertAdjacentElement('afterBegin', day_table)

    return day_table
}

function clear_all () { document.getElementById('Simple_Group_Rasp').innerHTML = '' }