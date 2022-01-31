/* Файл генерации данных таблицы*/

const group_REs =   {'lesson_type': { // type
                                      'lecture'   : [/л\./], // subtype
                                      'practice'  : [/пр\./],
                                      'lab'       : [/лаб\./],
                                      'test'      : [/зач\./],
                                      'cons'      : [/конс\./],
                                      'exam'      : [/экз\./],
                                      'volkswagen': [/фв/]
                                    },
                          'lesson': {'ignore': 'ignore'},
                        'subgroup': {
                                      '!pre_last':[/\(п\/г [1-2]\)/]
                                    },
                         'teacher': {
                                      '!result| <|3':[/[А-Я] [А-Я]\.[А-Я]\./i]
                                    },
                            'room': {
                                      'online' :[/О-нлайн[0-9]*/i, /онлайн[0-9]*/i],
                                      '!result| <':[/-[0-9][0-9]*/],
                                      'DLS':[/СДО ПсковГУ/i]
                                    },
}

const teacher_REs = {'lesson_type': { // type
                                      'lecture'   : [/л\./], // subtype
                                      'practice'  : [/пр\./],
                                      'lab'       : [/лаб\./],
                                      'test'      : [/зач\./],
                                      'cons'      : [/конс\./],
                                      'exam'      : [/экз\./],
                                      'volkswagen': [/фв/]
                                    },
                          'lesson': {'ignore': 'ignore'},
                           'group': {
                                      '!result|>,':[/[0-9][0-9][0-9][0-9]-[0-9][0-9]/]
                                    },
                        'subgroup': {
                                      '!pre_last':[/\(п\/г [1-2]\)/]
                                    },
                            'room': {
                                      'online' :[/О-нлайн[0-9]*/i, /онлайн[0-9]*/i, /Онлайн \(Zoom[0-9]*\)/i],
                                      '!result| <':[/-[0-9][0-9]*/],
                                      'DLS':[/СДО ПсковГУ/i]
                                    },
}

const group_block_seps = [/лайн[0-9]*/ig, /.-[0-9][0-9]*/g]

const convert_result = {'л.':'Лекция',
                        'пр.':'Практика',
                        'лаб.':'Лабораторная',
                        '/О-нлайн[0-9]*/i': 'Онлайн',
                        '(п/г 1)':'п/г 1',
                        '(п/г 2)':'п/г 2',
                        'фв':'Физвоспитание',
                        'зач.':'Зачёт',
                        'конс.':'Консультация',
                        'экз.':'Экзамен',
                        }
function try_convert (text) {
    for (key in convert_result) {
        if (key[0] == '/') {
            let re = key.split('/')
            if (text.match(RegExp(re[1], re[2]))) return convert_result[key]
        }
        else if (convert_result[text]) return convert_result[text]
    }
    return text
}

const word_seps = [' ', '.', ',']
function nearest_word_sep (text, direction = 'right', exceptions = 0) {
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

const excesses = [' ', '.', ',', '(', ')']
function cut_off_excess (text) {
    let num1 = 0
    let num2 = text.length-1
    while (excesses.indexOf(text[num1]) !== -1) num1++
    while (excesses.indexOf(text[num2]) !== -1) num2--
    return text.slice(num1, num2+1)
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function divide (text, RE_list) {
    let content = []
    let class_name = ''
    
    let texts = []
    if (RE_list == group_REs) {
        let matched = []
        for (re in group_block_seps) {
            let finded = text.match(group_block_seps[re])
            if (finded) matched = [...matched, ...finded]
        }
        for (let i = 0; i < matched.length; i++) text = text.replace(matched[i], matched[i]+'☺')
        texts = text.split('☺')
        if (texts[texts.length-1].trim() == '') texts.pop()
    }
    else texts = [text]

    let index = final_index = 0

    for (text in texts) {
        text = texts[text]
        content.push([])
        index = 0
        for (re_t in RE_list) for (re_st in RE_list[re_t]) { // re_st - RegExp SubTypes
            res = RE_list[re_t][re_st]
            if (res == 'ignore') {
                final_index = index
                continue
            }
            found_smth = false
            for (re in res) { // for each RegExp in list
                re = res[re]
                let matched = text.match(re)
                while (matched) {
                    class_name += re_t+'-'
                    if (re_st[0] == '!') {
                        if (re_st == '!last') class_name += matched[0][matched[0].length-1]
                        else if (re_st == '!pre_last') class_name += matched[0][matched[0].length-2]
                        else if (re_st == '!result') class_name += matched[0]
                        else if (re_st.indexOf('!result') !== -1) {
                            let settings = re_st.split('|')
                            if (settings[1][0] == '>') {
                                let second_index = text.indexOf(settings[1][1], matched['index']+matched[0].length)
                                if (second_index == -1) second_index = matched['index']+matched[0].length
                                let txt = text.slice(matched['index'], second_index)
                                matched[0] = txt.slice(0, nearest_word_sep(txt, 'right', settings[2]? settings[2] : 0))
                                class_name += matched[0]
                            }
                            else if (settings[1][1] == '<') {
                                let first_index = text.lastIndexOf(settings[1][0], matched['index'])
                                if (first_index == -1) first_index = matched['index']
                                let txt = text.slice(first_index, matched['index']+matched[0].length)
                                matched[0] = txt.slice(nearest_word_sep(txt, 'left', settings[2]? settings[2] : 0)+1, txt.length)
                                class_name += matched[0]
                                if (re_st == 'teacher') console.log(text, '|', txt, '|', matched[0])
                            }
                        }
                    }
                    else class_name += re_st

                    text = text.replace(matched[0], '')
                    content[content.length-1].push([class_name, matched[0]])
                    class_name = ''
                    index++
                    matched = text.match(re)
                    found_smth = true
                }
            }
            if (found_smth) break
        }
        content[content.length-1].splice(final_index, 0, ['lesson', cut_off_excess(text)])
    }
    return content
}

function gen_row_data(table, day, day_content, if_teacher) { // prefixes: ЗФО|ОФО|Преподаватель
    if_teacher = if_teacher.toLowerCase() == 'преподователь'? true : false
    let tr = document.createElement('tr');
    add_td(
        `<p class="rasp-table-day-date">${new Date(day).getDate()} ${monthNames[new Date(day).getMonth()]}</p>
        <p class="rasp-table-day-weekdate">${weekNames[new Date(day).getDay()]}</p>`,
        tr, "rasp-table-day"
    )

    if (day_content) {
        for (let i = 1; i <= 7; i++) { // for each lesson
            if (day_content[i]) {
                let td = document.createElement('td')
                td.classList.add("rasp-table-pair");
                tr.appendChild(td)
                content = divide(day_content[i], if_teacher? teacher_REs : group_REs)
                for (lesson in content) {
                    let div = document.createElement('div')
                    div.setAttribute('class', 'block_'+lesson)
                    td.appendChild(div)
                    for (d in content[lesson]) {
                        add_div(try_convert(content[lesson][d][1]), div, content[lesson][d][0])
                    }
                }
            }
            else {
                add_td('', tr, "rasp-table-pair")
            }
        }
        //console.log(day_content);
    }
    else {
        for (let i = 0; i < 7; i++) {
            add_td('', tr, "rasp-table-pair")
        }
    }
    //console.log(day);
    table.appendChild(tr)
    return
}
