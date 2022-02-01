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
*/
const group_REs =   {'lesson_type': { // type
                                      'lecture'   : [/л\./    ], // subtype
                                      'practice'  : [/пр\./i  ],
                                      'lab'       : [/лаб\./i ],
                                      'test'      : [/зач\./i ],
                                      'cons'      : [/конс\./i],
                                      'exam'      : [/экз\./i ],
                                      'volkswagen': [/фв/i    ],
                                      'test_2'    : [/ЗаО/i   ],
                                    },
                          'lesson': {'ignore': 'ignore'},
                        'subgroup': {
                                      '!pre_last':[/\(п\/г ?[1-2]\)/],
                                    },
                         'teacher': {
                                      '!result|< 32':[/[А-Я]\.\s?[А-Я]\./i],
                                      '!result|< 32':[/[А-Я][А-Я]?\..?[А-Я][А-Я]?\./i], // debug
                                      '!result'     :[/0001_преподаватель/i], // debug
                                    },
                            'room': {
                                      'online'    :[/о-?нлайн\d*/i                     ],
                                      '!result|< ':[/(^|[ ЛсС])[тКСПЗ1238]-\d\d*[а-в]?/],
                                      'online'    :[/\S\S?-?нлайн( ?\(.*\)|\d*)/i      ], // debug
                                      'DLS'       :[/СДО ПсковГУ/i                     ],
                                    },
}

const teacher_REs = {'lesson_type': { // type
                                      'lecture'   : [/л\./    ], // subtype
                                      'practice'  : [/пр\./i  ],
                                      'lab'       : [/лаб\./i ],
                                      'test'      : [/зач\./i ],
                                      'cons'      : [/конс\./i],
                                      'exam'      : [/экз\./i ],
                                      'volkswagen': [/фв/i    ],
                                      'test_2'    : [/ЗаО/i   ],
                                    },
                          'lesson': {'ignore': 'ignore'},
                           'group': {
                                      '!result|C':[/\d{4}-\d{2}\S*(\s|$)/],
                                      '!result'     :[/Иностр\.студенты\([А-Я, ]*\)/i, // debug
                                                      /Начальный 1 к\./i             ,
                                                      /Начальный к\./i               ],
                                    },
                        'subgroup': {
                                      '!pre_last':[/\(п\/г ?[1-2]\)/],
                                    },
                            'room': {
                                      'online'    :[/о-?нлайн( \(.*\)|\d*)/i           ],
                                      '!result|< ':[/(^|[ ЛсС])[тКСПЗ1238]-\d\d*[а-в]?/],
                                      'online'    :[/\S\S?-?нлайн( ?\(.*\)|\d*)/i      ], // debug
                                      'DLS'       :[/СДО ПсковГУ/i                     ],
                                    },
}

// if text contains several lessons, it will be divided by these regexps
const group_block_seps = [/лайн\d*/ig, /(^|[ ЛсС])[тКСПЗ1238]-\d\d*[а-в]?/g]

// final text will be converted according to this dict
// regexps must be in quotes as string ('cause REs can't be a key of dict)
const convert_result = {'л.':'Лекция',
                        'пр.':'Практика',
                        'лаб.':'Лабораторная',
                        '/О-?нлайн[0-9]*/i': 'Онлайн',
                        '(п/г 1)':'п/г 1',
                        '(п/г 2)':'п/г 2',
                        'фв':'Физвоспитание',
                        'зач.':'Зачёт',
                        'конс.':'Консультация',
                        'экз.':'Экзамен',
                        }
function try_convert (text) {
    for (key in convert_result) {
        if (key[0] == '/') { // if regexp
            if (text.match( RegExp(...key.replace('/','').split('/'))) ) return convert_result[key]
        }
        else if (convert_result[text.toLowerCase()]) return convert_result[text.toLowerCase()]
    }
    return text // if failed to convert
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

        case '!range'   : return matched[0].slice(settings[1], settings[2]).replaceAll('-','_')

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
                }
            }
            return matched[0].replaceAll('-','_')
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
        for (re_t in RE_list) for (re_st in RE_list[re_t]) { // re_st - RegExp SubTypes
            res = RE_list[re_t][re_st] // res - list of regexps
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
                    class_name += re_st[0] == '!'? special_class_name(re_st, matched) : re_st

                    text = text.replace(matched[0], '') // deleting finded part
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
        content[content.length-1].splice(final_index, 0, ['lesson', cut_off_excess(text)])
        // uncuted part of text is recognizing as lesson
    }
    return content
}

function gen_row_data(table, day, day_content, is_teacher) { // prefixes: ЗФО|ОФО|Преподаватель
    is_teacher = is_teacher.toLowerCase() == 'преподователь'? true : false
    let tr = document.createElement('tr');
    add_td(
        `<p class="rasp-table-day-date">${new Date(day).getDate()} ${monthNames[new Date(day).getMonth()]}</p>
        <p class="rasp-table-day-weekdate">${weekNames[new Date(day).getDay()]}</p>`,
        tr, "rasp-table-day"
    )
  
    if (day_content) {
        for (let i = 1; i <= 7; i++) { // for each 'пара'
            if (day_content[i]) {
                let td = document.createElement('td')
                td.classList.add("rasp-table-pair");
                tr.appendChild(td)

                content = divide(day_content[i], is_teacher? teacher_REs : group_REs)

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
