function generate_main_page()
{
    document.getElementById("MAIN").innerHTML=`
    <div class="enable_setting_menu" style='position: absolute; top: 6px; right: 6px;'>
        <svg name='special' onclick="Switch('setting_menu');" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
        <div class="background_of_setting_menu hidden" id='setting_menu'>
            <div class="setting_menu">
                <div class="switcher" onclick="Switch('setting_menu');">
                    <svg name='special' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-info" onclick="">
                    <label style='color: var(--color-additionaly)'>Справка</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-mode" onclick="switch_theme_list();">
                    <div>    
                        <label>Выбрать цветовую тему</label>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    </div>
                    <div id="theme_list" class="clr_theme_list hidden"></div>
                </div>
                <div class="switcher-issue_form" onclick="switch_issue_report();">
                    <label>Сообщить об ошибке</label>
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
            <button class="search-form-button" type="submit">Поиск</button>
        </form>
        <a class="search-showall" href="?list">Показать всё</a>
    </div>
    <footer class="footer">
        <a class="footer-link" href="http://rasp.pskgu.ru">Оригинал расписания</a>
        <div class="footer-authors">© MrGick, KGlebB, WhiteRain7<br>сайт создан используя <a class="footer-authors-link" href="https://github.com/mrgick/pskgu_api">API</a></div>
    </footer>
    <aside id="theme_editor" class="theme_aside_editor hidden">
    </aside>
    <aside id="issue_form" class="aside_form hidden">
    </aside>
    `
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
                <div class="switcher-info" onclick="">
                    <label style='color: var(--color-additionaly)'>Справка</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-mode" onclick="switch_theme_list();">
                    <div>    
                        <label>Выбрать цветовую тему</label>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    </div>
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
    <aside id="theme_editor" class="theme_aside_editor hidden">
    </aside>
    <aside id="issue_form" class="aside_form hidden">
    </aside>
    `
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
                                <div class="switcher-info" onclick="">
                                    <label style='color: var(--color-additionaly)'>Справка</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-favorite" onclick="document.getElementsByClassName('switcher-favorite')[0].classList.toggle('switcher-favorite--active');">
                                    <label style='color: var(--color-additionaly)'>Добавить в избранное</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                                <div class="switcher-timetrack" onclick="change_tracking_status();">
                                    <label>Отслеживание времени</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-editbar" onclick="editbarOpen();">
                                    <label>Настроить фильтры</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                </div>
                                <div class="switcher-mode" onclick="switch_theme_list();">
                                    <div>    
                                        <label>Выбрать цветовую тему</label>
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                                    </div>
                                    <div id="theme_list" class="clr_theme_list hidden"></div>
                                </div>
                                <div class="switcher-issue_form" onclick="switch_issue_report();">
                                    <label>Сообщить об ошибке</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="header-main-back" href="${group.page_url}">Оригинал</a>
            </div>
        </div>
    </header>
    <container class="rpage">
        <div class="switcher-weekbar" onclick="Switch('Weekbar');">
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/></svg>
        </div>
        <aside class="weekbar hidden" id="Weekbar">
            <p class="weekbar-title">Список недель:</p>
            <div class="weekbar-list" id="Weekbar_List"></div>
        </aside>
        <aside class="editbar hidden" id="Editbar">
            <p class="editbar-title">Настройки отображения пар</p>
            <a class="asidebar-close" onclick="editbarClose();">
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
        <a class="asidebar-close" onclick="filterbarClose();">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
        </a>
            <p class="filterbar-title">Пользовательские фильтры</p>
            <div class="filterbar-main">
                <div class="filterbar-main-choice" id="Filters_List">
                </div>
            </div>
        </aside>
        <aside id="issue_form" class="aside_form hidden">
        </aside>
        <aside id="theme_editor" class="theme_aside_editor hidden">
        </aside>
        <div id="Group_Rasp">
        </div>
    </container>
    `
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
                <div class="switcher-info" onclick="">
                    <label style='color: var(--color-additionaly)'>Справка</label>
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
                </div>
                <div class="switcher-mode" onclick="switch_theme_list();">
                    <div>    
                        <label>Выбрать цветовую тему</label>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    </div>
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
    <aside id="theme_editor" class="theme_aside_editor hidden">
    </aside>
    <aside id="issue_form" class="aside_form hidden">
    </aside>
    `
}
