const form_url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdMzhT1B8FM_tFGomUU69n3DIu8Cwtl1ZWi23BmnUgymUhLww/formResponse'

const form_content = {
    'start': {
        'title': 'На какой странице возникла проблема?',
        'google_form_id': '812970616',
        'type': 'list',
        'answers': {
            'Выберите': ['no-value', 'no-next'],
            'На странице поиска'                 : ['На странице поиска'                 , 'a2'],
            'На странице выбора ("показать всё")': ['На странице выбора ("показать всё")', 'a3'],
            'На странице расписания'             : ['На странице расписания'             , 'a4'],
            'На странице печати'                 : ['На странице печати'                 , 'a10'],
            'Другое (описать проблему без формы)': ['Другое (описать проблему без формы)', 'a5']
        },
        'condition': 'AF_value !== "Выберите" && AF_value !== ""',
        'next': 'as_in_answer',
        'prev': '',
        'progress': '33%'
    },

    'a2': {
        'title': 'Столкнулись ли Вы с одной или несколькими из нижеперечисленных проблем? ' +
                 '(если нет, кратко укажите проблему в пункте "другое")',
        'google_form_id': '1251251824',
        'type': 'checkboxes',
        'answers': {
            'Вечный поиск (надпись "поиск соответствий" отображается более 5-10 секунд без изменений)'            : ['Вечный поиск', 'a6'],
            'Поиск не нашёл группу/преподавателя, хотя она/он существует (укажите имя/группу в следующем вопросе)': ['Поиск не нашёл группу/преподавателя', 'a6'],
            'В результатах поиска есть группы/преподаватели, которых не должно быть (укажите в следующем вопросе)': ['Лишние группы/преподаватели', 'a6'],
            'Ошибка дизайна (Неправильное отображение цветов, результаты не влезают в экран и т.п.)'              : ['Ошибка дизайна', 'a6'],
            'другое (укажите)': ['__other_option__', 'a6']
        },
        'condition': 'true',
        'next': 'a6',
        'prev': '',
        'progress': '66%'
    },

    'a3': {
        'title': 'Столкнулись ли Вы с одной или несколькими из нижеперечисленных проблем? ' +
                 '(если нет, кратко укажите проблему в пункте "другое")',
        'google_form_id': '1336206045',
        'type': 'checkboxes',
        'answers': {
            'Некоторые элементы дублируются'                                                         : ['Некоторые элементы дублируются', 'a7'],
            'Списки отображаются некорректно или не отображаются вовсе'                              : ['Списки отображаются некорректно', 'a7'],
            'Группы/преподавателя нет в списке (укажите имя/группу в следующем вопросе)'             : ['Группы/преподавателя нет в списке', 'a7'],
            'В списках есть институты/факультеты/группы/преподаватели и т.п., которых не должно быть': ['Лишние институты/преподаватели и т.п.', 'a7'],
            'Ошибка дизайна (Неправильное отображение цветов, списки не влезают в экран и т.п.)'     : ['Ошибка дизайна', 'a7'],
            'другое (укажите)': ['__other_option__', 'a7']
        },
        'condition': 'true',
        'next': 'a7',
        'prev': '',
        'progress': '66%'
    },

    'a4': {
        'title': 'Столкнулись ли Вы с одной или несколькими из нижеперечисленных проблем? ' +
                 '(если нет, кратко укажите проблему в пункте "другое")',
        'google_form_id': '911441767',
        'type': 'checkboxes',
        'answers': {
            'Расписание не соответствует действительности'                                                                                      : ['Расписание не соответствует действительности', 'a8'],
            'Расписание не отображается (или отображается не полностью)'                                                                        : ['Расписание отображается некорректно', 'a8'],
            'Неправильная датировка, некорректно работает подсветка по времени (если включено отслеживание времени)'                            : ['Неправильная датировка, подсветка по времени', 'a8'],
            'Не отображаются цветовые фильтры'                                                                                                  : ['Не отображаются цветовые фильтры', 'a8'],
            'Фильтры применяются, но не сохраняются'                                                                                            : ['Фильтры применяются, но не сохраняются', 'a8'],
            'Фильтры при применении или загрузке не соответствуют установленным'                                                                : ['Неправильные фильтры при установке', 'a8'],
            'Фильтр не соответствует своему блоку (например, в блок "подгруппа" попал номер группы, в блок "предмет" - преподаватель, и т.п.)'  : ['Проблема регулярных выражений', 'a8'],
            'Выделение схожих элементов по alt + ЛКМ не работает'                                                                               : ['Неправильное выделение по alt-click', 'a8'],
            'Расписание не добавляется в избранное (или добавляется некорректно) (проверьте, включены ли у вас файлы Cookies)'                  : ['Не добавляется в избранное', 'a8'],
            'Ошибка дизайна (Неправильное отображение цветов (не связанных с фильтрами), таблицы не влезают в экран и т.п.)'                    : ['Ошибка дизайна', 'a8'],
            'другое (укажите)': ['__other_option__', 'a8']
        },
        'condition': 'true',
        'next': 'a8',
        'prev': '',
        'progress': '66%'
    },

    'a10': {
        'title': 'Столкнулись ли Вы с одной или несколькими из нижеперечисленных проблем? ' +
                 '(если нет, кратко укажите проблему в пункте "другое")',
        'google_form_id': '1412930246',
        'type': 'checkboxes',
        'answers': {
            'Таблицы отображаются некорректно (размер не соответсвует указанному, элементы "вылезают" из ячеек и т.п.)' : ['Некорректно отображаются таблицы', 'a9'],
            'Тема/фильтры (не) отображаются независимо от соответствующей настройки'                                    : ['Тема/фильтры не меняются', 'a9'],
            'В расписании не скрываются дни (или скрываются не те)'                                                     : ['Отображение дней', 'a9'],
            'другое (укажите)': ['__other_option__', 'a9']
        },
        'condition': 'true',
        'next': 'a9',
        'prev': '',
        'progress': '66%'
    },

    'a5': {
        'title': 'Опишите проблему, с которой вы столкнулись. ' + 
                 'Пожалуйста, укажите, в какой момент возникла ошибка, и что Вы делали перед её возникновением? ' +
                 'Если ошибка связана с внешним видом или не нажимаемыми кнопками, ' + 
                 'укажите браузер, которым Вы пользовались.',
        'google_form_id': '1753632798',
        'type': 'text_area',
        'answers': {},
        'condition': 'AF_value !== ""',
        'next': 'no-next',
        'prev': '',
        'progress': '100%'
    },

    'a6': {
        'title': 'Опишите проблему подробнее. Какие действия Вы совершали до того, как возникла ошибка? ' + 
                 'Если выбрана ошибка дизайна, каким браузером Вы пользовались?',
        'google_form_id': '1353632355',
        'type': 'text_area',
        'answers': {},
        'condition': 'AF_value !== ""',
        'next': 'no-next',
        'prev': '',
        'progress': '100%'
    },

    'a7': {
        'title': 'Опишите проблему подробнее. Какие действия Вы совершали до того, как возникла ошибка? ' + 
                 'Если выбрана ошибка дизайна, каким браузером Вы пользовались?',
        'google_form_id': '361457428',
        'type': 'text_area',
        'answers': {},
        'condition': 'AF_value !== ""',
        'next': 'no-next',
        'prev': '',
        'progress': '100%'
    },

    'a9': {
        'title': 'Опишите проблему подробнее. Какие действия Вы совершали до того, как возникла ошибка? ' + 
                 'Если выбрана ошибка дизайна, каким браузером Вы пользовались?',
        'google_form_id': '1810109538',
        'type': 'text_area',
        'answers': {},
        'condition': 'AF_value !== ""',
        'next': 'no-next',
        'prev': '',
        'progress': '100%'
    },

    'a8': {
        'title': 'Опишите проблему подробнее. Какие действия Вы совершали до того, как возникла ошибка? ' + 
                 'Если выбрана ошибка дизайна, каким браузером Вы пользовались?',
        'google_form_id': '1449822199',
        'type': 'text_area',
        'answers': {},
        'condition': 'AF_value !== ""',
        'next': 'no-next',
        'prev': '',
        'progress': '100%'
    }
}


