const rec_themes = {
    'light': {
        'text': 'светлый',
        'svg': `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 20 20' height='36px' viewBox='0 0 20 20' width='36px' fill='%23000000'%3E%3Crect fill='none' height='20' width='20'/%3E%3Cpath d='M10,7.5c1.38,0,2.5,1.12,2.5,2.5s-1.12,2.5-2.5,2.5S7.5,11.38,7.5,10S8.62,7.5,10,7.5z M10,6c-2.21,0-4,1.79-4,4s1.79,4,4,4 s4-1.79,4-4S12.21,6,10,6L10,6z M3.75,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2C1.34,9.25,1,9.59,1,10 s0.34,0.75,0.75,0.75H3.75z M18.25,10.75c0.41,0,0.75-0.34,0.75-0.75c0-0.41-0.34-0.75-0.75-0.75h-2c-0.41,0-0.75,0.34-0.75,0.75 s0.34,0.75,0.75,0.75H18.25z M9.25,3.75C9.25,4.16,9.59,4.5,10,4.5c0.41,0,0.75-0.34,0.75-0.75v-2C10.75,1.34,10.41,1,10,1 S9.25,1.34,9.25,1.75V3.75z M13.89,5.05c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06c0.29-0.29,0.29-0.77,0-1.06 c-0.29-0.29-0.77-0.29-1.06,0L13.89,5.05z M3.99,14.95c-0.29,0.29-0.29,0.77,0,1.06s0.77,0.29,1.06,0l1.06-1.06 c0.29-0.29,0.29-0.77,0-1.06c-0.29-0.29-0.77-0.29-1.06,0L3.99,14.95z M5.05,6.11c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 L5.05,3.99c-0.29-0.29-0.77-0.29-1.06,0s-0.29,0.77,0,1.06L5.05,6.11z M14.95,16.01c0.29,0.29,0.77,0.29,1.06,0s0.29-0.77,0-1.06 l-1.06-1.06c-0.29-0.29-0.77-0.29-1.06,0c-0.29,0.29-0.29,0.77,0,1.06L14.95,16.01z M9.25,18.25C9.25,18.66,9.59,19,10,19 c0.41,0,0.75-0.34,0.75-0.75v-2c0-0.41-0.34-0.75-0.75-0.75s-0.75,0.34-0.75,0.75V18.25z'/%3E%3C/svg%3E");`,
        'vars': {
            '--color-background'   : '#FFFFFF',
            '--color-additionaly'  : '#DDDDDD',
            '--color-light'        : '#EEEEEE',
            '--color-hover_1'      : '#DDDDDD',
            '--color-hover_2'      : '#CCCCCC',

            '--color-text'         : '#000000',
            '--color-halftone_text': '#888888',
            '--color-header_text'  : '#FFFFFF', 
                
            '--color-link'         : '#000066',
            '--color-link_hover'   : '#006699',
            '--color-error'        : '#CC0000',

            '--color-special'      : '#006488',
            '--color-special_hover': '#00516e',

            '--color-unchoiced'    : '#EEEEFF',
            '--color-time_tracking': '#AAEEDD',
        }
    },
    'pink': { 
        'text': 'розовый',
        'svg': `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M18.7 12.4c-.28-.16-.57-.29-.86-.4.29-.11.58-.24.86-.4 1.92-1.11 2.99-3.12 3-5.19-1.79-1.03-4.07-1.11-6 0-.28.16-.54.35-.78.54.05-.31.08-.63.08-.95 0-2.22-1.21-4.15-3-5.19C10.21 1.85 9 3.78 9 6c0 .32.03.64.08.95-.24-.2-.5-.39-.78-.55-1.92-1.11-4.2-1.03-6 0 0 2.07 1.07 4.08 3 5.19.28.16.57.29.86.4-.29.11-.58.24-.86.4-1.92 1.11-2.99 3.12-3 5.19 1.79 1.03 4.07 1.11 6 0 .28-.16.54-.35.78-.54-.05.32-.08.64-.08.96 0 2.22 1.21 4.15 3 5.19 1.79-1.04 3-2.97 3-5.19 0-.32-.03-.64-.08-.95.24.2.5.38.78.54 1.92 1.11 4.2 1.03 6 0-.01-2.07-1.08-4.08-3-5.19zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/svg%3E");`,
        'vars': {
            '--color-background'   : '#FFEEEE',
            '--color-additionaly'  : '#DDBBCC',
            '--color-light'        : '#EEDDDD',
            '--color-hover_1'      : '#EEBBDD',
            '--color-hover_2'      : '#BB99EE',

            '--color-text'         : '#550000',
            '--color-halftone_text': '#998888',
            '--color-header_text'  : '#FFFFFF', 
                
            '--color-link'         : '#BB33EE',
            '--color-link_hover'   : '#FF66EE',
            '--color-error'        : '#EE6699',

            '--color-special'      : '#7733AA',
            '--color-special_hover': '#BB5599',

            '--color-unchoiced'    : '#EECCEE',
            '--color-time_tracking': '#EE99AA',
        }
    },
    'darkest': {
        'text': 'чёрный + зелёный',
        'svg': `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cg%3E%3Crect fill='none' height='24' width='24'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M15.5,22c1.05,0,2.05-0.16,3-0.46c-4.06-1.27-7-5.06-7-9.54s2.94-8.27,7-9.54C17.55,2.16,16.55,2,15.5,2 c-5.52,0-10,4.48-10,10S9.98,22,15.5,22L15.5,22z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`,
        'vars': {
            '--color-background'   : '#000000',
            '--color-additionaly'  : '#444444',
            '--color-light'        : '#333333',
            '--color-hover_1'      : '#33443F',
            '--color-hover_2'      : '#557766',

            '--color-text'         : '#DDDDDD',
            '--color-halftone_text': '#999999',
            '--color-header_text'  : '#DDDDDD', 
                
            '--color-link'         : '#22DD22',
            '--color-link_hover'   : '#44EE44',
            '--color-error'        : '#EE7766',

            '--color-special'      : '#448833',
            '--color-special_hover': '#116622',

            '--color-unchoiced'    : '#74806B',
            '--color-time_tracking': '#559977',
        }
    },
    'dark': {
        'text': 'тёмный + синий',
        'svg': `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 20 20' height='36px' viewBox='0 0 20 20' width='36px' fill='%23000000'%3E%3Crect fill='none' height='20' width='20'/%3E%3Cpath d='M8.04,4.86C7.88,5.39,7.8,5.94,7.8,6.5c0,3.14,2.56,5.7,5.7,5.7c0.56,0,1.11-0.08,1.64-0.24c-0.79,2.07-2.8,3.54-5.14,3.54 c-3.03,0-5.5-2.47-5.5-5.5C4.5,7.66,5.97,5.65,8.04,4.86z M10,3c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7 c0-0.36-0.03-0.72-0.08-1.06C16.16,10,14.91,10.7,13.5,10.7c-2.32,0-4.2-1.88-4.2-4.2c0-1.41,0.7-2.66,1.76-3.42 C10.72,3.03,10.36,3,10,3L10,3z'/%3E%3C/svg%3E");`,
        'vars': {
            '--color-background'   : '#222222',
            '--color-additionaly'  : '#555555',
            '--color-light'        : '#333333',
            '--color-hover_1'      : '#444455',
            '--color-hover_2'      : '#666677',

            '--color-text'         : '#DDDDDD',
            '--color-halftone_text': '#999999',
            '--color-header_text'  : '#DDDDDD', 
                
            '--color-link'         : '#0088DD',
            '--color-link_hover'   : '#0099EE',
            '--color-error'        : '#EE7766',

            '--color-special'      : '#085C86',
            '--color-special_hover': '#044C76',

            '--color-unchoiced'    : '#556677',
            '--color-time_tracking': '#7788BB',
        }
    },
    'custom': {
        'text': 'пользовательский',
        'svg': `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/%3E%3C/svg%3E");`,
        'vars': {
            '--color-background'   : '#FFFFFF',
            '--color-additionaly'  : '#DDDDDD',
            '--color-light'        : '#EEEEEE',
            '--color-hover_1'      : '#DDDDDD',
            '--color-hover_2'      : '#CCCCCC',

            '--color-text'         : '#000000',
            '--color-halftone_text': '#888888',
            '--color-header_text'  : '#FFFFFF', 
                
            '--color-link'         : '#000066',
            '--color-link_hover'   : '#006699',
            '--color-error'        : '#CC0000',

            '--color-special'      : '#006488',
            '--color-special_hover': '#00516e',

            '--color-unchoiced'    : '#EEEEFF',
            '--color-time_tracking': '#AAEEDD'
        }
    }
}

