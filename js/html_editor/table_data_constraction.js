/* Файл генерации данных таблицы*/
/* 
Here's a dict of classes that contains dicts of sub-classes 
that (finally) contains list of regexps to recognize that 
some part of text belongs to definite class and sub-class.

If sub-class name includes '!' at the begining, than
name will not be const like the others. So, it will
depend of result. 
See 'special_class_name' function for more information.

If there's an 'ignore' instead of list, checking will be 
skipped for current class. Should be used only for
'lesson' class type, because it also sets index for
uncuted part of text to be inserted in.
*/                                  //VVV type VVV
const group_REs =   {'lesson_type': ['Тип занятия', {//VVV subtype VVV
                                      'lecture'   : ['Лекция'         , [/л\./    ]],
                                      'practice'  : ['Практика'       , [/пр\./i  ]],
                                      'lab'       : ['Лабораторная'   , [/лаб\./i ]],
                                      'test'      : ['Зачёт'          , [/зач\./i ]],
                                      'cons'      : ['Консультация'   , [/конс\./i]],
                                      'exam'      : ['Экзамен'        , [/экз\./i ]],
                                      'volkswagen': ['Физвоспитание'  , [/фв/i    ]],
                                      'test_2'    : ['Зачёт с оценкой', [/ЗаО/i   ]],
                                    }],
                          'lesson': ['Предмет', {'ignore': ['ignore', 'ignore']}],
                        'subgroup': ['Подгруппа', {
                                      '!pre_last':['!convert', [/\(п\/г ?[1-2]\)/]],
                                    }],
                         'teacher': ['Преподаватель', {
                                      '!result|< 32':['!result', [/[А-Я]\.\s?[А-Я]\./i           ]],
                                      '!result|< 32':['!result', [/[А-Я][А-Я]?\..?[А-Я][А-Я]?\./i]], // debug
                                      '!result'     :['!result', [/0001_преподаватель/i          ]], // debug
                                    }],
                            'room': ['Место проведения', {
                                      'online'        :['Онлайн' , [/о-?нлайн\d*/i                        ]],
                                      '!result|< |S-1':['!Slice1', [/(^|[ ЛсС])[тКСПЗ1238]-\d\d*[а-в]?/   ]],
                                      'online'        :['Онлайн' , [/\S\S?-?\S?нлайн( ?\(.*\)|\d*)/i      ]], // debug
                                      'DLS'           :['СДО'    , [/СДО ПсковГУ/i                        ]],
                                    }],
}
                                    //VVV type VVV
const teacher_REs = {'lesson_type': ['Тип занятия', {//VVV subtype VVV
                                      'lecture'   : ['Лекция'         , [/л\./    ]],
                                      'practice'  : ['Практика'       , [/пр\./i  ]],
                                      'lab'       : ['Лабораторная'   , [/лаб\./i ]],
                                      'test'      : ['Зачёт'          , [/зач\./i ]],
                                      'cons'      : ['Консультация'   , [/конс\./i]],
                                      'exam'      : ['Экзамен'        , [/экз\./i ]],
                                      'volkswagen': ['Физвоспитание'  , [/фв/i    ]],
                                      'test_2'    : ['Зачёт с оценкой', [/ЗаО/i   ]],
                                    }],
                          'lesson': ['Предмет', {'ignore': ['ignore', 'ignore']}],
                           'group': ['Группа', {
                                      '!result|C':['!result', [/\d{4}-\d{2}\S*(\s|$)/]],
                                      '!result'  :['!result', [/Иностр\.студенты\([А-Я, ]*\)/i, // debug
                                                               /Начальный 1 к\./i             ,
                                                               /Начальный к\./i               ]],
                                    }],
                        'subgroup': ['Подгруппа', {
                                      '!pre_last':['!convert', [/\(п\/г ?[1-2]\)/]],
                                    }],
                            'room': ['Место проведения', {
                                      'online'        :['Онлайн' , [/о-?нлайн( \(.*\)|\d*)/i              ]],
                                      '!result|< |S-1':['!Slice1', [/(^|[ ЛсС])[тКСПЗ1238]-\d\d*[а-в]?/   ]],
                                      'online'        :['Онлайн' , [/\S\S?-?\S?нлайн( ?\(.*\)|\d*)/i      ]], // debug
                                      'DLS'           :['СДО'    , [/СДО ПсковГУ/i                        ]],
                                    }],
}

// if text contains several lessons, it will be divided by these regexps
const group_block_seps = [/лайн\d*/ig, /(^|[ ЛсС])[тКСПЗ1238]-\d\d*[а-в]?/g]

// final text will be converted according to this dict
// regexps must be in quotes as string ('cause REs can't be a key of dict)
const convert_result = {'/О-?нлайн[0-9]*/i': 'Онлайн',
                        '(п/г 1)':'п/г 1',
                        '(п/г 2)':'п/г 2',
                        }
function try_convert (text) {
    for (key in convert_result) {
        if (key[0] == '/') { // if regexp
            if (text.match( RegExp(...key.replace('/','').split('/')) )) return convert_result[key]
        }
        else if (convert_result[text.toLowerCase()]) return convert_result[text.toLowerCase()]
    }
    return text // if failed to convert
}

