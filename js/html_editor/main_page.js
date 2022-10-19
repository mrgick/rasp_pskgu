const version = '1.3.0'

function generate_main_page()
{
    document.getElementById("MAIN").innerHTML=`
    <div id='favorite_list' onclick='open_favorite_list()'>
        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" style="cursor: pointer"></svg>
        <div id='favorite_content' class='hidden'></div>
    </div>
    <div class="enable_setting_menu" style='position: absolute; top: 6px; right: 6px;'>
        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" style="cursor: pointer"></svg>
        <div class="background_of_setting_menu hidden" id='setting_menu'>
            <div class="setting_menu">
                <div class="switcher" onclick="Switch('setting_menu');">
                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-info" onclick="document.getElementById('info_list').classList.toggle('hidden')">
                    <label>Справка</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                    <div id="info_list" class="hidden">
                        <div class='info_div' onclick='open_info_panel("search_page")'><label>страница поиска - что здесь</label></div>
                        <div class='info_div' onclick='open_info_panel("correct_searching")'><label>Как правильно искать</label></div>
                        <div class='info_div' onclick='open_info_panel("cookies")'><label>Для чего используются Cookies</label></div>
                        <div class='info_div' onclick='open_info_panel("filling_out_form")'><label>Как сообщить об ошибке</label></div>
                        <div class='info_div' onclick='open_info_panel("full_info_list")'><label>Полный список руководств</label></div>
                        <div class='info_div' onclick='open_info_panel("last_update")'><label>Обновление ${version}</label></div>
                    </div>
                </div>
                <div class="switcher-mode" onclick="switch_theme_list();">
                    <label>Выбрать цветовую тему</label>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    <div id="theme_list" class="clr_theme_list hidden"></div>
                </div>
                <div class="switcher-issue_form" onclick="switch_issue_report();">
                    <label>Сообщить об ошибке</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-collect_data${collecting_data? '' : '--rejected'}" onclick="switch_collecting_data();">
                    <label>Разрешить сбор информации</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
            </div>
        </div>
    </div>
    <h1 class="title">Расписание<br>ПсковГУ</h1>
    <div class="search" id="Search_Group">
        <form class="search-form">
            <svg class="search-form-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <input class="search-form-input" name="find_group_name" type="search" autocomplete="off" placeholder="группа/преподаватель" />
            <button class="search-form-button" onclick="adapt_search_text()" type="submit">Поиск</button>
        </form>
        <!--a class="search-showall" href="?list">Показать всё</a-->
    </div>
    `
    add_footer(to = document.getElementById('MAIN'), as_block = false)
    add_aside_bars()
}

function generate_search_page(text)
{
    document.getElementById("MAIN").innerHTML=`
    <div class="enable_setting_menu" style='position: absolute; top: 6px; right: 6px;'>
        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
        <div class="background_of_setting_menu hidden" id='setting_menu'>
            <div class="setting_menu">
                <div class="switcher" onclick="Switch('setting_menu');">
                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-info" onclick="document.getElementById('info_list').classList.toggle('hidden')">
                    <label>Справка</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                    <div id="info_list" class="hidden">
                        <div class='info_div' onclick='open_info_panel("search_page")'><label>страница поиска - что здесь</label></div>
                        <div class='info_div' onclick='open_info_panel("correct_searching")'><label>Как правильно искать</label></div>
                        <div class='info_div' onclick='open_info_panel("cookies")'><label>Для чего используются Cookies</label></div>
                        <div class='info_div' onclick='open_info_panel("filling_out_form")'><label>Как сообщить об ошибке</label></div>
                        <div class='info_div' onclick='open_info_panel("full_info_list")'><label>Полный список руководств</label></div>
                        <div class='info_div' onclick='open_info_panel("last_update")'><label>Обновление ${version}</label></div>
                    </div>
                </div>
                <div class="switcher-mode" onclick="switch_theme_list();"> 
                    <label>Выбрать цветовую тему</label>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    <div id="theme_list" class="clr_theme_list hidden"></div>
                </div>
                <div class="switcher-issue_form" onclick="switch_issue_report();">
                    <label>Сообщить об ошибке</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
            </div>
        </div>
    </div>
    <header class="header">
        <h1 class="title title--top"><a href="${window.location.pathname}">Расписание<br>ПсковГУ</a></h1>
        <div class="search search--top" id="Search_Group">
            <form class="search-form">
                <input class="search-form-input" value="${text}" name="find_group_name" type="search" autocomplete="off" placeholder="группа/преподаватель" />
                <svg class="search-form-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                <button class="search-form-button" type="submit">Поиск</button>
            </form>
        </div>
    </header>
    <div class="groups" id="Groups_List">
        <p class="groups-text">Поиск соответствий...</p>
    </div>
    `
    add_aside_bars()
}

