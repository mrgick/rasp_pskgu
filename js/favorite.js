function fill_favorite_list () {
    let list = document.getElementById('favorite_content')
    list.innerHTML = `
    <div class='switcher' style='text-align: left; height: 36px' onclick='close_favorite_list()'>
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
        <label style='margin-left: 0px'>Избранное</label>
    </div>
    `

    let content = get_cookie_favorite()
    if (!content || content == '||') {
        list.innerHTML += `
        <label id='empty_favorite'>Добавленные в избранное расписания будут отображаться здесь</label>
        `
    }
    else {
        content = content.split('|').slice(1, -1)
        for (favorite of content) {
            list.innerHTML += `
                <div class='goto_favorite'>
                    <div onclick='remove_from_favorite("${favorite}", this)'>&#215;</div>
                    <div onclick='go_to_favorite_url("${favorite}")'><label>${favorite}</label></div>
                </div>
            `
        }
    }
}

function get_cookie_favorite () {
    let content = readCookie('favorite')
    if (content) return content
    else {
        createCookie('favorite', '||', 180)
        return '||'
    }
}

function get_current_group_name () {
    group_name = document.getElementById('Group_Name')
    if (group_name) return group_name.innerText.split(' ').slice(1).join(' ')
    else return ''
}

function switch_favorite () {
    if (!check_is_favorite()) add_to_favorite()
    else remove_from_favorite()
}

function add_to_favorite (group = null) {
    if (group == null) group = get_current_group_name();

    createCookie('favorite', get_cookie_favorite().replace('||','|') + group + '|', 180)
    is_favorite()
}

function remove_from_favorite (group = null, block = null) {
    if (group == null) group = get_current_group_name();

    content = get_cookie_favorite()
    content = content.replace(group + '|', '')
    if (content == '|') content = '||'
    createCookie('favorite', content, 180)

    if (block != null) block.remove()
    is_not_favorite()
}

function check_is_favorite (group = null) {
    if (group == null) group = get_current_group_name();
    content = get_cookie_favorite()
    if (content) {
        if (content.indexOf('|'+group+'|') !== -1) return true
        else return false
    }
    else return false
}

function is_favorite () {
    let switcher = document.getElementsByClassName('switcher-favorite');
    if (switcher.length > 0) switcher[0].classList.add('switcher-favorite--active');
}

function is_not_favorite () {
    let switcher = document.getElementsByClassName('switcher-favorite');
    if (switcher.length > 0) switcher[0].classList.remove('switcher-favorite--active');
}

function go_to_favorite_url (group) {
    document.location.href = document.location.href + '?group_name=' + group.replaceAll(' ', '_')
}
