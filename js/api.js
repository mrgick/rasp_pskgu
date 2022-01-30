/*Файл для работы с апи*/

const API_URL = 'https://api-rasp-pskgu.herokuapp.com/'

async function get_json(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function get_list_groups() {
    res = await get_json(API_URL + 'groups?list_of_names=true')
    return res['groups_list']
}

async function get_group_info(name) {
    res = await get_json(API_URL + "groups?name=" + name)
    return res
}

async function get_last_update() {
    res = await get_json(API_URL + "update?last=true")
    return res
}