let used_class_names = {}
//function renew_used_class_names () {
//    for (key in used_class_names) delete used_class_names[key]
for (class_name in group_REs  ) used_class_names[group_REs  [class_name][0]] = {}
for (class_name in teacher_REs) used_class_names[teacher_REs[class_name][0]] = {}
//}

function try_push (class_name, subclass_name, matched) {
    if (group_REs[class_name]) {
        if (!used_class_names[group_REs[class_name][0]][matched]) {
             used_class_names[group_REs[class_name][0]][matched] = class_name+'-'+subclass_name
    }}
    else if (teacher_REs[class_name]) {
        if (!used_class_names[teacher_REs[class_name][0]][matched]) {
             used_class_names[teacher_REs[class_name][0]][matched] = class_name+'-'+subclass_name
    }}
}

// function returns index of 'nearest' word separator (see list) in text
// "direction" sets the direction of search
// "exceptions" sets the amount of separators to be skipped
const word_seps = [' ', '.', ',', '_']
function nearest_word_sep (text, direction = 'right', exceptions = 0) {
    if (!exceptions) exceptions = 0 // if Null is received

    if (direction == 'right') { // begin >>> end
        for (let i = 0; i < text.length; i++) if(word_seps.indexOf(text[i]) !== -1) {
            if (exceptions == 0) return i
            else exceptions--
        }
        return text.length
    }
    else if (direction == 'left') { // begin <<< end
        for (let i = text.length-1; i > -1; i--) if(word_seps.indexOf(text[i]) !== -1) {
            if (exceptions == 0) return i
            else exceptions--
        }
        return 0
    }
}

// Returns text without 'excesses' (see list) at the sides
const base_excesses = [' ', '.', ',', '_']
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
    }
}

function adapt_for_html (text) {
    return text.replaceAll(/[ ,-]/g, '_').replaceAll(/[.]/g, '．') // ⋅．•
}

/* 
If sub-class contains '!' at the beginning, it's name will
will depend on the result. For now, here're these settings:

!last - returns last char

!pre-last - returns pre-last char

!range|x|y - returns slice of text from x to y (including both of indexes)

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

        case '!result'  :
            let txt = ''
            for (let i = 1; i < settings.length; i++) {
                switch(settings[i][0]) {
                    case '>':
                        let second_index = matched['input'].indexOf(settings[i][1], matched['index']+matched[0].length)
                        if (second_index == -1) second_index = matched['index']+matched[0].length

                        txt = matched['input'].slice(matched['index'], second_index)
                        matched[0] = txt.slice(0, nearest_word_sep(txt, 'right', settings[i][2]))
                        break
                    
                    case '<':
                        let first_index = matched['input'].lastIndexOf(settings[i][1], matched['index']-(settings[i][3]? settings[i][3] : 0))
                        if (first_index == -1) first_index = matched['index']

                        txt = matched['input'].slice(first_index, matched['index']+matched[0].length)
                        matched[0] = txt.slice(nearest_word_sep(txt, 'left', settings[i][2])+1, txt.length)
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
function divide (text, RE_list) {
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
        for (let i = 0; i < matched.length; i++) {          //
            text = text.replace(matched[i], matched[i]+'☺') // adding separators
        }
        texts = text.split('☺')
        texts.pop() // deleting empty block
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
        let lesson_text = cut_off_excess(text)
        content[content.length-1].splice(final_index, 0, ['lesson-'+adapt_for_html(lesson_text), lesson_text])
        try_push('lesson', adapt_for_html(lesson_text), lesson_text)
        // uncuted part of text is recognizing as lesson
    }
    return content
}

function gen_row_data(table, day, day_content, prefix) { // prefixes: ЗФО|ОФО|Преподаватель
    let required_REs = prefix.toLowerCase() == 'преподаватель'? teacher_REs : group_REs

    let tr = document.createElement('tr');
    add_td(
        `<p class="rasp-table-day-date">${new Date(day).getDate()} ${monthNames[new Date(day).getMonth()]}</p>
        <p class="rasp-table-day-weekdate">${weekNames[new Date(day).getDay()]}</p>`,
        tr, "rasp-table-day"
    )
 
    //renew_used_class_names() doesn't work
  
    if (day_content) {
        for (let i = 1; i <= 7; i++) { // for each 'пара'
            if (day_content[i]) {
                let td = document.createElement('td')
                td.classList.add("rasp-table-pair");
                tr.appendChild(td)

                content = divide(day_content[i], required_REs)

                for (lesson in content) { // for each block (lesson)
                    let div = document.createElement('div')
                    div.setAttribute('class', 'block_'+lesson)
                    td.appendChild(div)

                    for (d in content[lesson]) { // for each div in block
                        add_div(try_convert(content[lesson][d][1]), div, content[lesson][d][0])
                    }
                }
            }
            else { // if empty 'пара'
                add_td('', tr, "rasp-table-pair")
            }
        }
    }
    else { // if empty day
        for (let i = 0; i < 7; i++) {
            add_td('', tr, "rasp-table-pair")
        }
    }
    //console.log(day);
    table.appendChild(tr)
    return
}