let property_text = {
    '--color-background'   : 'Задний фон',
    '--color-additionaly'  : 'Дополнительный цвет',
    '--color-light'        : 'Близкий к заднему фону',
    '--color-hover_1'      : 'Выделение 1',
    '--color-hover_2'      : 'Выделение 2',

    '--color-text'         : 'Текст',
    '--color-halftone_text': 'Полутоновый текст',
    '--color-header_text'  : 'Текст заголовка окон', 
        
    '--color-link'         : 'Ссылки',
    '--color-link_hover'   : 'Ссылки при наведении',
    '--color-error'        : 'Предупреждение',

    '--color-special'      : 'Особый',
    '--color-special_hover': 'Особый при наведении',

    '--color-unchoiced'    : 'Невыбранный ("показать всё")',
    '--color-time_tracking': 'Цвет отслеживания времени'
}

let using_svg = `
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

svg[name='special'] {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'/%3E%3C/svg%3E");
}

#favorite_list svg {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'/%3E%3C/svg%3E");
}

.asidebar-close {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 0 24 24' width='18px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'/%3E%3C/svg%3E");
}
.asidebar-help {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 0 24 24' width='18px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'/%3E%3C/svg%3E");
}
`

let MODE = ''
let settings = readCookie("mode")
if (settings) MODE = settings.split('|')[0];
else MODE = 'light'
if (!rec_themes[MODE]) MODE = 'light'

