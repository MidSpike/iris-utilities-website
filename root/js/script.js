$(document).ready(() => {
    $('html').attr('data-theme', localStorage.getItem('theme') ?? 'dark');

    $(document).on('click', '#nav_theme_toggle_button', () => {
        const current_theme_state = $('html').attr('data-theme');
        const new_theme_state = (current_theme_state === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', new_theme_state);
        $('html').attr('data-theme', new_theme_state);
    });

    $(document).on('click', '#nav_menu_button', () => {
        const menu_open_state = $('#nav_menu').attr('data-menu-state');
        $('#nav_menu').attr('data-menu-state', (menu_open_state === 'closed' ? 'opened' : 'closed'));
        $('#nav_menu_button').attr('data-icon', (menu_open_state === 'closed' ? 'times' : 'bars'));
    });

    $(document).on('click', '[data-link-url]', (event) => {
        const link_to_go_to = $(event.currentTarget).attr('data-link-url') || '/';
        const target_to_go_to = $(event.currentTarget).attr('data-link-target') || '_self';
        window.open(link_to_go_to, target_to_go_to);
    });
});
