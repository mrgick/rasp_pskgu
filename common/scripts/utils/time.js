/* Файл для работы со временем */

class Rasptime {
    constructor (obj_1 = null, obj_2 = null) {
        this.obj_date = null

        switch (type_of(obj_1)) {

            case 'date':
                this.obj_date = obj_1
                break

            case 'rasptime':
                this.obj_date = new Date(obj_1.datetime)
                break

            case 'string':
                if (type_of(obj_2) == 'string') {
                    this.obj_date = new Date(obj_1 + ' ' + obj_2)
                }
                else {
                    if (obj_1.at(-3) == ':' && obj_1.at(4) != '-') {
                        obj_1 = obj_1.split(':')
                        this.obj_date = new Date()
                        this.obj_date.setHours  (Number(obj_1[0]))
                        this.obj_date.setMinutes(Number(obj_1[1]))
                    }
                    else {
                        this.obj_date = new Date(obj_1)
                    }
                }
                break

            case 'null':
            default:
                this.obj_date = new Date()
                break
        }

        this.#update_date()
        this.#update_time()
    }

    #update_date () {
        this.year  = this.obj_date.getFullYear()
        this.month = this.obj_date.getMonth()
        this.day   = this.obj_date.getDate()

        this.week_day = this.obj_date.getDay()

