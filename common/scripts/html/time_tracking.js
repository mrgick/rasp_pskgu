/* */

function to_minutes (time) {return Number(time.slice(0, 2))*60 + Number(time.slice(3, 5))}

function get_lesson_percentage () {
    let crnt_time = new Date()
    //let crnt_time = new Date(2022, 1, 16, 10, 10)
    crnt_time = Number(crnt_time.getHours()*60) + Number(crnt_time.getMinutes())
                
    for (let lsi = 0; lsi < lessons_time.length-1; lsi++) {
        if (to_minutes(lessons_time[lsi]) <= crnt_time && crnt_time < to_minutes(lessons_time[lsi+1])) {
            if (lsi%2 == 0) return Math.floor((crnt_time-to_minutes(lessons_time[lsi]))/90*100)
            else return 100
        }
    }
}

function renew_table_time_status (enabled = tracking_status) {
    if (main_rasp.first_day.date > main_rasp.last_day.date) return

    let crnt_time = new Rasptime()

    if (crnt_time.date < main_rasp.first_day.date) return

    if (enabled) {
        let day = main_rasp.first_day.date
        while (day < crnt_time.date) { 
            for (let lesson = 1; lesson <= lessons_count; lesson++) {
                main_rasp.track_time_cell(day + '-' + lesson, 'disable')
            }
            day = Rasptime.get_next_day(day)
        }

        if (!Rasptime.is_lessons_started()) return
            
        let lesson_now = crnt_time.get_lesson() + 1
        for (let lesson = 1; lesson < lesson_now; lesson++) {
            main_rasp.track_time_cell(crnt_time.date + '-' + lesson, 'active')
        }

        main_rasp.track_time_cell(crnt_time.date + '-' + lesson_now, 'part_active')
        return
        
    }
    else {
        let day = main_rasp.first_day.date
        while (day <= crnt_time.date) {            
            for (let lesson = 1; lesson <= lessons_count; lesson++) {
                main_rasp.track_time_cell(day + '-' + lesson, 'usual')
            }            
            day = Rasptime.get_next_day(day)
        }
    }
}

function try_insert_ago (period, interval, difference) {
    let result = Math.floor(difference/interval)
    if (result > 0) return `${result} ${was_updated[period][result == 1? 0 : (result < 5? 1 : 2)]} назад)`
    else return false
}

function insert_date_of_last_update (last_date, last_update) {
    let difference = new Date() - last_update
    difference /= 1000*60*60*24

    let div = document.getElementById('date_of_last_update')
    if (div) {
        div.innerHTML = `
        <p>Последнее обновление:</p>
        <p>${last_update.getDate()} ${monthNames[last_update.getMonth()]} ${last_update.getFullYear()} (</p>
        `

        if (difference < 1) div.children[1].innerText += 'Обновлено сегодня)'
        else if (difference < 2) div.children[1].innerText += 'Обновлено вчера)'
        else for (i of [['year', 365], ['month', 30], ['week', 7], ['day', 1]]) {
            let result = try_insert_ago(...i, difference)
            if (result) {
                div.children[1].innerText += result
                break
            }
        }

        if (mobile_version) div.innerHTML += `
        <br>
        <br>
        <a href="${main_rasp.original}">Оригинал на сайте ПсковГУ</a>
        <br>
        <br>
        <br>
        <a onclick="go_to_PC_version()">ПК-версия</a>
        `
    }

    if (difference > 30) {
        if (div) div.children[1].setAttribute('style', 'color: var(--color-error)')
        if (last_date <= new Date()) {
            up_warning('Все занятия по данному расписанию закончились, ' + 
                       'а последнее обновление было больше месяца назад. ' + 
                       'Возможно, оно более не используется.')
        }
    }  
}