function generate_rasp_page(group)
{
    document.getElementById("MAIN").innerHTML=`
    <header class="header header--rasp" style="z-index: 3">
        <h1 class="title title--top"><a href="${window.location.pathname}">Расписание<br>ПсковГУ</a></h1>
        <div class="header-main">
            <h2 class="group_name" id="Group_Name">${group.prefix[0]=="преподаватель" ? "Преподаватель" : "Группа"} ${group.name.replace("_", " ")}</h2>
            <div class="header-main-right">
                <div name='menu_content'>
                    <div class="enable_alt_click" onclick="switch_alt_click();" title='Выделять схожие элементы в таблице по нажатию. Аналогично alt + ЛКМ.'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                    </div>
                    <div class="enable_setting_menu" style='position: relative'>
                        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                        <div class="background_of_setting_menu hidden" id='setting_menu'>
                            <div class="setting_menu">
                                <div class="switcher" onclick="Switch('setting_menu');">
                                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-info" onclick="document.getElementById('info_list').classList.toggle('hidden')">
                                    <label>Справка</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                    <div id="info_list" class="hidden">
                                        <div class='info_div' onclick='open_info_panel("rasp_page")'><label>страница расписания - что здесь</label></div>
                                        <div class='info_div' onclick='open_info_panel("filters")'><label>Как настраивать фильтры</label></div>
                                        <div class='info_div' onclick='open_info_panel("print_version")'><label>Версия для печати - что здесь</label></div>
                                        <div class='info_div' onclick='open_info_panel("user_events")'><label>Использование событий</label></div>
                                        <div class='info_div' onclick='open_info_panel("filling_out_form")'><label>Как сообщить об ошибке</label></div>
                                        <div class='info_div' onclick='open_info_panel("full_info_list")'><label>Полный список руководств</label></div>
                                        <div class='info_div' onclick='open_info_panel("last_update")'><label>Обновление ${version}</label></div>
                                    </div>
                                </div>
                                <div class="switcher-favorite" onclick="switch_favorite()">
                                    <label>Добавить в избранное</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-timetrack" onclick="change_tracking_status();">
                                    <label>Отслеживание времени</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-editbar" onclick="Switch_editbar();">
                                    <label>Настроить фильтры</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-mode" onclick="switch_theme_list();">
                                    <label>Выбрать цветовую тему</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                    <div id="theme_list" class="clr_theme_list hidden"></div>
                                </div>
                                <div class="switcher-events" onclick="switch_event_list();">
                                    <label>Настройка событий</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-comparing" onclick="switch_comparing();">
                                    <label>Сравнить расписания</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-print" onclick="open_print_page()">
                                    <label>Распечатать</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-issue_form" onclick="switch_issue_report();">
                                    <label>Сообщить об ошибке</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div id='date_of_last_update'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="header-main-back" href="${group.page_url}">Оригинал</a>
            </div>
        </div>
        <div class="switcher-weekbar" onclick="Switch('Weekbar');">
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/></svg>
        </div>
    </header>

    <container class="rpage">
        <aside class="weekbar hidden" id="Weekbar">
            <p class="weekbar-title">Список недель:</p>
            <div class="weekbar-list" id="Weekbar_List"></div>
        </aside>

        <aside class="editbar hidden" id="Editbar">
            <p class="editbar-title">Настройки отображения пар</p>
            <a class="asidebar-close" onclick="editbarClose();">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <a class="asidebar-help" onclick="open_info_panel('filters');">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <div class="editbar-main">
                <div class="editbar-main-choice" id="EditOrder">
                </div>
                <div class="editbar-main-menu">
                    <a class="editbar-main-menu__button editbar-main-menu__button--accept" onclick="save_settings();">Применить</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--import" onclick="ImportPanelOpen()">Импортировать</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--export" onclick="ExportPanelOpen()">Экспортировать</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--cancel" onclick="load_settings();">Отменить</a>
                    <div class="editbar-main-menu__button editbar-main-menu__button--recommendations">
                        <a>Рекомендации</a>
                        <div class='editbar-main-menu__rec_list' id='rec_list'></div>
                    </div>
                    <a class="editbar-main-menu__button editbar-main-menu__button--clear" onclick="set_clear_styles()">Сбросить</a>
                </div>
            </div>
        </aside>

        <aside class="filterbar hidden" id="Filterbar">
            <p class="filterbar-title">Пользовательские фильтры</p>
            <a class="asidebar-close" onclick="filterbarClose();">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <a class="asidebar-help" onclick="open_info_panel('filters');">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <div class="filterbar-main">
                <div class="filterbar-main-choice" id="Filters_List">
                </div>
            </div>
        </aside>

        <aside class="event_list hidden" id="EventList">
            <div id='help_bg' onclick='document.getElementById("EventList").classList.add("hidden")'>
            </div>
            <div id='event_panel'>
                <div>
                </div>
                <div style='width: 100%; text-align: center'>
                    <button class='event_panel_button-add' onclick='add_event()'>Добавить</button>
                    <br>
                    <button class='event_panel_button' style='float: left' onclick='document.getElementById("invitation_editor").classList.toggle("hidden")'>Изменить приглашение</button>
                    <div class='event_blank hidden' style='margin-top: 40px; text-align: left' id='invitation_editor'>
                        <label>Настройка формы приглашения</label>
                        <textarea style='height: 150px; margin: 5px 0px' onchange='invitation_changed()'></textarea>
                        <br>
                        <button class='event_panel_button' onclick='save_new_invitation(this)'>сохранить изменения</button>
                        <button class='event_panel_button' onclick='set_base_invitation(this)'>базовове приглашение</button>
                        <br>
                        <label>Специальные параметры:</label>
                        <ul>
                            <li><b>{заголовок}</b> - подставляет на это место заголовок события</li>
                            <li><b>{описание}</b> - подставляет описание события</li>
                            <li><b>{дата|формат}</b> - подставляет дату события в указанном формате. Заменяет:</li>
                            <ul>
                                <li>"дд" на день события</li>
                                <li>"день" на день недели события (Понедельник, Вторник и т.д.)</li>
                                <li>"дн" на день недели события в сокращённом формате (пн, вт и т.д.)</li>
                                <li>"мм" на месяц в числовом формате</li>
                                <li>"месяц" на месяц в именительном падеже (январь, февраль и т.д.)</li>
                                <li>"месяца" на месяц в родительном падеже (января, февраля и т.д.)</li>
                                <li>"гггг" на полный год события</li>
                                <li>"гг" на последние 2 цифры года</li>
                            </ul>
                            <li><b>{замещение|если да|если нет}</b> - если поставлена галочка "вместо занятий", подставляет текст из второй колонки ("если да"), иначе из третей ("если нет")</li>
                            <li><b>{занятие}</b> - подставляет выбранный номер занятия (1-7)</li>
                            <li><b>{ссылка}</b> - подставляет ссылку для добавления этого события на сайт расписания другими пользователями</li>
                            <li><b>{удаление}</b> - подставляет, после чего будет удалено событие (или никогда)</li>
                            <li><b>{цвет}</b> - подставляет цвет в формате hex (#rrggbb) события</li>
                            <li><b>{{}</b> - подставляет открывающую фигурную скобку {</li>
                            <li><b>{}}</b> - подставляет закрывающую фигурную скобку }</li>
                            <li><b>$n</b> - подставляет переход на новую строку (например, внутри фигурных скобок)</li>
                        </ul>
                    </div>
                </div>
                <a class="asidebar-close" onclick='document.getElementById("EventList").classList.add("hidden")'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
                </a>
            </div>
        </aside>

        <aside class="compare_panel hidden" id="ComparePanel">
            <p class="compare_panel-title">Сравнение расписания</p>
            <a class="asidebar-close" onclick='switch_comparing()'>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <table id="ComparePanel-table">
                <tbody>
                </tbody>
            </table>
            <div id='ComparePanel-add'>
                <input type='text' placeholder='Введите имя...' id='compare_name_input' onchange='document.getElementById("compare_name_enter").removeAttribute("class")' onkeypress='add_compare_group_by_enter(event.key)'>
                <input type='button' value='добавить' id='compare_name_enter' onclick='main_rasp.compare_to(document.getElementById("compare_name_input").value)'>
            </div>
            <input type='button' value='скопировать ссылку' onclick='main_rasp.clipboard_link()'>
        </aside>

        <aside class='export_panel hidden' id='ExportPanel'>
            <p class="export_panel-title">Экспорт фильтров</p>
            <a class="asidebar-close" onclick='ExportPanelClose()'>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <table id='export_panel-table'>
                <tbody>
                </tbody>
            </table>
            <div>
                <p>Выберите, какие фильтры хотите экспортировать (на прямоугольники тоже можно 
                нажимать). Если хотите экспортировать всё - просто игнорируйте выбор.
                </p>
                <p>
                Точками показаны фильтры чего-либо, что не представлено в 
                открытом сейчас расписании группы/преподавателя. К сожалению, 
                посмотреть их все сразу технически не реализуемо на данный момент.</p>
                <br>
                <button class='event_panel_button' onclick='export_filters()'>Экспорт по коду</button>
                <button class='event_panel_button' onclick='safe_export()'>Экспорт по ссылке</button>
                <br>
                <textarea id='export_textarea' class='hidden'></textarea>
            </div>
        </aside>

        <aside class='import_panel hidden' id='ImportPanel'>
            <p class="import_panel-title">Импорт фильтров</p>
            <a class="asidebar-close" onclick='ImportPanelClose()'>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <div>
                <textarea id='import_textarea' placeholder='Вставьте сюда экспортируемую строку...'></textarea>
                <br>
                <button class='event_panel_button' onclick='import_filters()'>Импортировать</button>
                <button class='event_panel_button' onclick='import_filters(true)'>Импортировать с очисткой</button>
            </div>
        </aside>

        <div id="Group_Rasp"></div>
    </container>
    `
    add_footer(to = document.getElementById('MAIN'), as_block = true)
    add_aside_bars()
}



