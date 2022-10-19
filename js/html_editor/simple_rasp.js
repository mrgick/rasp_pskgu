/* Работа с Simple_Group_Rasp элементом */

class simple_rasp {
    constructor (group_json) {
        this.group_json = group_json

        this.name = group_json.name
        this.prefix = group_json.prefix[0].toLowerCase() == 'преподаватель'? 'Преподаватель' : 'Группа'
        this.REs = this.prefix == 'Преподаватель'? teacher_REs : group_REs

        this.html = document.getElementById('Simple_Group_Rasp')
        
        this.original = group_json.page_url
        this.last_updated = group_json.last_updated

        this.compared_with = []

        this.days = {}
        for (let day of Object.keys(group_json.days).sort()) {
            this.days[day] = new rasp_day(this, day)
            this.days[day].insert_day(group_json.days[day])
        }

        if (this.days.length > 0) {
            this.first_day = get_monday(this.days[0])
            this.last_day = this.days.at(-1)
            this.week_now = this.get_week_now()
        }
        else {
            this.first_day = null
            this.last_day = null
            this.week_now = null
        }

        let table = document.getElementById('ComparePanel-table').children[0]

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

    insert_day (day, group_json = null, group = null) {
        if (group_json == null) {
            if (!this.days.includes(day)) return
            else group_json = this.days[day]
        }

        let cls_day = this.days[day]
        if (cls_day !== null) cls_day.insert_day(group_json, group)
        else this.days[day] = new rasp_day(this, day)
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

            this.REs = group_json.prefix[0].toLowerCase() == 'преподаватель'? teacher_REs : group_REs

            for (let day in group_json.days) {
                this.insert_day(day, group_json.days[day], group)
            }
            
            this.REs = this.prefix == 'преподаватель'? teacher_REs : group_REs

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

class rasp_day {
    constructor (full_rasp_ref, day_date) {
        this.rasp = full_rasp_ref

        this.day = day_date

        this.html = insert_empty_simple_day(day_date)

        this.lessons = {}
        for (let i = 1; i <= 7; i++) {
            this.lessons[i] = document.getElementById(day_date + '-' + i)

            let td = document.createElement('td')
            td.classList.add('group_' + this.rasp.name)
            this.lessons[i].appendChild(td)

            for (let group of this.rasp.compared_with) {
                let td = document.createElement('td')
                td.classList.add('group_' + group)
                this.lessons[i].appendChild(td)
            }
        }

        this.lessons_of = {}
        this.lessons_of[this.rasp.name] = []
    }

    insert_day (group_json = null, group = null) {
        if (group_json == null) return

        let comparing = ''
        if (group == null) group = this.rasp.name
        else comparing = '_cmp_' + group

        if (!this.lessons_of.hasOwnProperty(group)) this.lessons_of[group] = []

        for (let lesson_time in group_json) {
            let content = divide(group_json[lesson_time], this.rasp.REs)

            let tr = this.rasp.html.querySelector('tr#' + CSS.escape(this.day + '-' + lesson_time))
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

function insert_empty_simple_day (day) {
    let table = document.getElementById('Simple_Group_Rasp')
    if (table == null) return

    let day_tr = document.createElement('tr')
    let day_td = document.createElement('td')
    day_td.innerText = day
    day_td.setAttribute('colspan', '999')
    day_tr.appendChild(day_td)
    day_tr.setAttribute('id', day)
    day_tr.setAttribute('class', 'simple_rasp-day_start')

    if (table.childElementCount == 0) table.appendChild(day_tr)
    else if (table.lastChild.id < day) table.appendChild(day_tr)
    else {
        let insert_before = null
        for (let child of table.children) {
            if (child.classList.contains('day_start')) {
                if (child.id < day) break
                insert_before = child
            }
        }
        insert_before.insertAdjacentElement('beforeBegin', day_tr)
    }

    for (let i = 7; i >= 1; i--) {
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let p  = document.createElement('p')
        p.innerText = i + ' пара'
        td.appendChild(p)
        tr.appendChild(td)
        tr.setAttribute('id', day + '-' + i)
        tr.setAttribute('class', 'simple_rasp-pair')
        day_tr.insertAdjacentElement('afterEnd', tr)
    }

    return day_tr
}

function clear_all () { document.getElementById('Simple_Group_Rasp').innerHTML = '' }