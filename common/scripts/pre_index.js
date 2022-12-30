const lessons_count = Math.floor(lessons_time.length / 2)

let num_cls = [] // 1-я пара, 2-я пара, ...
let time_cls = [] // 08:30-10:00, 10:15-11:45, ...

for (let i = 1; i <= lessons_count; i++) {
    num_cls.push(`${i}-я пара`)
    time_cls.push(`${lessons_time[(i - 1) * 2]}-${lessons_time[(i - 1) * 2 + 1]}`)
}

class no_rasp {
    constructor (group_json = null) {
        this.group_json = group_json

        if (group_json != null) {
            this.name = group_json.name
            this.prefix = group_json.prefix[0].toLowerCase() == 'преподаватель'? 'Преподаватель' : 'Группа'
            this.REs = this.prefix == 'Преподаватель'? teacher_REs : group_REs
        
            this.original = group_json.page_url
            this.last_updated = group_json.last_updated
        }
        else {
            this.name = ''
            this.prefix = ''
            this.REs = all_REs
        
            this.original = 'https://rasp.pskgu.ru'
            this.last_updated = Rasptime.date_now()
        }

        this.type = 'no_rasp'

        try   { this.html = document.getElementsByClassName('rpage')[0] }
        catch { this.html = null }

        this.compared_with = []

        this.first_day = new Rasptime('9999-01-01')
        this.last_day  = new Rasptime('0001-01-01')
        this.week_now = -1
        this.days = []
        this.tables = {}
        
        this.last_visited = null
        this.last_used_anim = '_2'
    }

    insert_day (day, group_json = null, group = null) { return }
    insert_event (event) { return }

    async compare_to (group) {
        let enter = document.getElementById('compare_name_enter')

        if (this.compared_with.indexOf(group) === -1 && group != this.name) try {
            let group_json = await get_group_info(group)

            if (group_json == null || group_json['detail'] != null) {
                if (enter != null) enter.setAttribute('class', 'compare_denied')
                return
            }

            if (confirm('Перейти к расписанию группы/преподавателя ' + link + '?')) {
                document.location.href = document.location.href.replace(document.location.search, '?group_name=' + group.replaceAll(' ', '_'))
            }

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

    colour_own_group (colour) { return }
    decolour_own_group () { return }
    colour_compared_group (group, colour) { return }
    decolour_compared_group (group) { return }
    highlight_own_group () { return }
    highlight_compared_group (group) { return }
    stop_highlighting () { return }

    clipboard_link () {
        let link = document.location.toString().split('?')[0]
        link += '?group_name=' + this.name + '&compare_to=' + this.compared_with.join(',')
        copy_to_CB(link)
    }

    contains (day) { 
        day = Rasptime.date_from_any(day)
        return (this.first_day.date <= day && day <= this.last_day.date) 
    }

    get_table_contains (day) { return null }
    get_table_now () { return null }
    get_week_now () { return -1 }
    set_week_cascadely (from, number) { return }

    get_monday_at_week (week_num) {
        let date = new Rasptime((new Date()).getFullYear().toString() + '-01-01')
        return date.forward_to_monday().next_day((week_num - 1)*7)
    }

    get_week_num_at_day (day) {
        let date = new Rasptime((new Date()).getFullYear().toString() + '-01-01')
        return Rasptime.weeks_between(date, day)
    }

    get_lessons_on_day (date, group = null) {
        let result = {}
        for (let i = 0; i < lessons_count; i++) result[i+1] = []
        return result
    }

    get_next_lesson_after (day, time = '08:00') { return null }
    get_next_lesson_from_now () { return null }
    get_prev_lesson_before (day, time = '08:00') { return null }
    get_prev_lesson_from_now () { return null }

    lid_from_lesson (node) { return '' }

    track_time_cell (lesson, status) { return }

    get_day_workload (day = 'today') {
        let workload = []
        for (let i = 0; i < lessons_count; i++) workload.push(0)
        return workload
    }

    track_time_cell (lesson, status) {}
    fill_week_list (list) {}

    go_to (elem_id = null, rewrite_hash = true) {
        if (type_of(elem_id) != 'string') elem_id = Rasptime.date_now()

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
}