function generate_simple_rasp_page(group)
{
    document.getElementById("MAIN").innerHTML=`
    <header class="header header--rasp" style="z-index: 3">
        <h1 class="title title--top"><a href="${window.location.pathname}">Расписание<br>ПсковГУ</a></h1>
        <div class="header-main">
            <h2 class="group_name" id="Group_Name">${group.prefix[0]=="преподаватель" ? "Преподаватель" : "Группа"} ${group.name.replace("_", " ")}</h2>
            <div class="header-main-right">
                <div name='menu_content'>
                    <div class="enable_alt_click" onclick="switch_alt_click();" title='Выделять схожие элементы в таблице по нажатию. Аналогично alt + ЛКМ.'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                    </div>
                    <div class="enable_setting_menu" style='position: relative'>
                        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                        <div class="background_of_setting_menu hidden" id='setting_menu'>
                            <div class="setting_menu">
                                <div class="switcher" onclick="Switch('setting_menu');">
                                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-info" onclick="document.getElementById('info_list').classList.toggle('hidden')">
                                    <label>Справка</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                    <div id="info_list" class="hidden">
                                        <div class='info_div' onclick='open_info_panel("rasp_page")'><label>страница расписания - что здесь</label></div>
                                        <div class='info_div' onclick='open_info_panel("filters")'><label>Как настраивать фильтры</label></div>
                                        <div class='info_div' onclick='open_info_panel("print_version")'><label>Версия для печати - что здесь</label></div>
                                        <div class='info_div' onclick='open_info_panel("user_events")'><label>Использование событий</label></div>
                                        <div class='info_div' onclick='open_info_panel("filling_out_form")'><label>Как сообщить об ошибке</label></div>
                                        <div class='info_div' onclick='open_info_panel("full_info_list")'><label>Полный список руководств</label></div>
                                        <div class='info_div' onclick='open_info_panel("last_update")'><label>Обновление ${version}</label></div>
                                    </div>
                                </div>
                                <div class="switcher-favorite" onclick="switch_favorite()">
                                    <label>Добавить в избранное</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-timetrack" onclick="change_tracking_status();">
                                    <label>Отслеживание времени</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-editbar" onclick="Switch_editbar();">
                                    <label>Настроить фильтры</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-mode" onclick="switch_theme_list();">
                                    <label>Выбрать цветовую тему</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                    <div id="theme_list" class="clr_theme_list hidden"></div>
                                </div>
                                <div class="switcher-events" onclick="switch_event_list();">
                                    <label>Настройка событий</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-comparing" onclick="switch_comparing();">
                                    <label>Сравнить расписания</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-print" onclick="open_print_page()">
                                    <label>Распечатать</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-issue_form" onclick="switch_issue_report();">
                                    <label>Сообщить об ошибке</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div id='date_of_last_update'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="header-main-back" href="${group.page_url}">Оригинал</a>
            </div>
        </div>
        <!--div class="switcher-weekbar" onclick="Switch('Weekbar');">
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/></svg>
        </div-->
    </header>

    <container class="rpage">
        <aside class="weekbar hidden" id="Weekbar">
            <p class="weekbar-title">Список недель:</p>
            <div class="weekbar-list" id="Weekbar_List"></div>
        </aside>

        <aside class="editbar hidden" id="Editbar">
            <p class="editbar-title">Настройки отображения пар</p>
            <a class="asidebar-close" onclick="editbarClose();">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <a class="asidebar-help" onclick="open_info_panel('filters');">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <div class="editbar-main">
                <div class="editbar-main-choice" id="EditOrder">
                </div>
                <div class="editbar-main-menu">
                    <a class="editbar-main-menu__button editbar-main-menu__button--accept" onclick="save_settings();">Применить</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--disabled editbar-main-menu__button--import" disabled>Импортировать</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--disabled editbar-main-menu__button--export" disabled>Экспортировать</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--cancel" onclick="load_settings();">Отменить</a>
                    <div class="editbar-main-menu__button editbar-main-menu__button--recommendations">
                        <a>Рекомендации</a>
                        <div class='editbar-main-menu__rec_list' id='rec_list'></div>
                    </div>
                    <a class="editbar-main-menu__button editbar-main-menu__button--clear" onclick="set_clear_styles()">Сбросить</a>
                </div>
            </div>
        </aside>

        <aside class="filterbar hidden" id="Filterbar">
            <p class="filterbar-title">Пользовательские фильтры</p>
            <a class="asidebar-close" onclick="filterbarClose();">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <a class="asidebar-help" onclick="open_info_panel('filters');">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <div class="filterbar-main">
                <div class="filterbar-main-choice" id="Filters_List">
                </div>
            </div>
        </aside>

        <aside class="event_list hidden" id="EventList">
            <div id='help_bg' onclick='document.getElementById("EventList").classList.add("hidden")'>
            </div>
            <div id='event_panel'>
                <div>
                </div>
                <div style='width: 100%; text-align: center'>
                    <button class='event_panel_button-add' onclick='add_event()'>Добавить</button>
                    <br>
                    <button class='event_panel_button' style='float: left' onclick='document.getElementById("invitation_editor").classList.toggle("hidden")'>Изменить приглашение</button>
                    <div class='event_blank hidden' style='margin-top: 40px; text-align: left' id='invitation_editor'>
                        <label>Настройка формы приглашения</label>
                        <textarea style='height: 150px; margin: 5px 0px' onchange='invitation_changed()'></textarea>
                        <label>Специальные параметры:</label>
                        <ul style='margin-bottom: 20px'>
                            <li><b>{заголовок}</b> - подставляет на это место заголовок события</li>
                            <li><b>{описание}</b> - подставляет описание события</li>
                            <li><b>{дата|формат}</b> - подставляет дату события в указанном формате. Заменяет:</li>
                            <ul>
                                <li>"дд" на день события</li>
                                <li>"мм" на месяц в числовом формате</li>
                                <li>"месяц" на месяц в именительном падеже (январь, февраль и т.д.)</li>
                                <li>"месяца" на месяц в родительном падеже (января, февраля и т.д.)</li>
                                <li>"гггг" на полный год события</li>
                                <li>"гг" на последние 2 цифры года</li>
                            </ul>
                            <li><b>{замещение|если да|если нет}</b> - если поставлена галочка "вместо занятий", подставляет текст из второй колонки ("если да"), иначе из третей ("если нет")</li>
                            <li><b>{занятие}</b> - подставляет выбранный номер занятия (1-7)</li>
                            <li><b>{ссылка}</b> - подставляет ссылку для добавления этого события на сайт расписания другими пользователями</li>
                            <li><b>{удаление}</b> - подставляет, после чего будет удалено событие (или никогда)</li>
                            <li><b>{цвет}</b> - подставляет цвет в формате hex (#rrggbb) события</li>
                            <li><b>{{}</b> - подставляет открывающую фигурную скобку {</li>
                            <li><b>{}}</b> - подставляет закрывающую фигурную скобку }</li>
                            <li><b>$n</b> - подставляет переход на новую строку (например, внутри фигурных скобок)</li>
                        </ul>
                        <button class='event_panel_button' onclick='save_new_invitation(this)'>сохранить изменения</button>
                        <button class='event_panel_button' onclick='set_base_invitation(this)'>базовове приглашение</button>
                    </div>
                </div>
                <a class="asidebar-close" onclick='document.getElementById("EventList").classList.add("hidden")'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
                </a>
            </div>
        </aside>

        <aside class="compare_panel hidden" id="ComparePanel">
            <p class="compare_panel-title">Сравнение расписания</p>
            <a class="asidebar-close" onclick='switch_comparing()'>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
            </a>
            <table id="ComparePanel-table">
                <tbody>
                </tbody>
            </table>
            <div id='ComparePanel-add'>
                <input type='text' placeholder='Введите имя...' id='compare_name_input' onchange='document.getElementById("compare_name_enter").removeAttribute("class")'>
                <input type='button' value='добавить' id='compare_name_enter' onclick='main_rasp.compare_to(document.getElementById("compare_name_input").value)'>
            </div>
            <input type='button' value='скопировать ссылку' onclick='main_rasp.clipboard_link()'>
        </aside>

        <table id='Pre_Simple_Group_Rasp'>
            <tbody id="Simple_Group_Rasp">
            </tbody>
        </table>
    </container>
    `
    add_footer(to = document.getElementById('MAIN'), as_block = true)
    add_aside_bars()
}

