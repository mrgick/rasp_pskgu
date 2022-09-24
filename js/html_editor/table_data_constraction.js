/* Файл генерации данных таблицы*/

let loaded_seq = readCookie('global_placement')
let global_placement = []
let group_sequence   = []
let teacher_sequence = []
if (loaded_seq) {
    try {
        global_placement = eval(loaded_seq)
    }
    catch {
        global_placement = []
        for (let i = 0; i < base_global_placement.length; i++) {
            global_placement.push(base_global_placement[i])
        }
    }
}
else {
    for (let i = 0; i < base_global_placement.length; i++) {
        global_placement.push(base_global_placement[i])
    }
}

for (let i = 0; i < global_placement.length; i++) {
    if (group_excepts.indexOf(global_placement[i]) === -1) group_sequence.push(global_placement[i])
    if (teacher_excepts.indexOf(global_placement[i]) === -1) teacher_sequence.push(global_placement[i])
}

let group_REs   = {}
let teacher_REs = {}

// renews REs_lists according to customized sequences
function renew_REs_list (which_one = 'both') { // which_one values: 'group', 'teacher', 'both'
    if (which_one == 'group' || which_one == 'both') {
        group_REs = {}
        for (let i = 0; i < group_sequence.length; i++) {
            group_REs[group_sequence[i]] = all_REs[group_sequence[i]]
        }
    }
    if (which_one == 'teacher' || which_one == 'both') {
        teacher_REs = {}
        for (let i = 0; i < teacher_sequence.length; i++) {
            teacher_REs[teacher_sequence[i]] = all_REs[teacher_sequence[i]]
        }
    }
    return group_REs, teacher_REs
}
group_REs, teacher_REs = renew_REs_list()

// See 'delete_from_lesson' list
function adapt_lesson_text (text) {
    let matched = []
    for (let i = 0; i < delete_from_lesson.length; i++) { //
        let finded = text.match(delete_from_lesson[i])    // finding excess text
        if (finded) matched = [...matched, ...finded]     //
    }
    for (let i = 0; i < matched.length; i++) text = text.replace(matched[i], '')
    return cut_off_excess(text)
}

// See 'convert_result' list
function try_convert (text) {
    for (key in convert_result) {
        if (key[0] == '!') {
            let kcontent = key.split('|')
            if (text.match(RegExp(kcontent[1], kcontent[2]))) switch(kcontent[0]) {
                case '!get_digit': return convert_result[key].replace('D', text.match(/\d/))
            }
        }
        if (key[0] == '|') { // if regexp
            if (text.match( RegExp(...key.replace('|','').split('|')) )) return convert_result[key]
        }
        else if (convert_result[text.toLowerCase()]) return convert_result[text.toLowerCase()]
    }
    return text // if failed to convert
}

let pre_used_class_names = {}
//function renew_pre_used_class_names () {
//    for (key in pre_used_class_names) delete pre_used_class_names[key]
for (class_name in group_REs  ) pre_used_class_names[group_REs  [class_name][0]] = {}
for (class_name in teacher_REs) pre_used_class_names[teacher_REs[class_name][0]] = {}
//}

function try_push (class_name, subclass_name, matched) {
    if (group_REs[class_name]) {
        if (!pre_used_class_names[group_REs[class_name][0]][matched]) {
             pre_used_class_names[group_REs[class_name][0]][matched] = class_name+'-'+subclass_name
    }}
    else if (teacher_REs[class_name]) {
        if (!pre_used_class_names[teacher_REs[class_name][0]][matched]) {
             pre_used_class_names[teacher_REs[class_name][0]][matched] = class_name+'-'+subclass_name
    }}
}

// function returns index of 'nearest' word separator (see 'word_seps' list) in text
// "direction" sets the direction of search
// "exceptions" sets the amount of separators to be skipped
function nearest_word_sep (text, direction = 'right', offset = 0, exceptions = 0) {
    if (!exceptions) exceptions = 0 // if Null is received

    if (direction == 'right') { // begin >>> end
        for (let i = offset; i < text.length; i++) if(word_seps.indexOf(text[i]) !== -1) {
            if (exceptions == 0) return i
            else exceptions--
        }
        return text.length
    }
    else if (direction == 'left') { // begin <<< end
        for (let i = text.length-1-offset; i > -1; i--) if(word_seps.indexOf(text[i]) !== -1) {
            if (exceptions == 0) return i
            else exceptions--
        }
        return 0
    }
}