let custom_theme = readCookie('custom_theme')
if (custom_theme) {
    settings = custom_theme.split('|')
    for (set of settings) rec_themes['custom']['vars'][set.split(':')[0]] = set.split(':')[1]
}

let style = document.createElement('style')
style.setAttribute('type', 'text/css')
style.setAttribute('id', 'style_svgs')
document.getElementsByTagName('head')[0].appendChild(style)

// should be deleted
custom_theme = undefined
settings = undefined
style = undefined

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
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px"></svg>
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

function fill_theme_editor () {
    let theme_editor = document.getElementById('theme_editor')
    theme_editor.innerHTML = `
    <div id='TE_header'>
        <p>Настройки темы</p>
        <a class="asidebar-close" onclick="close_theme_editor();">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px"></svg>
        </a>
    </div>
    `

    let div = document.createElement('div')
    div.setAttribute('id', 'TE_content')
    for (property in rec_themes['custom']['vars']) {
        if (!property_text[property]) {
            delete rec_themes['custom']['vars'][property]
            continue
        }
        let row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <label>${property_text[property]}</label>
        </td>
        <td>
            <input type='color' value='${rec_themes['custom']['vars'][property]}' onchange='set_theme_property("${property}", this)'>
        </td>
        `
        div.appendChild(row)
    }
    theme_editor.appendChild(div)

    div = document.createElement('div')
    div.setAttribute('id', 'TE_set_base')

    let button = document.createElement('button')
    button.setAttribute('onclick', 'set_custom_as_base_theme()')
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
    fill_theme_editor()
    update_svgs()
}

function save_custom_theme () {
    let cookie_text = ''
    for (property in rec_themes['custom']['vars']) {
        cookie_text += property + ':' + rec_themes['custom']['vars'][property] + '|'
    }
    createCookie('custom_theme', cookie_text.slice(0, -1), 180)
}