function generate_form (fid, content = form_content) {
    content = content[fid]
    let form = document.getElementById('issue_form')

    form.innerHTML = `
        <div class="AF_header">
            <a class="issue_report-close" onclick="close_issue_report();">×</a>
        </div>

        <div class="AF_content">
        </div>

        <div class="AF_navigation">
            <div id='AF_prev_button_border'>
                <button id="AF_prev_button" onclick="prev_form()">назад</button>
            </div>
            <div id="AF_progress_bar"></div>
            <div id='AF_next_button_border'>
                <button id="AF_next_button" onclick="next_form()">далее</button>
            </div>
        </div>`

    dragElement(form, 0);

    let header = document.createElement('h2')
    header.innerText = content['title']
    form.children[0].appendChild(header)

    if (content['prev'] == '') AF_prev_button.disabled = true

    switch (content['type']) {
        //========================================================================== list
        case 'list':
            let top_pos = 5
            for (ans in content['answers']) {
                let div = document.createElement('div')
                div.setAttribute('id', 'AF_this_input_' + ans)
                //div.setAttribute('style', 'top: '+top_pos+'px')
                top_pos += 35

                let label = document.createElement('label')
                label.innerText = ans
                label.setAttribute('class', 'AF_label')
                //label.setAttribute('style', 'margin-left: 3px; vertical-align: middle;')
                div.appendChild(label)

                let radio = document.createElement('input')
                radio.setAttribute('type', 'radio')
                radio.setAttribute('name', 'AF_this_input')
                radio.setAttribute('id', 'AF_this_chbx_' + ans)
                radio.setAttribute('onclick', 'input_changed()')
                if (content['answers'][ans][0] == 'no-value') radio.setAttribute('checked', '')

                div.appendChild(radio)
                form.children[1].appendChild(div)
            }
            /*
            let list = document.createElement('select')
            list.setAttribute('name', 'entry.' + content['google_form_id'])
            list.setAttribute('id', 'AF_this_input')
            list.setAttribute('onchange', 'input_changed()')

            for (ans in content['answers']) {
                let option = document.createElement('option')
                option.setAttribute('value', content['answers'][ans][0])
                option.innerText = ans
                list.appendChild(option)
            }
            form.children[1].appendChild(list)
            */
            break

        //========================================================================== checkboxes
        case 'checkboxes':
            let table = document.createElement('table')
            table.setAttribute('id', 'AF_table')
            let tbody = document.createElement('tbody')

            for (ans in content['answers']) {
                let row = document.createElement('tr')

                let td = document.createElement('td')
                let elem = document.createElement('input')
                elem.setAttribute('type', 'checkbox')
                elem.setAttribute('value', content['answers'][ans][0])
                elem.setAttribute('onchange', 'input_changed()')
                elem.setAttribute('class', 'AF_this_input')
                td.appendChild(elem)
                row.appendChild(td)

                if (content['answers'][ans][0] !== '__other_option__') {
                    td = document.createElement('td')
                    elem = document.createElement('p')
                    elem.innerText = ans
                    td.appendChild(elem)
                    row.appendChild(td)
                }
                else {
                    td = document.createElement('td')
                    elem = document.createElement('input')
                    elem.setAttribute('type', 'text')
                    elem.setAttribute('placeholder', ans)
                    elem.setAttribute('onchange', 'input_changed()')
                    td.appendChild(elem)
                    row.appendChild(td)
                }
                tbody.appendChild(row)
            }

            table.appendChild(tbody)
            form.children[1].appendChild(table)
            break

        //========================================================================== text_area
        case 'text_area':
            let text_area = document.createElement('textarea')
            text_area.setAttribute('name', 'entry.' + content['google_form_id'])
            text_area.setAttribute('id', 'AF_this_input')
            text_area.setAttribute('placeholder', 'Введите текст здесь...')
            text_area.setAttribute('onchange', 'input_changed()')
            form.children[1].appendChild(text_area)
            break
    }
 
    p = content['progress']
    if (p !== '100%') {
        AF_progress_bar.style['background'] = `linear-gradient(to right, var(--color-special) ${p}, transparent ${p})`
        AF_progress_bar.innerHTML = `<label style = "
            background: linear-gradient(90deg, var(--color-header_text) ${p}, var(--color-text) ${p}, var(--color-text)); 
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">
            ${p}
        </label>`
    }
    else imitate_form()

    input_changed()
}

