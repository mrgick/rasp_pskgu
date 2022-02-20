function generate_main_page()
{
    document.getElementById("MAIN").innerHTML=`
    <a class="mode-switcher" onclick="ChangeTheme();"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg></a>
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
    `
}

function generate_search_page(text)
{
    document.getElementById("MAIN").innerHTML=`
    <a class="mode-switcher" onclick="ChangeTheme();"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg></a>
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
}

function generate_rasp_page(group)
{
    document.getElementById("MAIN").innerHTML=`
    <header class="header header--rasp" style="z-index: 3">
        <h1 class="title title--top"><a href="${window.location.pathname}">Расписание<br>ПсковГУ</a></h1>
        <div class="header-main">
            <h2 class="group_name" id="Group_Name">${group.prefix[0]=="преподаватель" ? "Преподаватель" : "Группа"} ${group.name.replace("_", " ")}</h2>
            <div class="header-main-right">
                <div class="switchers">
                    <div class="timetrack-switcher" onclick="change_tracking_status();">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    </div>
                    <div class="editbar-switcher" onclick="editbarOpen();">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    </div>
                    <div class="mode-switcher" onclick="ChangeTheme();">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg>
                    </div>
                </div>
                <a class="header-main-back" href="${group.page_url}">Оригинал</a>
            <div>
        </div>
    </header>
    <container class="rpage">
        <div class="weekbar-switcher" onclick="Switch('Weekbar');">
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/></svg>
        </div>
        <aside class="weekbar weekbar--hidden" id="Weekbar">
            <p class="weekbar-title">Список недель:</p>
            <div class="weekbar-list" id="Weekbar_List"></div>
        </aside>
        <aside class="editbar editbar--hidden" id="Editbar">
            <p class="editbar-title">Настройки отображения пар</p>
            <a class="editbar-close" onclick="editbarClose();">
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
                    <a class="editbar-main-menu__button editbar-main-menu__button--default" onclick="set_default_styles()">По умолчанию</a>
                    <a class="editbar-main-menu__button editbar-main-menu__button--clear" onclick="set_clear_styles()">Сбросить</a>
                </div>
            </div>
        </aside>
        <aside class="filterbar filterbar--hidden" id="Filterbar">
        <a class="filterbar-close" onclick="filterbarClose();">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
        </a>
            <p class="filterbar-title">Пользовательские фильтры</p>
            <div class="filterbar-main">
                <div class="filterbar-main-choice" id="Filters_List">
                </div>
            </div>
        </aside>
        <div id="Group_Rasp">
        </div>
    </container>
    `
}

function generate_groups_list()
{
    document.getElementById("MAIN").innerHTML=`
        <h1 class="title title--top"><a href="${window.location.pathname}">Расписание ПсковГУ</a></h1>
        <a class="mode-switcher" onclick="ChangeTheme();"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg></a>
        <div id="Lists">
            <div class="possible_list" id="Education_Form">
            </div>
        </div>
    `
}