        this.date = Rasptime.date_from_nums(this.year, this.month, this.day)
        this.datetime = this.date + ' ' + this.time
    }

    #update_time () {
        this.hours   = this.obj_date.getHours()
        this.minutes = this.obj_date.getMinutes()

        this.time = Rasptime.time_from_nums(this.hours, this.minutes)
        this.datetime = this.date + ' ' + this.time
    }

    next_day (n = 1) {
        this.obj_date.setDate(this.day + n)
        this.#update_date()
        return this
    }

    backward_to_monday () {
        return this.next_day(1 - (this.week_day == 0? 7 : this.week_day))
    }

    forward_to_monday () {
        return this.next_day((8 - (this.week_day == 0? 7 : this.week_day))%7)
    }

    get_rasp_date () {
        return this.day.toString() + ' ' + monthNames[this.month]
    }

    get_week_day_name (full = true) {
        if (full) return weekNames[this.week_day]
        else return weekNamesShort[this.week_day]
    }


    get_lesson () {
        if (this.time < lessons_time[0]) return -1

        for (let lsi = 0; lsi < lessons_count; lsi ++) {
            if (lessons_time[lsi] <= this.time && this.time < lessons_time[lsi+1]) {
                return Math.floor(lsi/2)
            }
        }
    
        return lessons_count
    }
    
    is_lesson_now (lesson = 'any') {
        if (lesson == 'any') {
            if (!Rasptime.is_lessons_started()) return false

            for (let lsi = 0; lsi < lessons_count; lsi += 2) {
                if (lessons_time[lsi] <= this.time && this.time < lessons_time[lsi+1]) {
                    return true
                }
            }
            return false
        }
        else {
            return lesson == (new Rasptime()).get_lesson()
        }
    }


    copy () {
        return new Rasptime(this.datetime)
    }


    static date_from_obj (date) {
        return date.toISOString().split('T')[0];
    }
    
    static time_from_obj (date) {
        return (date.getHours  ().toString().padStart(2, '0') + ':' + 
                date.getMinutes().toString().padStart(2, '0'))
    }

    static datetime_from_obj (date) {
        return Rasptime.date_from_obj(date) + ' ' + 
               Rasptime.time_from_obj(date)
    }


    static date_from_lid (lid) {
        return lid.slice(0, -2)
    }

    static time_from_lid (lid, endtime = false) {
        return lessons_time[(Number(lid.at(-1)) - 1) * 2 + (endtime? 1 : 0)]
    }

    static datetime_from_lid (lid, endtime = false) {
        return Rasptime.date_from_lid(lid) + ' ' + 
               Rasptime.time_from_lid(lid, endtime)
    }


    static date_from_any (any) {
        switch (type_of(any)) {
            case 'date':
                return Rasptime.date_from_obj(any)

            case 'rasptime':
                return any.date

            case 'string':
                any = any.split(' ')[0]
                if (any.at(-2) == '-') return Rasptime.date_from_lid(any)
                else return any

            default:
                return (new Rasptime()).date
        }
    }

    static time_from_any (any) {
        switch (type_of(any)) {
            case 'date':
                return Rasptime.time_from_obj(any)

            case 'rasptime':
                return any.time

            case 'string':
                any = any.split(' ')
                if (any.length == 1) any = any[0]
                else any = any[1]
                if (any.at(-2) == '-') return Rasptime.time_from_lid(any)
                else return any

            default:
                return (new Rasptime()).time
        }
    }

    static datetime_from_any (any) {
        switch (type_of(any)) {
            case 'date':
                return Rasptime.datetime_from_obj(any)

            case 'rasptime':
                return any.datetime

            case 'string':
                return (new Rasptime(any)).datetime

            default:
                return (new Rasptime()).datetime
        }
    }


    static date_from_nums (date_year = 1, date_month = 0, date_day = 1) {
        return (date_year     .toString().padStart(4, '0') + '-' +
                (date_month+1).toString().padStart(2, '0') + '-' +
                date_day      .toString().padStart(2, '0'))
    }

    static time_from_nums (time_hours = 0, time_minutes = 0) {
        return (time_hours  .toString().padStart(2, '0') + ':' +
                time_minutes.toString().padStart(2, '0'))
    }

    static datetime_from_nums (date_year = 1, date_month = 0, date_day = 1, time_hours = 0, time_minutes = 0) {
        return Rasptime.date_from_nums(date_year, date_month, date_day) + ' ' + 
               Rasptime.time_from_nums(time_hours, time_minutes)
    }


    static date_now () { return Rasptime.date_from_obj(new Date()) }
    static time_now () { return Rasptime.time_from_obj(new Date()) }


    static get_next_day (date, n = 1) {
        date = new Date(Rasptime.date_from_any(date))
        date.setDate(date.getDate() + n)
        return Rasptime.date_from_obj(date)
    }

    static get_monday (date) {
        let date_obj = new Date(Rasptime.date_from_any(date))
        let week_day = date_obj.getDay()
        return Rasptime.get_next_day(date, 1 - (week_day == 0? 7 : week_day))
    }

    static get_year_week (date) {
        let date_obj = null
        if (type_of(date) == 'date') date_obj = date
        else date_obj = new Date(Rasptime.date_from_any(date))

        let onejan = new Date(date_obj.getFullYear(), 0, 1)
        return Math.floor((((date_obj - onejan) / 86400000) + onejan.getDay() + 1) / 7)
    }


    static weeks_between (date_1, date_2) {
        let mondate = Rasptime.get_year_week(date_1)
        let todate  = Rasptime.get_year_week(date_2)
        return todate - mondate + 1
    }

    static days_between (date_1, date_2) {
        return Math.floor(Math.abs(
                new Date(Rasptime.date_from_any(date_2)) - 
                new Date(Rasptime.date_from_any(date_1))
                )/1000/60/60/24)
    }

    static minutes_between (time_1, time_2, allow_negative = true) {
        time_1 = Rasptime.time_from_any(time_1)
        time_2 = Rasptime.time_from_any(time_2)

        if (allow_negative || time_1 <= time_2) {
            return Math.floor(new Date('2022-01-01 ' + time_2) - 
                              new Date('2022-01-01 ' + time_1 )) / 1000 / 60
        }
        else {
            return 1440 + Math.floor(new Date('2022-01-01 ' + time_2) - 
                                     new Date('2022-01-01 ' + time_1 )) / 1000 / 60
        }
    }

    static minutes_between_datetimes (datetime_1, datetime_2) {
        return Math.floor(new Date(Rasptime.datetime_from_any(datetime_2)) - 
                          new Date(Rasptime.datetime_from_any(datetime_1))) / 1000 / 60
    }


    static lesson_from_time (time = 'now') {
        if (time == 'now') {
            time = Rasptime.time_from_obj(new Date())
        }
        else time = Rasptime.time_from_any(time)
    
        if (time < lessons_time[0]) return -1
    
        for (let lsi = 0; lsi < lessons_count-1; lsi++) {
            if (lessons_time[lsi] <= time && time < lessons_time[lsi+1]) {
                return Math.floor(lsi/2)
            }
        }
        
        return lessons_count
    }

    static lesson_and_bool_from_time (time = 'now') {
        if (time == 'now') {
            time = Rasptime.time_from_obj(new Date())
        }
        else time = Rasptime.time_from_any(time)
    
        if (time < lessons_time[0]) return [-1, false]
    
        for (let lsi = 0; lsi < lessons_count-1; lsi++) {
            if (lessons_time[lsi] <= time && time < lessons_time[lsi+1]) {
                return [Math.floor(lsi/2), (lsi%2 === 0)]
            }
        }
        
        return [lessons_count, false]
    }

    static is_lessons_started () {
        return (Rasptime.time_from_obj(new Date()) > lessons_time[0])
    }
}
