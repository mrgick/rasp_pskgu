function open_info_panel (info_type = 'full_info_list') {
    if (info_type == 'full_info_list') insert_full_info_list()
    else if (info_panels[info_type]) open_popup_panel().innerHTML = info_panels[info_type]
    else open_popup_panel().innerHTML = info_panels['no-info']
    add_other_parts()
    //document.getElementById('help_panel').scrollTo(0, 0)
}

function info_link (info_type) {
    if (info_type.startsWith('http')) window.open(info_type, '_blank')
    else {
        if (info_panels[info_type]) open_popup_panel().innerHTML = info_panels[info_type]
        else open_popup_panel().innerHTML = info_panels['no-info']
        add_other_parts()
    }
    //document.getElementById('help_panel').scrollTo(0, 0)
}

function add_other_parts () {
    document.getElementById('pu_list').innerHTML += `
    <h4 style='margin-top: 30px'>(нажмите на область вне этого окна чтобы выйти)</h4>
    `
}

function insert_full_info_list () {
    let help_panel = open_popup_panel()
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