// Returns text without 'excesses' (see 'base_excesses' list) at the sides
function cut_off_excess (text, excesses = base_excesses) {
    let num1 = 0
    let num2 = text.length-1
    while (excesses.indexOf(text[num1]) !== -1) num1++
    while (excesses.indexOf(text[num2]) !== -1) num2--
    return text.slice(num1, num2+1)
}

function special_text (pattern, matched) {
    switch (pattern) {
    case '!result': return matched[0]
    case '!convert': return try_convert(matched[0])
    case '!Slice1': return [matched[0].split('-').slice(0, -1).join('-'), matched[0]]
    case '!Slice2': return [cut_off_excess(matched[0].split('(')[0]), matched[0]]
    }
}

function adapt_for_html (text) {
    return text.replaceAll(/([ ,-/]|\(|\)|\\)/g, '_').replaceAll(/[.]/g, '．').replaceAll('@', 'A') // ⋅．•
}

/* 
If sub-class contains '!' at the beginning, it's name will
will depend on the result. For now, here're these settings:

!last - returns last char

!pre-last - returns pre-last char

!range|x|y - returns slice of text from x to y (including both of indexes)

!R|name - just returns name (dict cannot consist of similar keys, !R allows to do so) 

!result|... - returns result with some settings (unlimited). 
Currently available:
|>cx| - 'extends' matched to nearest char 'c' (not included)
        with 'x' exceptions (see 'nearest_word_sep' function)
|<cx| - same, but directed to the left
|C| - cut off excesses
 */
function special_class_name (settings, matched) {
    settings = settings.split('|')
    switch (settings[0]) {
        case '!last'    : return matched[0][matched[0].length-1]

        case '!pre_last': return matched[0][matched[0].length-2]

        case '!range'   : return adapt_for_html(matched[0].slice(settings[1], settings[2]))

        case '!R'       : return settings[1]

        case '!get_digit': return matched[0].match(/\d/)[0]

        case '!result'  :
            let txt = ''
            let num = 0
            for (let i = 1; i < settings.length; i++) {
                switch(settings[i][0]) {
                    case 'i': break

                    case '>':
                        num = matched['index']+matched[0].length + (settings[i][3]? settings[i][3] : 0)
                        while (num < matched['input'].length && matched['input'][num] != settings[i][1]) num++
                        matched[0] = matched['input'].slice(matched['index'], num)
                        /*
                        let second_index = matched['input'].indexOf(settings[i][1], matched['index']+matched[0].length)
                        if (second_index == -1) second_index = matched['index']+matched[0].length

                        txt = matched['input'].slice(matched['index'], second_index)
                        matched[0] = txt.slice(0, nearest_word_sep(txt, 'right', matched[0].length, settings[i][2]))
                        */
                       break
                    
                    case '<':
                        num = matched['index'] - (settings[i][3]? settings[i][3] : 0)
                        while (num > -1 && matched['input'][num] != settings[i][1]) num--
                        matched[0] = matched['input'].slice(num+1, matched['index']+matched[0].length)
                        /*
                        let first_index = matched['input'].lastIndexOf(settings[i][1], matched['index']-(settings[i][3]? settings[i][3] : 0))
                        if (first_index == -1) first_index = matched['index']-(settings[i][3]? settings[i][3] : 0)

                        txt = matched['input'].slice(first_index, matched['index']+matched[0].length)
                        matched[0] = txt.slice(nearest_word_sep(txt, 'left', matched[0].length, settings[i][2])+1, txt.length)
                        */
                        break

                    case 'C':
                        matched[0] = cut_off_excess(matched[0], [' ', '.', ','])
                        break

                    case 'S':
                      return matched[0].split(settings[i][1]).slice(0, -settings[i][2]).join(settings[i][1])
                }
            }
            return adapt_for_html(matched[0])
    }
}

