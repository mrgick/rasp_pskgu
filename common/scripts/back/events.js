let user_events = {}
let user_event_id = 0

class user_event {
    constructor (hash = null) {
        if (hash) {
            let splited = hash.split('-')
            let event_date = `${splited[2].slice(4,8)}-${splited[2].slice(8,10)}-${splited[2].slice(10,12)}`
            let event_lesson = splited[2].slice(12)
            let heading = document.getElementById('new_event_page-heading')
            switch (splited[3]) {
                case '0': // after event
                    if (new Date() > new Date(event_date + ' ' + lessons_time[event_lesson*2 - 1])) {
                        if (heading) heading.innerHTML = 'Событие<br>истекло по времени'
                        add_button_on_expires()
                        this.remove()
                        return
                    }
                    break

                case '1': // after day
                    if ((new Date() - new Date(event_date))/(1000*60*60*24) > 1) {
                        if (heading) heading.innerHTML = 'Событие<br>истекло по времени'
                        add_button_on_expires()
                        this.remove()
                        return
                    }
                    break

                case '2': // after week
                    if ((new Date() - new Date(get_monday(event_date)))/(1000*60*60*24) > 7) {
                        if (heading) heading.innerHTML = 'Событие<br>истекло по времени'
                        add_button_on_expires()
                        this.remove()
                        return
                    }
                    break

                case '3': // never
                    break
            }
        }

        this.eid = user_event_id
        this.heading = ''
        this.description = ''
        this.event_colour = '#999999'
        this.date = new Rasptime()
        this.lesson = this.date.get_lesson() + 1
        if (this.lesson < 1) this.lesson = 1
        if (this.lesson > lessons_count) this.lesson = lessons_count
        this.hide_lessons = false
        this.delete_after = 0

        let allowed_symbols = ''
        for (let allowed_symbol of event_hash_convertations) allowed_symbols += allowed_symbol[0]
        allowed_symbols = allowed_symbols.replace('\n', '')
        allowed_symbols = allowed_symbols.replace('\'', '')
        allowed_symbols = allowed_symbols.replace('\"', '')

        let lesson_options = ''
        for (let i = 1; i <= lessons_count; i++) lesson_options += `
        <option value='${i}' ${this.lesson == i? 'selected' : ''}>[${i}] ${time_cls[i-1]}</option>`

        let event_div = document.createElement('div')
        event_div.setAttribute('class', 'event_blank')
        event_div.setAttribute('style', '')
        event_div.setAttribute('id', `event_blank_${user_event_id}`)
        event_div.setAttribute('onchange', `user_events[${user_event_id}].changed()`)
        event_div.innerHTML = `
            <div>
                <input type='text' placeholder='Заголовок. Не более 50 символов.' maxlength='50' oninput='check_text_area(this)'>
                <br>
                <br>
                <label>Цвет события:</label>
                <input type='color' value='${this.event_colour}' oninput='user_events[${user_event_id}].redraw(this.value)'>
            </div>
            <div>
                <textarea placeholder='Описание события. Не более 300 символов.\nРазрешены символы: 0-9 a-z а-я ${allowed_symbols}' maxlength='300' oninput='check_text_area(this)'></textarea>
            </div>
            <div>
                <input type='date' value='${this.date.date}'>
                <select>
                    ${lesson_options}
                </select>
                <br>
                <input type='checkbox' name='instead'>
                <label for='instead' title='занятия в это время будут чуть скрыты'>вместо занятий</label>
            </div>
            <div>
                <label>Автоматически удалить: </label>
                <select>
                    <option value='0'>после завершения события</option>
                    <option value='1'>на следующий день</option>
                    <option value='2'>в конце недели с событием</option>
                    <option value='3'>никогда</option>
                </select>
            </div>
            <div style='margin-bottom: 0'>
                <button class='event_panel_button' onclick='user_events[${user_event_id}].save()'>Cохранить изменения</button>
                <button class='event_panel_button' onclick='user_events[${user_event_id}].invitation()'>Cоздать приглашение</button>
                <textarea class='hidden' style='margin-top: 10px'></textarea>
            </div>
            <a class="asidebar-close" onclick='user_events[${user_event_id}].remove()'>
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
            </a>
        `
        this.editor_ref = event_div

        if (hash != null) this.decode_hash(hash)
        this.redraw(this.event_colour)

        this.event_ref = this.new_event_in_rasp()
    }

