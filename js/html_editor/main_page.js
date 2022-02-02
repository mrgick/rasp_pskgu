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
    </div>
    <footer class="footer">
        <a class="footer-link" href="http://rasp.pskgu.ru">Оригинал расписания</a>
        <div class="footer-authors">© MrGick, KGlebB, WhiteRain7<br>сайт создан, используя <a class="footer-authors-link" href="https://api-rasp-pskgu.herokuapp.com">API</a></div>
    </footer>
    `
}

function generate_search_page()
{
    document.getElementById("MAIN").innerHTML=`
    <a class="mode-switcher" onclick="ChangeTheme();"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg></a>
    <header class="header">
        <h1 class="title title--top"><a href="${window.location.pathname}">Расписание<br>ПсковГУ</a></h1>
        <div class="search search--top" id="Search_Group">
            <form class="search-form">
                <input class="search-form-input" name="find_group_name" type="search" autocomplete="off" placeholder="группа/преподаватель" />
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
    <header class="header header--rasp">
        <h1 class="title title--top"><a href="${window.location.pathname}">Расписание<br>ПсковГУ</a></h1>
        <div class="header-main">
            <h2 class="group_name" id="Group_Name">${group.prefix[1]=="groups" ? "Группа" : "Преподаватель"} ${group.name}</h2>
            <div class="header-main-right">
                <a class="mode-switcher" onclick="ChangeTheme();"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px"></svg></a>
                <a class="header-main-back" href="${group.page_url}">Оригинал</a>
            <div>
        </div>
    </header>
    <container>
        <div id="Group_Rasp">
        </div>
    </container>
    `
}