function generate_groups_list()
{
    document.getElementById("MAIN").innerHTML=`
    <div class="enable_setting_menu" style='position: absolute; top: 6px; right: 6px;'>
        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
        <div class="background_of_setting_menu hidden" id='setting_menu'>
            <div class="setting_menu">
                <div class="switcher" onclick="Switch('setting_menu');">
                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-info" onclick="document.getElementById('info_list').classList.toggle('hidden')">
                    <label>Справка</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                    <div id="info_list" class="hidden">
                        <div class='info_div' onclick='open_info_panel("show_all")'><label>страница "показать всё" - что здесь</label></div>
                        <div class='info_div' onclick='open_info_panel("decryption_show_all")'><label>Как правильно искать (списки)</label></div>
                        <div class='info_div' onclick='open_info_panel("filling_out_form")'><label>Как сообщить об ошибке</label></div>
                        <div class='info_div' onclick='open_info_panel("full_info_list")'><label>Полный список руководств</label></div>
                        <div class='info_div' onclick='open_info_panel("last_update")'><label>Обновление ${version}</label></div>
                    </div>
                </div>
                <div class="switcher-mode" onclick="switch_theme_list();"> 
                    <label>Выбрать цветовую тему</label>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    <div id="theme_list" class="clr_theme_list hidden"></div>
                </div>
                <div class="switcher-issue_form" onclick="switch_issue_report();">
                    <label>Сообщить об ошибке</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
            </div>
        </div>
    </div>
    <h1 class="title title--top"><a href="${window.location.pathname}">Расписание ПсковГУ</a></h1>
    <div id="Lists">
        <div class="possible_list" id="Education_Form">
        </div>
    </div>
    `
    add_aside_bars()
}

