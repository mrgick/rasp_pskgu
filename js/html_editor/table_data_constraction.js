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
    return text.replaceAll(/([ ,-]|\(|\))/g, '_').replaceAll(/[.]/g, '．') // ⋅．•
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
group_content   = {'0': 'lesson_type, lesson'       , '-3': 'subgroup', '-2': 'teacher', '-1': 'room'}
teacher_content = {'0': 'group, lesson_type, lesson', '-2': 'subgroup', '-1': 'room'}
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
                                    content.push([class_name, matched[0]]) // future div

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
                    let lesson_text = adapt_lesson_text(text)
                    content.push(['lesson-'+adapt_for_html(lesson_text), lesson_text])
                    try_push('lesson', adapt_for_html(lesson_text), lesson_text)
                }
                else uncuted += text
            }
        }
        if (cut_off_excess(uncuted) != '') {
            console.log(uncuted)
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

function go_to_link (event, link) {
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

let first_day = '9999-01-01'
let last_day  = '2022-01-01'
function gen_row_data(table, day, day_content, prefix) { // prefixes: ЗФО|ОФО|Преподаватель
    let required_REs = prefix.toLowerCase() == 'преподаватель'? teacher_REs : group_REs

    if (day < first_day) first_day = day
    else if (day > last_day) last_day = day

    let tr = document.createElement('tr');
    add_td(
        `<p class="rasp-table-day-date">${new Date(day).getDate()} ${monthNames[new Date(day).getMonth()]}</p>
        <p class="rasp-table-day-weekdate">${weekNames[new Date(day).getDay()]}</p>`,
        tr, "rasp-table-day", day
    )
 
    //renew_pre_used_class_names() doesn't work
  
    if (day_content) {
        for (let i = 1; i <= 7; i++) { // for each 'пара'
            if (day_content[i]) {
                let td = document.createElement('td')
                td.classList.add("rasp-table-pair")
                td.setAttribute('id', day+'-'+i)
                tr.appendChild(td)

                content = divide(day_content[i], required_REs)

                for (lesson in content) { // for each block (lesson)
                    let div = document.createElement('div')
                    div.setAttribute('class', 'block_'+lesson)
                    td.appendChild(div)

                    for (sub_div of content[lesson]) { // for each div in block
                        if (['teacher', 'group'].indexOf(sub_div[0].split('-')[0]) !== -1) {
                            let a = document.createElement('a')
                            a.setAttribute('onclick', `go_to_link(event, '${sub_div[1]}')`)
                            a.setAttribute('style', 'cursor: pointer')
                            add_div(sub_div[1], a, sub_div[0], 'base')
                            div.appendChild(a)
                        }
                        else add_div(sub_div[1], div, sub_div[0], 'base')
                    }
                }
            }
            else { // if empty 'пара'
                add_td('', tr, "rasp-table-pair", day+'-'+i)
            }
        }
    }
    else { // if empty day
        for (let i = 1; i <= 7; i++) {
            add_td('', tr, "rasp-table-pair", day+'-'+i)
        }
    }
    //console.log(day);
    table.appendChild(tr)
    return
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
