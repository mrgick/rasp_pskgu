function open_info_panel (info_type = 'full_info_list') {
    if (info_type == 'full_info_list') insert_full_info_list()
    else if (info_panels[info_type]) document.getElementById('help_panel').innerHTML = info_panels[info_type]
    else document.getElementById('help_panel').innerHTML = info_panels['no-info']
    add_other_parts()
    document.getElementById('help_list').classList.remove('hidden')
    document.getElementById('help_panel').scrollTo(0, 0)
}

function info_link (info_type) {
    if (info_type.slice(0, 4) == 'http') window.open(info_type, '_blank')
    else {
        if (info_panels[info_type]) document.getElementById('help_panel').innerHTML = info_panels[info_type]
        else document.getElementById('help_panel').innerHTML = info_panels['no-info']
        add_other_parts()
    }
    document.getElementById('help_panel').scrollTo(0, 0)
}

function add_other_parts () {
    document.getElementById('help_panel').innerHTML += `
    <h4 style='margin-top: 30px'>(нажмите на область вне этого окна чтобы выйти)</h4>
    <a class="asidebar-close" onclick="document.getElementById('help_list').classList.add('hidden')">
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
    </a>
    `
}

function insert_full_info_list () {
    let help_panel = document.getElementById('help_panel')
    help_panel.innerHTML = `
    <h1>Полный список доступных руководств</h1>
    `

    for (info in info_panels) {
        if (info != 'no-info') {
            help_panel.innerHTML += `
            <div onclick='info_link("${info}")'>${info_panels[info].match(/<h1>.*<\/h1>/i)[0].replace(/<\/?h1>/, '')}</div>
            `
        }
    }
}