function generate_print_preview()
{
    document.getElementById("MAIN").innerHTML=`
    <div id="Printable_Group_Rasp"></div>
    <aside id="print_panel" class="print_aside_form">
        <div class="switcher-print">
            <div class="switcher-print" style='text-align: left' onclick="print()">
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                <label style='margin-left: 0px;'>Печать</label>
            </div>
            <div id='print_switcher' onclick='switch_print_panel(this)'>&#9650;</div>
        </div>
        <div id='PP_content' class='hidden'>
            <div class='PP_subcontent-range'>
                <label>Боковые отступы (мм)</label>
                <div class='padding_setters'>
                    <input id='side_padding_setter-range' type='range'  min="0" max="20" value="5" step="1" onchange='set_table_padding("side", this)' oninput='document.getElementById("side_padding_setter-input").value = this.value'>
                    <input id='side_padding_setter-input' type='number' min="0" max="20" value="5" step="1" onchange='set_table_padding("side", this)'>
                </div>
            </div>
            <div class='PP_subcontent-range'>
                <label>Верхний отступ (мм)</label>
                <div class='padding_setters'>
                    <input id='top_padding_setter-range' type='range'  min="0" max="20" value="5" step="1" onchange='set_table_padding("top", this)' oninput='document.getElementById("top_padding_setter-input").value = this.value'>
                    <input id='top_padding_setter-input' type='number' min="0" max="20" value="5" step="1" onchange='set_table_padding("top", this)'>
                </div>
            </div>
            <div class='PP_subcontent-range'>
                <label>Нижний отступ (мм)</label>
                <div class='padding_setters'>
                    <input id='bottom_padding_setter-range' type='range'  min="0" max="20" value="5" step="1" onchange='set_table_padding("bottom", this)' oninput='document.getElementById("bottom_padding_setter-input").value = this.value'>
                    <input id='bottom_padding_setter-input' type='number' min="0" max="20" value="5" step="1" onchange='set_table_padding("bottom", this)'>
                </div>
            </div>
            <div class='PP_subcontent-input'>
                <label>Размер таблицы (мм):</label>
                <br>
                <input type='number' id='width_of_page'  min='1' value='297' onchange='set_page_width(this)'>
                <label>x</label>
                <input type='number' id='height_of_page' min='1' value='210' onchange='set_page_height(this)'>
                <select id='special_WH_of_page' onchange='set_special_page_size(this)'>
                    <option value='1189x841'>A0</option>
                    <option value='841x594' >A1</option>
                    <option value='594x420' >A2</option>
                    <option value='420x297' >A3</option>
                    <option value='297x210' selected>A4</option>
                    <option value='210x148' >A5</option>
                    <option value='148x105' >A6</option>
                </select>
            </div>
            <div class='PP_subcontent-input'>
                <label>Расписаний в линии:</label>
                <br>
                <input type='number' id='count_on_row' min='1' value='1' onchange='set_inline(this)'>
            </div>
            <div class='PP_subcontent-input'>
                <label>Размер шрифта (pt):</label>
                <br>
                <input type='number' min='1' value='8' id='size_of_font' name='font_size' onchange='set_font_size(this)'>
            </div>
            <div class='PP_subcontent-checkbox' id='light_theme_using'>
                <input type='checkbox' name='use_light_theme' onchange='switch_theme_using(this.checked)' checked>
                <label for='use_light_theme'>Светлая тема</label>
            </div>
            <div class='PP_subcontent-checkbox' id='filters_using'>
                <input type='checkbox' name='use_filters' onchange='switch_filters_using(this.checked)'>
                <label for='use_filters'>Фильтры</label>
            </div>
            <div class='PP_subcontent-checkbox' id='group_name_display'>
                <input type='checkbox' name='display_group_name' onchange='switch_group_name_display(this.checked)' checked>
                <label for='display_group_name'>Принадлежность</label>
            </div>
            <div class='PP_subcontent-days'>
                <label>Отображение дней</label>
                <div id='all_days_displaying'>
                    <div class='day_displaying' active onclick='switch_day_displaying(this)'>пн</div>
                    <div class='day_displaying' active onclick='switch_day_displaying(this)'>вт</div>
                    <div class='day_displaying' active onclick='switch_day_displaying(this)'>ср</div>
                    <div class='day_displaying' active onclick='switch_day_displaying(this)'>чт</div>
                    <div class='day_displaying' active onclick='switch_day_displaying(this)'>пт</div>
                    <div class='day_displaying' active onclick='switch_day_displaying(this)'>сб</div>
                    <div class='day_displaying' active onclick='switch_day_displaying(this)'>вс</div>
                </div>
            </div>
        </div>
        <p id='PP_rec'>Рекомендуем при печати выставить альбомную ориентацию страницы и выключить отображение полей.</p>
    </aside>
    <aside id='aside_warning' class='hidden'>
        <div id='AW_header'></div>
        <div id='AW_content'></div>
        <div id='AW_OK'><button onclick='document.getElementById("aside_warning").classList.add("hidden")'>хорошо</button></div>
    </aside>
    `
}