    remove_event_in_rasp () {
        for (block of this.event_ref.parentElement.parentElement.children) block.style.opacity = 1;
        this.event_ref.remove()
    }

    new_event_in_rasp () {
        return main_rasp.insert_event(this)
    }

    get_hash () {
        return (
        `${convert_str_to_hash(this.heading)}-` +
        `${convert_str_to_hash(this.description)}-` +
        `${convert_sys_to_10(compact_colour(this.event_colour)).toString().padStart(3, '0')}` +
        `${this.hide_lessons ? 'T' : 'F'}` +
        `${this.date.date.replaceAll('-', '')}` +
        `${this.lesson}-` +
        `${this.delete_after}`
        )
    }

    decode_hash (hash) {
        try {
            hash = hash.split('-')
            this.editor_ref.children[0].children[0].value = convert_hash_to_str(hash[0])
            this.editor_ref.children[1].children[0].value = convert_hash_to_str(hash[1])
            this.editor_ref.children[0].children[4].value = unpack_colour(convert_10_to_sys(hash[2].slice(0, 3)))
            this.editor_ref.children[2].children[0].value = `${hash[2].slice(4,8)}-${hash[2].slice(8,10)}-${hash[2].slice(10,12)}`
            this.editor_ref.children[2].children[1].children[Number(hash[2].slice(12)) - 1].selected = true
            this.editor_ref.children[2].children[3].checked = (hash[2][3] == 'T'? true : false)
            this.editor_ref.children[3].children[1].children[hash[3]].selected = true

            this.editor_ref.children[4].children[0].classList.add('hidden')
    
            this.heading      = this.editor_ref.children[0].children[0].value
            this.description  = this.editor_ref.children[1].children[0].value
            this.event_colour = this.editor_ref.children[0].children[4].value
            this.date         = this.editor_ref.children[2].children[0].value
            this.lesson       = this.editor_ref.children[2].children[1].value
            this.hide_lessons = this.editor_ref.children[2].children[3].checked
            this.delete_after = this.editor_ref.children[3].children[1].value

            this.date = new Rasptime(this.date)
        }
        catch {}
    }