function input_changed () {
    switch (form_content[fid]['type']) {
        //========================================================================== list
        case 'list':
            for (ans in form_content[fid]['answers']) {
                let input_div = document.getElementById('AF_this_input_' + ans)
                if (document.getElementById('AF_this_chbx_' + ans).checked) {
                    input_div.disabled = true
                    input_div.style['backgroundColor'] = 'var(--color-special)'
                    input_div.children[0].style['color'] = 'var(--color-header_text)'
                    AF_selected = ans
                    AF_value = form_content[fid]['answers'][ans][0]
                }
                else {
                    input_div.style['backgroundColor'] = ''
                    input_div.children[0].style['color'] = ''
                }
            }
            AF_count = ''
            /*
            AF_value = AF_this_input.value
            for (ans in form_content[fid]['answers']) {
                if (form_content[fid]['answers'][ans][0] == AF_value) {
                    AF_selected = ans
                    break
                }
            }
            AF_count = ''
            */
            if (AF_value == 'no-value') AF_next_button.disabled = true
            else if (eval(form_content[fid]['condition'])) AF_next_button.disabled = false
            break

        //========================================================================== checkboxes
        case 'checkboxes':
            let boxes = document.getElementsByClassName('AF_this_input')
            AF_selected = ''
            AF_value = []
            AF_count = 0
            for (chbx of boxes) if (chbx.checked) {
                if (chbx.value == '__other_option__') AF_value.push(chbx.parentElement.parentElement.children[1].children[0].value)
                else AF_value.push(chbx.value)
                AF_count++
            }
            if (eval(form_content[fid]['condition'])) AF_next_button.disabled = false
            else AF_next_button.disabled = true
            break

        //========================================================================== text_area
        case 'text_area':
            AF_selected = ''
            AF_value = AF_this_input.value
            AF_count = ''

            if (eval(form_content[fid]['condition'])) AF_next_button.disabled = false
            else AF_next_button.disabled = true
            break
    }
    if (form_content[fid]['progress'] == '100%') {
        AF_next_button.disabled = true
        if (eval(form_content[fid]['condition'])) form_submit.disabled = false
        else form_submit.disabled = true
    }
}