function generate_new_event_page () {
    document.getElementById("MAIN").innerHTML = `
    <h1 class="new_event_title" id="new_event_page-heading"></h1>
    <div id='event_panel' class='new_event_panel' style='border: none'><div></div></div>
    <div style='width: 100%; text-align: center'>
        <h2 class="new_event_subtitle">При желании, Вы можете отредактировать событие здесь, или сразу перейти на главную страницу</h2>
        <button onclick='open_url(document.location.href.replace(document.location.search, ""))' class='new_event-button_back'>перейти на главную</button>
    </div>
    `
}


function add_aside_bars () {
    document.getElementById("MAIN").innerHTML += `
    <aside id="theme_editor" class="theme_aside_editor hidden">
    </aside>
    <aside id="issue_form" class="aside_form hidden">
    </aside>
    <aside id="aside_warning_list">
    </aside>
    <aside id='help_list' class='hidden'>
        <div id='help_bg' onclick='document.getElementById("help_list").classList.add("hidden")'>
        </div>
        <div id='help_panel'>
        </div>
    </aside>
    `
    dragElement(document.getElementById('theme_editor'))
}

function add_footer (to, as_block = true) {
    to.innerHTML += `
    <footer class="footer" style="${as_block? 'margin-top: 50px' : 'position: absolute; bottom: 0;'}">
        <ul class="footer-list">
            <li>© MrGick, KGlebB, WhiteRain7</li>
            <li><a class="footer-link" href="https://github.com/mrgick/rasp_pskgu">Исходный код сайта</a></li>
            <li><a class="footer-link" href="https://github.com/mrgick/rasp_pskgu/blob/main/LICENSE">MIT лицензия</a></li>
            <li><a class="footer-link" href="https://github.com/mrgick/pskgu_api">API сайта</a></li>
        </ul>

        <div style='border-left: 1px solid var(--color-halftone_text); margin: 10px; opacity: 0.5'></div>

        <ul class="footer-list">
            <li>Ссылки</li>
            <li><a class="footer-link" href="http://rasp.pskgu.ru">Оригинал расписания ПсковГУ</a></li>
            <li><a class="footer-link" href="https://vk.com/pskgu_bot">Группа Вконтакте</a></li>
        </ul>

        <div style='border-left: 1px solid var(--color-halftone_text); margin: 10px; opacity: 0.5'></div>

        <ul class="footer-list">
            <li>Прочее</li>
            <li><a class="footer-link" onclick='open_info_panel()'>Как пользоваться сайтом</a></li>
            <li><a class="footer-link" onclick='open_info_panel("cookies")'>Использование Cookies</a></li>
            <li><a class="footer-link" onclick='open_info_panel("data")'>Сбор данных</a></li>
        </ul>
    </footer>
    `
}