/* 
Converts 'text' to 'content' list with blocks that consist of
future divs (lists [class_name, text_in_div]).

For example, converts 
'lecture Math 0123-45' 
to
[[['lesson_type-lecture', 'lecture'], 
  ['lesson', 'Math'], 
  ['group', '0123-45']]]
*/
group_content   = {'0': 'lesson_type, lesson, subgroup'       , '-3': 'subgroup', '-2': 'teacher', '-1': 'room'}
teacher_content = {'0': 'group, lesson_type, lesson, subgroup', '-2': 'subgroup', '-1': 'room'}
function divide (input, RE_list) {
    let content = []    // here will be divs
    let output = []     // here will be blocks with sorted divs
    let class_name = '' // name of class of each div in future
    let check_for = (RE_list == group_REs? group_content : teacher_content)

    //===========================================================================================

    for (block in input) {
        output.push([])
        content = []
        let uncuted = ''
        let lesson = input[block]
        
        if (lesson.length == 1) {
            output[block] = divide_old(lesson[0], RE_list)[0]
            continue
        }

        for (let i = 0; i < lesson.length; i++) {
            let text = lesson[i]
            let index = -1

            index = Object.keys(check_for).indexOf(i.toString())
            if (index == -1) index = Object.keys(check_for).indexOf((i-lesson.length).toString())

            if (index !== -1) {
                index = Object.keys(check_for)[index]
                let other_as_lesson = false

                for (type of Object.values(check_for[index].split(', '))) {
                    if (type == 'lesson') {
                        other_as_lesson = true
                        continue
                    }
                    else {
                        let found_smth = false
                        for (subtype in RE_list[type][1]) {
                            for (re of Object.values(RE_list[type][1][subtype][1])) {
                                let matched = text.match(re)
                                while (matched) {
                                    class_name = type+'-'
                                    let subclass_name = subtype[0] == '!'? special_class_name(subtype, matched) : subtype
                                    class_name += subclass_name

                                    text = text.replace(matched[0], '') // deleting finded part

                                    let res_123 = (RE_list[type][1][subtype][0][0] == '!'? 
                                                    special_text(RE_list[type][1][subtype][0], matched) 
                                                    : 
                                                    RE_list[type][1][subtype][0])
                                    
                                    if (typeof res_123 == 'string') {
                                        matched[0] = res_123
                                        try_push(type, subclass_name, matched[0])
                                    }
                                    else {
                                        matched[0] = res_123[1]
                                        try_push(type, subclass_name, res_123[0])
                                    }

                                    let already_exists = false
                                    for (matching_block of content) {
                                        if (matching_block[0] == class_name) {
                                            if (matching_block[1] == matched[0]) {
                                                already_exists = true
                                                break
                                            }
                                        }
                                    }
                                    if (!already_exists) content.push([class_name, matched[0]]) // future div

                                    class_name = ''
                                    //index++
                                    matched = text.match(re)
                                    found_smth = true
                                }
                            }
                            if (found_smth) break
                        }
                    }
                }
                if (other_as_lesson) {
                    // maybe insert here divide_old too?
                    lesson_text = adapt_lesson_text(text)
                    content.push(['lesson-'+adapt_for_html(lesson_text), lesson_text])
                    try_push('lesson', adapt_for_html(lesson_text), lesson_text)
                }
                else uncuted += text
            }
        }
        if (cut_off_excess(uncuted) != '') {
            content.concat(divide_old(uncuted, RE_list)[0])
        }

        for (type of Object.values(RE_list == group_REs? group_sequence : teacher_sequence)) {
            for (let i = 0; i < content.length; i++) {
                if (content[i][0].split('-')[0] == type) output[block].push(content[i])
            }
        }
    }

    return output
}

function divide_old (text, RE_list) {
    let content = []    // here will be blocks and divs
    let class_name = '' // name of class of each div in future
    let texts = []      // if text contains several lessons, it will be divided and stored here
    let index = final_index = 0 // need to find where program must insert uncuted part (lesson)

    //===========================================================================================

    if (RE_list == group_REs) { // if timetable for group
        let matched = []
        for (re in group_block_seps) {                    //
            let finded = text.match(group_block_seps[re]) // finding blocks
            if (finded) matched = [...matched, ...finded] //
        }
        if (matched.length != 0) { // if found something to separate

            let all_the_same = true
            for (let i = 0; i < matched.length; i++) if (matched[0] !== matched[i]) {
                all_the_same = false
                break
            }

            if (all_the_same) text = text.replaceAll(matched[0], matched[0]+'☺') // adding separators if all the same
            else for (let i = 0; i < matched.length; i++) {
                text = text.replace(matched[i], matched[i]+'☺') // adding separators if difference
            }
            texts = text.split('☺')
            texts.pop() // deleting empty block
        } 
        else texts = [text] // if there's no any separators are found
    }
    else texts = [text] // if timetable for teacher

    //===========================================================================================

    for (let ti = 0; ti < texts.length; ti++) { // for each lesson
        text = texts[ti]
        content.push([]) // create new block
        index = 0
        for (re_t in RE_list) for (re_st in RE_list[re_t][1]) { // re_st - RegExp SubTypes
            res = RE_list[re_t][1][re_st][1] // res - list of regexps
            if (res == 'ignore') {
                final_index = index // program will insert uncuted part (lesson) by final_index
                continue
            }
            found_smth = false // it's used to optimize processes
            for (re in res) { // for each RegExp in list
                re = res[re] // ignore this (please)
                let matched = text.match(re)
                while (matched) {
                    class_name += re_t+'-'
                    let subclass_name = re_st[0] == '!'? special_class_name(re_st, matched) : re_st
                    class_name += subclass_name

                    text = text.replace(matched[0], '') // deleting finded part

                    let res_123 = (RE_list[re_t][1][re_st][0][0] == '!'? 
                                    special_text(RE_list[re_t][1][re_st][0], matched) 
                                    : 
                                    RE_list[re_t][1][re_st][0])
                    
                    if (typeof res_123 == 'string') {
                        matched[0] = res_123
                        try_push(re_t, subclass_name, matched[0])
                    }
                    else {
                        matched[0] = res_123[1]
                        try_push(re_t, subclass_name, res_123[0])
                    }
                    content[content.length-1].push([class_name, matched[0]]) // future div

                    class_name = ''
                    index++
                    matched = text.match(re)
                    found_smth = true
                }
            }
            if (found_smth) break // e.g. if found lesson type 'lecture', it's
                                  // unnecessary to check for another (exam, lab, etc)
        }
        let lesson_text = adapt_lesson_text(text)
        content[content.length-1].splice(final_index, 0, ['lesson-'+adapt_for_html(lesson_text), lesson_text])
        try_push('lesson', adapt_for_html(lesson_text), lesson_text)
        // uncuted part of text is recognizing as lesson
    }
    return content
}