    check_hash (hash = null) {
        if (!hash) hash = this.get_hash()
        hash = hash.split('-')

        if (hash.length != 4 ||
            'TF'.search(hash[2][3]) === -1 ||
            hash[2].length < 12 ||
            !unpack_colour(convert_10_to_sys(hash[2].slice(0, 3))).match(/#[0-9a-f]{6}/ig)[0] ||
            isNaN(Number(hash[3])) ||
            Number(hash[3]) > 3 ||
            isNaN(Number(hash[2].slice(12)))) return false
        else return true
    }

    redraw (clr) {
        let rgb = hex_to_rgb(clr)
        this.editor_ref.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`
        this.editor_ref.style.borderColor = rgb
        this.editor_ref.querySelector('input[type="checkbox"]').style.accentColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`
        this.editor_ref.children[4].children[0].style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`
        this.editor_ref.children[4].children[1].style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`

        this.editor_ref.children[0].children[0].style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
        this.editor_ref.children[1].children[0].style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
        this.editor_ref.children[2].children[0].style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
        this.editor_ref.children[2].children[1].style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
        this.editor_ref.children[3].children[1].style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
    }

    changed () {this.editor_ref.children[4].children[0].classList.remove('hidden')}

    save () {
        this.editor_ref.children[4].children[0].classList.add('hidden')

        this.heading      = this.editor_ref.children[0].children[0].value
        this.description  = this.editor_ref.children[1].children[0].value
        this.event_colour = this.editor_ref.children[0].children[4].value
        this.date         = this.editor_ref.children[2].children[0].value
        this.lesson       = this.editor_ref.children[2].children[1].value
        this.hide_lessons = this.editor_ref.children[2].children[3].checked
        this.delete_after = this.editor_ref.children[3].children[1].value

        this.date = new Rasptime(this.date)

        if (this.event_ref) this.remove_event_in_rasp()
        this.event_ref = this.new_event_in_rasp()

        let saved = []
        for (let usr_event of Object.values(user_events)) if (usr_event) saved.push(usr_event.get_hash())
        createCookie('user_events', saved.join('|'), 365)
    }

    save_as_new_event (save_even_if_presented = false) {
        this.editor_ref.children[4].children[0].classList.add('hidden')

        let old_hash = this.get_hash()

        this.heading      = this.editor_ref.children[0].children[0].value
        this.description  = this.editor_ref.children[1].children[0].value
        this.event_colour = this.editor_ref.children[0].children[4].value
        this.date         = this.editor_ref.children[2].children[0].value
        this.lesson       = this.editor_ref.children[2].children[1].value
        this.hide_lessons = this.editor_ref.children[2].children[3].checked
        this.delete_after = this.editor_ref.children[3].children[1].value

        this.date = new Rasptime(this.date)

        let status = 0
        let hash = this.get_hash()

        if (!this.check_hash(hash)) status = 0 // error
        else {
            let loaded = readCookie('user_events')
            if (loaded) {
                if ((loaded+'|').match(/\|/g).length >= 10) status = 4 // too much events
                else if (loaded.search(old_hash) !== -1) {
                    if (save_even_if_presented) {
                        createCookie('user_events', loaded.replace(old_hash, hash), 365)
                        status = 3 // rewritten
                    }
                    else status = 2 // already presented
                }
                else {
                    createCookie('user_events', loaded + '|' + hash, 365)
                    status = 1 // successful
                }
            }
            else {
                createCookie('user_events', hash, 365)
                status = 1 // successful
            }
        }

        let heading = document.getElementById('new_event_page-heading')
        switch (status) {
            case 0: // error
                heading.innerHTML = 'Возникли проблемы<br>при добавлении'
                break
            
            case 1: // successful
                heading.innerHTML = 'Событие<br>успешно добавлено'
                break

            case 2: // already presented
                heading.innerHTML = 'Событие<br>уже представлено'
                break

            case 3: // rewritten
                heading.innerHTML = 'Событие<br>перезаписано'
                break

            case 4: // too much events
                heading.innerHTML = 'Нельзя добавлять<br>более 10 событий'
        }
    }

    remove () {
        if (this.editor_ref) this.editor_ref.remove()
        if (this.event_ref) this.remove_event_in_rasp()
        delete user_events[this.eid]
        delete this

        let saved = []
        for (let usr_event of Object.values(user_events)) if (usr_event) saved.push(usr_event.get_hash())
        createCookie('user_events', saved.join('|'), 365)
    }

    invitation () {
        this.editor_ref.children[4].children[2].classList.toggle('hidden')
        this.editor_ref.children[4].children[2].value = make_invitation(this)
    }
}

let invitation_preset = base_invitation_preset

function load_invitation_preset () {
    let loaded = readCookie('event_invitation')
    if (loaded) invitation_preset = loaded.replaceAll('&n', '\n')
    else invitation_preset = base_invitation_preset
    if (!mobile_version) document.getElementById('invitation_editor').children[1].value = invitation_preset
}

function save_new_invitation (block) {
    block.classList.add('hidden')
    invitation_preset = document.getElementById('invitation_editor').children[1].value
    createCookie('event_invitation', invitation_preset.replaceAll('\n', '&n'), 180)
}
function set_base_invitation (block) {
    block.classList.add('hidden')
    invitation_preset = base_invitation_preset
    document.getElementById('invitation_editor').children[1].value = invitation_preset
    createCookie('event_invitation', invitation_preset.replaceAll('\n', '&n'), 180)
}
function invitation_changed () {
    document.getElementById('invitation_editor').children[3].classList.remove('hidden')
    document.getElementById('invitation_editor').children[4].classList.remove('hidden')
}

function make_invitation (usr_event) {
    let invitation_str = invitation_preset
    let matched = invitation_preset.match(/{[^}]*}/ig)
    for (special in matched) {
        let params = matched[special].slice(1, -1).split('|')
        switch (params[0].toLowerCase()) {
            case "{": // {{}
                invitation_str = invitation_str.replace(matched[special], '{')
                break

            case "": // {}}
                invitation_str = invitation_str.replace(matched[special], '')
                break

            case "heading":
            case "заголовок":
                invitation_str = invitation_str.replace(matched[special], usr_event.heading)
                break

            case "description":
            case "описание":
                invitation_str = invitation_str.replace(matched[special], usr_event.description)
                break

            case "instead":
            case "замещение":
                invitation_str = invitation_str.replace(matched[special], usr_event.hide_lessons? params[1] : params[2])
                break
                
            case 'date':
            case "дата":
                let dd      = usr_event.date.day
                let weekday = usr_event.date.get_week_day_name(full = true)
                let wd      = usr_event.date.get_week_day_name(full = false)
                let mm      = usr_event.date.month + 1
                let ofmonth = monthNames[Number(mm)-1]
                let month   = cal_monthes[Number(mm)-1]
                let yyyy    = usr_event.date.year.toString().padStart(4, '0')
                let yy      = yyyy.slice(2)
                invitation_str = invitation_str.replace(matched[special], 
                    params[1]? params[1].replaceAll('дд', dd)
                                        .replaceAll('день', weekday)
                                        .replaceAll('дн', wd)
                                        .replaceAll('мм', mm)
                                        .replaceAll('месяца', ofmonth)
                                        .replaceAll('месяц', month)
                                        .replaceAll('гггг', yyyy)
                                        .replaceAll('гг', yy) : usr_event.date)
                break

            case 'lesson':
            case 'занятие':
                invitation_str = invitation_str.replace(matched[special], usr_event.lesson)
                break

            case 'link':
            case "ссылка":
                invitation_str = invitation_str.replace(matched[special], document.location.href.replace(document.location.search, '?event='+encode_event_hash(usr_event.get_hash())))
                break

            case 'delete':
            case "удаление":
                let str = ''
                switch (usr_event.delete_after) {
                    case '0': str = 'после завершения'; break
                    case '1': str = 'после окончания дня'; break
                    case '2': str = 'после окончания недели'; break
                    case '3': str = 'никогда'; break
                }
                invitation_str = invitation_str.replace(matched[special], str)
                break
    
            case 'color':
            case 'colour':
            case "цвет":
                invitation_str = invitation_str.replace(matched[special], usr_event.event_colour)
                break

            default:
                invitation_str = invitation_str.replace(matched[special], '')
                break
        }
    }
    return invitation_str.replaceAll('$n', '\n')
}

