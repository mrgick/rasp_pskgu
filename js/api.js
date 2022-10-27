/*Файл для работы с апи*/

const API_URL = 'https://api-rasp-pskgu.herokuapp.com/'

async function get_json(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function get_list_groups(type = 'list') {
    if (type == 'list' || type == 'structure') {
        res = (await get_json(API_URL + 'groups?list_of_names=' + type))['list_of_names']

        //=================================================================
        if (type == 'structure') try {
            let abc = res['Расписание преподавателей']['Прочее']['прочее']
            delete res['Расписание преподавателей']
            res['Расписание преподавателей'] = abc
            console.log(res['Расписание преподавателей'])
        } catch {}
        // after delete also modify: fullist.js -> line 60
        //=================================================================

        return res
    }
}

async function get_group_info(name) {
    res = await get_json(API_URL + "groups?name=" + name)
    return res
}

async function get_all_groups_info() {
    res = await get_group_info("all")
    return res
}

async function get_last_update() {
    res = await get_json(API_URL + "update?last=true")
    return res
}