function prev_form () {
    if (AF_prev_button.disabled) return
    else {
        delete issue_report[form_content[fid]['prev']]
        let old_fid = fid
        fid = form_content[fid]['prev']
        form_content[old_fid]['prev'] = ''
        generate_form(fid)
    }
}

function next_form () {
    if (AF_next_button.disabled) return
    else {
        issue_report[fid] = AF_value
        let old_fid = fid
        if (form_content[fid]['next'] == 'as_in_answer') {
            fid = form_content[fid]['answers'][AF_value][1]
        }
        else fid = form_content[fid]['next']
        form_content[fid]['prev'] = old_fid
        generate_form(fid)
    }
}

function imitate_form () {
    let div = document.getElementById('AF_progress_bar')
    div.innerHTML = `
    <iframe name="dummyframe" id="dummyframe" style="display: none"></iframe>
    <form
      id='result_form'
      action="${form_url}"
      method="POST"
      target="dummyframe"
    >
        <input id='form_submit' type="submit" onclick="imitate_submit()" value="Отправить"/> 
    </form>
    `
}

function imitate_submit (report = issue_report, content = form_content) {
    issue_report[fid] = AF_value
    let form = document.getElementById('result_form')
    for (ifid in content) {
        let fieldset = document.createElement('fieldset')
        fieldset.setAttribute('style', 'display: none')
        switch (content[ifid]['type']) {
            //========================================================================== list
            case 'list':
                let list = document.createElement('select')
                list.setAttribute('name', 'entry.' + content[ifid]['google_form_id'])

                let option = document.createElement('option')
                option.setAttribute('value', report[ifid]? report[ifid] : content[ifid]['if-no-value'])
                option.setAttribute('selected', '')
                
                list.appendChild(option)
                fieldset.appendChild(list)
                break

            //========================================================================== checkboxes
            case 'checkboxes':
                if (!report[ifid]) break

                for (ans of report[ifid]) {
                    let answer = ''
                    let is_other_option = true

                    for (key in content[ifid]['answers']) {
                        if (content[ifid]['answers'][key][0] == ans) {
                            answer = key
                            is_other_option = false
                            break
                        }
                    }

                    let elem = document.createElement('input')
                    elem.setAttribute('type', 'checkbox')
                    elem.setAttribute('name', 'entry.' + content[ifid]['google_form_id'])
                    elem.setAttribute('checked', '')

                    if (is_other_option) { // if __other_option__
                        let sec_elem = document.createElement('input')
                        sec_elem.setAttribute('type', 'text')
                        sec_elem.setAttribute('name', 'entry.' + content[ifid]['google_form_id'] + '.other_option_response')
                        sec_elem.setAttribute('value', ans)
                        fieldset.appendChild(sec_elem)

                        elem.setAttribute('value', '__other_option__')
                    }
                    else elem.setAttribute('value', ans)

                    fieldset.appendChild(elem)
                }
                break

            //========================================================================== text_area
            case 'text_area':
                let text_area = document.createElement('textarea')
                text_area.setAttribute('name', 'entry.' + content[ifid]['google_form_id'])
                text_area.value = report[ifid]? report[ifid] : '#'
                fieldset.appendChild(text_area)
                break
        }
        form.appendChild(fieldset)
    }

    let fieldset = document.createElement('fieldset')
    fieldset.setAttribute('style', 'display: none')

    let other_data_txt = document.createElement('input')
    other_data_txt.setAttribute('type', 'text')
    other_data_txt.setAttribute('name', 'entry.976299217')

    let date = new Date()
    let sv_months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    other_data_txt.value = (`${date.getFullYear()} ${sv_months[date.getMonth()]} ${date.getDate()}` +
                            ` - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`)

    fieldset.appendChild(other_data_txt)
    form.appendChild(fieldset)
    open_thanks_window()
}

function open_thanks_window () {
    let form = document.getElementById('issue_form')

    form.children[0].innerHTML = `
    <a class="issue_report-close" onclick="close_issue_report();">×</a>
    <h2>Форма отправлена</h2>
    `
    form.children[1].innerHTML = `
    <p>Благодарим за уведомление о проблеме. Ваше обращение будет рассмотрено и по возможности решено в ближайшее время.</p>
    `

    for (let i = 0; i < form.children[2].childElementCount; i++) form.children[2].children[i].style['display'] = 'none'
    let close_button = document.createElement('button')
    close_button.setAttribute('id', 'AF_close')
    close_button.setAttribute('onclick', 'close_issue_report()')
    close_button.innerText = 'закрыть'
    form.children[2].appendChild(close_button)
}


let fid = 'start'
let AF_selected = ''
let AF_value = ''
let AF_count = ''
let issue_report = {}