function convert_str_to_hash (str) {
    if (!str) return ''
    for (conv of event_hash_convertations) str = str.replaceAll(conv[0], conv[1])
    return str
}
function convert_hash_to_str (hash) {
    for (conv of event_hash_convertations) hash = hash.replaceAll(conv[1], conv[0])
    return hash
}

function check_text_area (textarea) {
    textarea.value = textarea.value.replaceAll(/[^0-9a-zа-я _\(\)\.!?`'",:;\\\-=/@#&\n]/ig, '')
}

function add_event (event_content = null, from_link = false) {
    if (Object.values(user_events).length < 10) user_events[user_event_id] = new user_event(event_content)
    try {
        document.getElementById('event_panel').children[0].appendChild(user_events[user_event_id].editor_ref)
    } catch {}
    user_event_id++
    if (!from_link) send_action('создано событие', '')
}

function add_event_from_link (event_content) {
    generate_new_event_page()
    send_action('Событие открыто по ссылке', '')
    add_event(decode_event_hash(event_content), from_link = true)
    user_events[user_event_id-1].editor_ref.children[4].children[0].setAttribute('onclick', `user_events[${user_event_id-1}].save_as_new_event(true)`)
    user_events[user_event_id-1].save_as_new_event()
}

const encoding_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function encode_event_hash (hash) {
    let encoded_str = ''
    for (char of hash) {
        if      (char.search(/[0-9]/) === 0) encoded_str += '0' + char
        else if (char == '%') encoded_str += '0a'
        else if (char == '-') encoded_str += '0b'
        else if (char.search(/[а-я]/) === 0) encoded_str += 'r' + encoding_chars[char.charCodeAt(0) - 'а'.charCodeAt(0)]
        else if (char.search(/[А-Я]/) === 0) encoded_str += 'R' + encoding_chars[char.charCodeAt(0) - 'А'.charCodeAt(0)]
        else if (char.search(/[a-z]/) === 0) encoded_str += 'e' + char
        else if (char.search(/[A-Z]/) === 0) encoded_str += 'E' + char
    }
    return encoded_str
}

function decode_event_hash (encoded_str) {
    let hash = ''
    let char = 0
    while (char < encoded_str.length) {
        switch (encoded_str[char]) {
            case '0':
                if      (encoded_str[char+1] == 'a') hash += '%'
                else if (encoded_str[char+1] == 'b') hash += '-'
                else hash += encoded_str[char+1]
                break

            case 'r':
                hash += String.fromCharCode('а'.charCodeAt(0) + encoding_chars.indexOf(encoded_str[char+1]))
                break

            case 'R':
                hash += String.fromCharCode('А'.charCodeAt(0) + encoding_chars.indexOf(encoded_str[char+1]))
                break

            case 'e':
                hash += encoded_str[char+1]
                break

            case 'E':
                hash += encoded_str[char+1]
                break
        }
        char += 2
    }
    return hash
}

function load_events_from_cookie () {
    user_events = {}
    user_event_id = 0

    let loaded = readCookie('user_events')
    if (loaded) {
        let events = loaded.split('|')
        for (event_hash of events) add_event(event_hash)
    }
}

function add_button_on_expires () {
    let buttons = document.getElementsByClassName('new_event_subtitle')
    let back_button = null
    if (buttons.length == 0) return
    else back_button = buttons[0]

    let new_location = document.location.toString().slice(0, -1) + '3'

    let button = document.createElement('button')
    button.setAttribute('class', 'new_event-button_back')
    button.setAttribute('onclick', `document.location="${new_location}"`)
    button.innerText = 'Нажмите здесь, чтобы добавить это событие всё равно'
    back_button.insertAdjacentElement('BeforeBegin', button)

    let br = document.createElement('br')
    back_button.insertAdjacentElement('BeforeBegin', br)
}


function open_event_editor () {
    let panel = open_popup_panel('Настройка событий', 'event_list')
    panel.innerHTML = `
    <div id='event_panel'>
        <div>
        </div>
        <div style='width: 100%; text-align: center'>
            <button class='event_panel_button-add' onclick='add_event()'>Добавить</button>
            <br>
            <button class='event_panel_button' onclick='document.getElementById("invitation_editor").classList.toggle("hidden")'>Изменить приглашение</button>
            <div class='event_blank hidden' style='margin-top: 40px; text-align: left' id='invitation_editor'>
                <label id="invitation_form_title">Настройка формы приглашения</label>
                <textarea style='height: 150px; margin: 5px 0px' onchange='invitation_changed()'>${invitation_preset}</textarea>
                <br>
                <button class='event_panel_button' onclick='save_new_invitation(this)'>сохранить изменения</button>
                <button class='event_panel_button' onclick='set_base_invitation(this)'>базовове приглашение</button>
                <br>
                <label>Специальные параметры:</label>
                <ul>
                    <li><b>{заголовок}</b> - подставляет на это место заголовок события</li>
                    <li><b>{описание}</b> - подставляет описание события</li>
                    <li><b>{дата|формат}</b> - подставляет дату события в указанном формате. Заменяет:</li>
                    <ul>
                        <li>"дд" на день события</li>
                        <li>"день" на день недели события (Понедельник, Вторник и т.д.)</li>
                        <li>"дн" на день недели события в сокращённом формате (пн, вт и т.д.)</li>
                        <li>"мм" на месяц в числовом формате</li>
                        <li>"месяц" на месяц в именительном падеже (январь, февраль и т.д.)</li>
                        <li>"месяца" на месяц в родительном падеже (января, февраля и т.д.)</li>
                        <li>"гггг" на полный год события</li>
                        <li>"гг" на последние 2 цифры года</li>
                    </ul>
                    <li><b>{замещение|если да|если нет}</b> - если поставлена галочка "вместо занятий", подставляет текст из второй колонки ("если да"), иначе из третей ("если нет")</li>
                    <li><b>{занятие}</b> - подставляет выбранный номер занятия (1-7)</li>
                    <li><b>{ссылка}</b> - подставляет ссылку для добавления этого события на сайт расписания другими пользователями</li>
                    <li><b>{удаление}</b> - подставляет, после чего будет удалено событие (или никогда)</li>
                    <li><b>{цвет}</b> - подставляет цвет в формате hex (#rrggbb) события</li>
                    <li><b>{{}</b> - подставляет открывающую фигурную скобку {</li>
                    <li><b>{}}</b> - подставляет закрывающую фигурную скобку }</li>
                    <li><b>$n</b> - подставляет переход на новую строку (например, внутри фигурных скобок)</li>
                </ul>
            </div>
        </div>
    </div>
    `

    let event_panel = document.getElementById('event_panel').children[0]
    event_panel.innerHTML = ``

    for (let usr_event of Object.values(user_events)) if (usr_event) {
        event_panel.appendChild(usr_event.editor_ref)
    }
}