let auto_alt_click = false
function go_to_link (event, link, class_name) {
    if (event.altKey || auto_alt_click) {
        highlight_same(event, class_name)
        return
    }
    link = link.replace('_тёзка_', '(тёзка)').replaceAll('．', '.')
    if (event.ctrlKey) {
        if (confirm('Открыть расписание группы/преподавателя ' + link + ' в отдельной вкладке?')) {
            
            window.open(document.location.href.replace(document.location.search, '?group_name=' + link.replaceAll(' ', '_')), '_blank');
        }
    }
    else {
        if (confirm('Перейти к расписанию группы/преподавателя ' + link + '?')) {
            document.location.href = document.location.href.replace(document.location.search, '?group_name=' + link.replaceAll(' ', '_'))
        }
    }
}

function clear_highlight () {
    let style = document.getElementById('style_highlight')
    style.innerHTML = ''
}

function highlight_same (event, class_name) {
    if (event.altKey || auto_alt_click) {
        let style = document.getElementById('style_highlight')
        if (style.innerHTML.indexOf(class_name) !== -1) clear_highlight()
        else {
            let size = document.getElementsByClassName(class_name)[0].getBoundingClientRect()
            style.innerHTML = `.${class_name} {border: 2px dashed var(--color-error); width: ${size.width-4}px; height: ${size.height-4}px; background-color: var(--color-background); color: var(--color-error)}`
        }
    }
}

let used_class_names = {}
function create_used_class_names (placement = global_placement) {
    used_class_names = {}
    for (gtype of placement) for (class_name in pre_used_class_names) {
        if (all_REs[gtype][0] == class_name) {
            used_class_names[class_name] = pre_used_class_names[class_name]
            break
        }
    }
    return used_class_names
}

const auto_colouring_compared_groups = [
    '#006699', 
    '#AA4400', 
    '#007744',
    '#339922',
    '#993366',
    '#662299'
]

class full_rasp {
    constructor (group_json) {
        this.group_json = group_json

        this.name = group_json.name
        this.prefix = group_json.prefix[0].toLowerCase() == 'преподаватель'? 'Преподаватель' : 'Группа'
        this.REs = this.prefix == 'Преподаватель'? teacher_REs : group_REs

        this.html = document.getElementById('Group_Rasp')
        
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
                    else text_div.setAttribute('onclick', `highlight_same(event, '${sub_div[0]}')`)

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
    table.setAttribute('class', 'rasp')
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

    return table
}

function insert_empty_table (week = null, first_week_day = null, insert_after = null) {
    let child = null
    if (typeof insert_after == 'number') {
        child = document.getElementById('Week_' + insert_after.toString())
    }
    else if (typeof insert_after == 'string') {
        if (insert_after === 'start') child = document.getElementById('Group_Rasp').children[0]
        else child = document.getElementById(insert_after)
    }
    else if (typeof insert_after == 'object') {
        child = insert_after
    } 
    else return

    if (insert_after == null) {
        let rasps = document.getElementById('Group_Rasp')
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
        rasps = document.getElementById('Group_Rasp')
        if (rasps == null) return
        else rasps.appendChild(table)
    }
    else child.insertAdjacentElement('afterEnd', table)

    return table
}

function clear_all () { document.getElementById('Group_Rasp').innerHTML = '' }