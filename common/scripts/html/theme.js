function adapt_svg_clr (svg_txt, theme = MODE) {
    return svg_txt.replaceAll('%23000000', rec_themes[theme]['vars']['--color-text'].replace('#', '%23'))
}

function update_svgs (theme = MODE) {
    let style = document.getElementById('style_svgs')
    style.innerHTML = ''
    for (i_theme in rec_themes) {
        style.innerHTML += `
        #theme_div-${i_theme} svg {${adapt_svg_clr(rec_themes[i_theme]['svg'], theme)}}
        `
    }

    style.innerHTML += `
    .switcher-mode svg {${adapt_svg_clr(rec_themes[theme]['svg'], theme)}}
    `
    style.innerHTML += adapt_svg_clr(using_svg, theme)
}

function insert_themes () {
    let theme_list = document.getElementById('theme_list')
    theme_list.innerHTML = '<div name="TE_background"></div>'
    theme_list = theme_list.children[0]

    for (theme in rec_themes) {
        theme_list.innerHTML += `
            <div id='theme_div-${theme}' onclick='set_clr_theme("${theme}")'>
                <label>${rec_themes[theme]['text']}</label>
                <svg xmlns="http://www.w3.org/2000/svg" height="${svg_size}" viewBox="0 0 24 24" width="${svg_size}"></svg>
            </div>
        `
    }
}

function set_clr_theme (theme, only_uploading = false, with_mode_change = true) {
    if (with_mode_change) {
        MODE = theme
        save_mode_to_cookie()
    }

    if (!only_uploading) {
        if (theme == 'custom') {
            open_theme_editor()
        }
        else close_theme_editor()
    }

    for (property in rec_themes[theme]['vars']) {
        document.documentElement.style.setProperty(property, rec_themes[theme]['vars'][property])
    }

    update_svgs(theme);
    update_base_styles(theme);
    if (document.getElementById('Weekbar')) fill_cal_filters();
}

function fill_theme_editor (theme_editor) {
    let was = theme_editor.style.display
    theme_editor.style.display = 'None'

    let div = document.createElement('div')
    div.setAttribute('id', 'TE_content')
    for (property in rec_themes['custom']['vars']) {
        if (!property_text[property]) {
            delete rec_themes['custom']['vars'][property]
            continue
        }
        let row = document.createElement('tr')

        let td_1  = document.createElement('td')
        let td_2  = document.createElement('td')
        let label = document.createElement('label')
        let input = document.createElement('input')

        label.innerText = property_text[property]

        input.setAttribute('type'    , 'color')
        input.setAttribute('value'   , rec_themes['custom']['vars'][property])
        input.setAttribute('onchange', `set_theme_property("${property}", this)`)

        td_1.appendChild(label)
        td_2.appendChild(input)
        row.appendChild(td_1)
        row.appendChild(td_2)
        div.appendChild(row)
    }
    theme_editor.appendChild(div)

    div = document.createElement('div')
    div.setAttribute('id', 'TE_set_base')

    let button = document.createElement('button')
    button.onclick = set_custom_as_base_theme
    button.innerText = 'Установить как'
    div.appendChild(button)

    let select = document.createElement('select')
    select.setAttribute('id', 'TE_selection_of_base')
    for (theme in rec_themes) {
        if (theme == 'custom') continue
        let option = document.createElement('option')
        option.setAttribute('value', theme)
        option.innerText = rec_themes[theme]['text']
        select.appendChild(option)
    }
    div.appendChild(select)

    theme_editor.appendChild(div)

    theme_editor.style.display = was
}

function set_theme_property (property, clr_input) {
    rec_themes['custom']['vars'][property] = clr_input.value
    document.documentElement.style.setProperty(property, clr_input.value)
    save_custom_theme()
    if (property == '--color-text') update_svgs()
}

function set_custom_as_base_theme () {
    let s_mode = TE_selection_of_base.value
    for (property in rec_themes['custom']['vars']) {
        rec_themes['custom']['vars'][property] = rec_themes[s_mode]['vars'][property]
        document.documentElement.style.setProperty(property, rec_themes[s_mode]['vars'][property])
    }
    save_custom_theme()
    open_theme_editor()
    update_svgs()
}

function save_custom_theme () {
    let cookie_text = ''
    for (property in rec_themes['custom']['vars']) {
        cookie_text += property + ':' + rec_themes['custom']['vars'][property] + '|'
    }
    createCookie('custom_theme', cookie_text.slice(0, -1), 180)
}
