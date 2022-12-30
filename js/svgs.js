// all SVGs used as background in site
const using_svg = `
.enable_alt_click svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cg%3E%3Crect fill='none' height='24' width='24'/%3E%3Cpath d='M17,5h-2V3h2V5z M15,15v6l2.29-2.29L19.59,21L21,19.59l-2.29-2.29L21,15H15z M19,9h2V7h-2V9z M19,13h2v-2h-2V13z M11,21h2 v-2h-2V21z M7,5h2V3H7V5z M3,17h2v-2H3V17z M5,21v-2H3C3,20.1,3.9,21,5,21z M19,3v2h2C21,3.9,20.1,3,19,3z M11,5h2V3h-2V5z M3,9h2 V7H3V9z M7,21h2v-2H7V21z M3,13h2v-2H3V13z M3,5h2V3C3.9,3,3,3.9,3,5z'/%3E%3C/g%3E%3C/svg%3E");
}
.switcher-info svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'/%3E%3C/svg%3E");
}
.switcher-favorite svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'/%3E%3C/svg%3E");
}
.switcher-favorite--active svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
}
.switcher-editbar svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 20 20' height='36px' viewBox='0 0 20 20' width='36px' fill='%23000000'%3E%3Cg%3E%3Crect fill='none' height='20' width='20'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M10,2c-4.41,0-8,3.59-8,8s3.59,8,8,8c1.1,0,2-0.9,2-2c0-0.49-0.18-0.96-0.51-1.34c-0.24-0.3-0.02-0.66,0.3-0.66h1.42 c2.65,0,4.8-2.15,4.8-4.8C18,5.23,14.41,2,10,2z M13.2,12.5h-1.42c-1.05,0-1.9,0.85-1.9,1.9c0,0.47,0.19,0.92,0.47,1.25 c0.34,0.39,0.02,0.85-0.36,0.85c-3.58,0-6.5-2.92-6.5-6.5S6.42,3.5,10,3.5s6.5,2.56,6.5,5.7C16.5,11.02,15.02,12.5,13.2,12.5z'/%3E%3Ccircle cx='14.5' cy='9.5' r='1.25'/%3E%3Ccircle cx='12' cy='6.5' r='1.25'/%3E%3Ccircle cx='5.5' cy='9.5' r='1.25'/%3E%3Ccircle cx='8' cy='6.5' r='1.25'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.switcher-timetrack svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'/%3E%3C/svg%3E");
}
.switcher-events svg {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='36px' height='36px' viewBox='0 0 36 36' version='1.1'%3E%3Cg id='surface1'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%23000000;fill-opacity:1;' d='M 10.5 20.25 L 10.5 18 L 25.5 18 L 25.5 20.25 Z M 10.5 27 L 10.5 24.75 L 20.960938 24.75 L 20.960938 27 Z M 6.75 33 C 6.148438 33 5.625 32.773438 5.175781 32.324219 C 4.726562 31.875 4.5 31.351562 4.5 30.75 L 4.5 7.5 C 4.5 6.898438 4.726562 6.375 5.175781 5.925781 C 5.625 5.476562 6.148438 5.25 6.75 5.25 L 9.1875 5.25 L 9.1875 3 L 11.625 3 L 11.625 5.25 L 24.375 5.25 L 24.375 3 L 26.8125 3 L 26.8125 5.25 L 29.25 5.25 C 29.851562 5.25 30.375 5.476562 30.824219 5.925781 C 31.273438 6.375 31.5 6.898438 31.5 7.5 L 31.5 30.75 C 31.5 31.351562 31.273438 31.875 30.824219 32.324219 C 30.375 32.773438 29.851562 33 29.25 33 Z M 6.75 30.75 L 29.25 30.75 L 29.25 14.625 L 6.75 14.625 Z M 6.75 12.375 L 29.25 12.375 L 29.25 7.5 L 6.75 7.5 Z M 6.75 12.375 L 6.75 7.5 Z M 6.75 12.375 '/%3E%3C/g%3E%3C/svg%3E%0A");
}
.switcher-print svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z'/%3E%3Ccircle cx='18' cy='11.5' r='1'/%3E%3C/svg%3E");
}
.switcher-issue_form svg {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-4 4v3c0 .22-.03.47-.07.7l-.1.65-.37.65c-.72 1.24-2.04 2-3.46 2s-2.74-.77-3.46-2l-.37-.64-.1-.65C8.03 15.48 8 15.23 8 15v-4c0-.23.03-.48.07-.7l.1-.65.37-.65c.3-.52.72-.97 1.21-1.31l.57-.39.74-.18c.31-.08.63-.12.94-.12.32 0 .63.04.95.12l.68.16.61.42c.5.34.91.78 1.21 1.31l.38.65.1.65c.04.22.07.47.07.69v1zm-6 2h4v2h-4zm0-4h4v2h-4z'/%3E%3C/svg%3E");
}
.switcher-collect_data svg {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='36px' height='36px' viewBox='0 0 36 36' version='1.1'%3E%3Cg id='surface1'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%23000000;fill-opacity:1;' d='M 6.75 31.5 C 6.148438 31.5 5.625 31.273438 5.175781 30.824219 C 4.726562 30.375 4.5 29.851562 4.5 29.25 L 4.5 6.75 C 4.5 6.148438 4.726562 5.625 5.175781 5.175781 C 5.625 4.726562 6.148438 4.5 6.75 4.5 L 29.25 4.5 C 29.851562 4.5 30.375 4.726562 30.824219 5.175781 C 31.273438 5.625 31.5 6.148438 31.5 6.75 L 31.5 29.25 C 31.5 29.851562 31.273438 30.375 30.824219 30.824219 C 30.375 31.273438 29.851562 31.5 29.25 31.5 Z M 6.75 29.25 L 29.25 29.25 L 29.25 6.75 L 6.75 6.75 Z M 15.710938 23.960938 L 26.550781 13.125 L 24.9375 11.511719 L 15.710938 20.738281 L 11.25 16.273438 L 9.636719 17.886719 Z M 6.75 29.25 L 6.75 6.75 Z M 6.75 29.25 '/%3E%3C/g%3E%3C/svg%3E%0A");
}
.switcher-collect_data--rejected svg {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='36px' height='36px' viewBox='0 0 36 36' version='1.1'%3E%3Cg id='surface1'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%23000000;fill-opacity:1;' d='M 12.601562 24.976562 L 18 19.574219 L 23.398438 24.976562 L 24.976562 23.398438 L 19.574219 18 L 24.976562 12.601562 L 23.398438 11.023438 L 18 16.425781 L 12.601562 11.023438 L 11.023438 12.601562 L 16.425781 18 L 11.023438 23.398438 Z M 6.75 29.25 L 29.25 29.25 L 29.25 6.75 L 6.75 6.75 Z M 6.75 31.5 C 6.125 31.5 5.59375 31.28125 5.15625 30.84375 C 4.71875 30.40625 4.5 29.875 4.5 29.25 L 4.5 6.75 C 4.5 6.125 4.71875 5.59375 5.15625 5.15625 C 5.59375 4.71875 6.125 4.5 6.75 4.5 L 29.25 4.5 C 29.875 4.5 30.40625 4.71875 30.84375 5.15625 C 31.28125 5.59375 31.5 6.125 31.5 6.75 L 31.5 29.25 C 31.5 29.875 31.28125 30.40625 30.84375 30.84375 C 30.40625 31.28125 29.875 31.5 29.25 31.5 Z M 6.75 29.25 L 6.75 6.75 Z M 6.75 29.25 '/%3E%3C/g%3E%3C/svg%3E%0A");
}
.switcher-comparing svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36px' height='36px' viewBox='0 0 48 48' %3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:%23000000;fill-opacity:1;' d='M28.3 44v-3H39V19.5H9v11H6V10q0-1.2.9-2.1Q7.8 7 9 7h3.25V4h3.25v3h17V4h3.25v3H39q1.2 0 2.1.9.9.9.9 2.1v31q0 1.2-.9 2.1-.9.9-2.1.9ZM16 47.3l-2.1-2.1 5.65-5.7H2.5v-3h17.05l-5.65-5.7 2.1-2.1 9.3 9.3ZM9 16.5h30V10H9Zm0 0V10v6.5Z'/%3E%3C/svg%3E");
}
.switcher-weekbar svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z'/%3E%3C/svg%3E");
}
.switcher-to_mobile_version svg {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M13 46q-1.2 0-2.1-.9-.9-.9-.9-2.1V5q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v38q0 1.2-.9 2.1-.9.9-2.1.9Zm0-7.5V43h22v-4.5Zm11 3.75q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075 0 .65.425 1.075.425.425 1.075.425ZM13 35.5h22v-26H13Zm0-29h22V5H13Zm0 32V43Zm0-32V5v1.5Z'/%3E%3C/svg%3E");
}

svg[name='special'] {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/%3E%3C/svg%3E");
}
#favorite_list svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'/%3E%3C/svg%3E");
}

.switcher-to_tables_type svg, .switcher-to_list_type svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' width='36px' viewBox='0 0 48 48' style='stroke:none;fill-rule:nonzero;fill:%23000000;fill-opacity:1;' %3E%3Cpath d='m24.1 38 5.7-5.65-5.7-5.65-2.1 2.1 2.15 2.15q-1.4.05-2.725-.45-1.325-.5-2.375-1.55-1-1-1.525-2.3-.525-1.3-.525-2.6 0-.85.225-1.7t.625-1.65l-2.2-2.2q-.85 1.25-1.25 2.65T14 24q0 1.9.75 3.75t2.2 3.3q1.45 1.45 3.25 2.175 1.8.725 3.7.775L22 35.9Zm8.25-8.5q.85-1.25 1.25-2.65T34 24q0-1.9-.725-3.775T31.1 16.9q-1.45-1.45-3.275-2.15t-3.725-.7L26 12.1 23.9 10l-5.7 5.65 5.7 5.65 2.1-2.1-2.2-2.2q1.35 0 2.75.525t2.4 1.525q1 1 1.525 2.3.525 1.3.525 2.6 0 .85-.225 1.7t-.625 1.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z'/%3E%3C/svg%3E");
    background-repeat: no-repeat no-repeat;
    background-position: center center;
    background-size: cover;
}

.asidebar-close {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 0 24 24' width='18px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'/%3E%3C/svg%3E");
}
.asidebar-help {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 0 24 24' width='18px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'/%3E%3C/svg%3E");
}
`
