function open_left_panel (svg_id = 'base_exit_svg', heading = 'Назад') {
    close_all_panels()
    let panel = document.getElementById('left_shifting_panel')
    panel.innerHTML = `
    <div id="lsp_header" onclick="close_left_panel()">
        <div id="${svg_id}">
            <svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 0 24 24" width="72px"></svg>
        </div>
        <label>${heading}</label>
    </div>
    <div id="lsp_list">
    </div>
    `
    panel.classList.remove('shifted_left')

    try { document.getElementById('dark_bg').classList.remove('hidden') } catch {}

    return panel.querySelector('#lsp_list')
}

function close_left_panel () {
    document.getElementById('left_shifting_panel').classList.add('shifted_left')
    document.getElementById('dark_bg').classList.add('hidden')
}



function open_authors () {
    let panel = open_left_panel('authors', 'Прочее')
    panel.innerHTML = `
    <ul class="footer-list">
        <li>© MrGick, KGlebB, WhiteRain7</li>
        <li><a class="footer-link" href="https://github.com/mrgick/rasp_pskgu">Исходный код сайта</a></li>
        <li><a class="footer-link" href="https://github.com/mrgick/rasp_pskgu/blob/main/LICENSE">MIT лицензия</a></li>
        <li><a class="footer-link" href="https://github.com/mrgick/pskgu_api">API сайта</a></li>
    </ul>

    <hr class="footer_hr">

    <ul class="footer-list">
        <li>Ссылки</li>
        <li><a class="footer-link" href="http://rasp.pskgu.ru">Оригинал расписания ПсковГУ</a></li>
        <li><a class="footer-link" href="https://vk.com/pskgu_bot">Группа Вконтакте</a></li>
    </ul>

    <hr class="footer_hr">

    <ul class="footer-list">
        <li>Прочее</li>
        <li><a class="footer-link" onclick='open_info_panel()'>Как пользоваться сайтом</a></li>
        <li><a class="footer-link" onclick='open_info_panel("cookies")'>Использование Cookies</a></li>
        <li><a class="footer-link" onclick='open_info_panel("data")'>Сбор данных</a></li>
    </ul>
    `
}



function open_popup_panel (heading = 'Содержание', subclass='help_panel') {
    close_all_panels()
    let panel = document.getElementById('popup_panel')
    panel.innerHTML = `
    <div id="pu_header">
        <label>${heading}</label>
        <label class="large_exit_x" onclick="close_popup_panel()">×</label>
    </div>
    <div id="pu_list" class="${subclass}">
    </div>
    `
    panel.classList.remove('hidden')

    try { document.getElementById('dark_bg').classList.remove('hidden') } catch {}

    return panel.querySelector('#pu_list')
}

function close_popup_panel () {
    document.getElementById('popup_panel').classList.add('hidden')
    document.getElementById('dark_bg').classList.add('hidden')
}



function open_bottom_panel (heading = 'Содержание') {
    close_all_panels()
    let panel = document.getElementById('bottom_panel')
    panel.innerHTML = `
    <div id="bp_header">
        <div id="bp_expand" onclick="expand_bottom_panel()">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px"></svg>
        </div>
        <label>${heading}</label>
        <div id="bp_close" onclick="close_bottom_panel()">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px"></svg>
        </div>
    </div>
    <div id="bp_list">
    </div>
    `
    expand_bottom_panel()

    return panel.querySelector('#bp_list')
}

function expand_bottom_panel () {
    let panel = document.getElementById('bottom_panel')
    panel.setAttribute('class', '')

    let bp_expand = panel.children[0].children[0].children[0]
    bp_expand.setAttribute('width' , '72px')
    bp_expand.setAttribute('height', '72px')
    bp_expand.setAttribute('style', 'transform: rotate(180deg)')
    bp_expand.parentElement.setAttribute('onclick', 'unexpand_bottom_panel()')

    let bp_title = panel.children[0].children[1]
    bp_title.setAttribute('style', 'line-height: 72px')
    bp_title.parentElement.setAttribute('style', 'min-height: 72px')
    
    let bp_close = panel.children[0].children[2].children[0]
    bp_close.setAttribute('width' , '72px')
    bp_close.setAttribute('height', '72px')
}

function unexpand_bottom_panel () {
    let panel = document.getElementById('bottom_panel')
    panel.setAttribute('class', 'unexpanded')

    let bp_expand = panel.children[0].children[0].children[0]
    bp_expand.setAttribute('width' , '48px')
    bp_expand.setAttribute('height', '48px')
    bp_expand.setAttribute('style', '')
    bp_expand.parentElement.setAttribute('onclick', 'expand_bottom_panel()')

    let bp_title = panel.children[0].children[1]
    bp_title.setAttribute('style', '')
    bp_title.parentElement.setAttribute('style', '')
    
    let bp_close = panel.children[0].children[2].children[0]
    bp_close.setAttribute('width' , '48px')
    bp_close.setAttribute('height', '48px')
}

function close_bottom_panel () {
    document.getElementById('bottom_panel').setAttribute('class', 'shifted_bottom')
}



function close_all_panels () {
    close_left_panel()
    close_popup_panel()
    close_bottom_panel()
    Switch_setting_menu(to = false)
}