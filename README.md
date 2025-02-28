## **USAGE**
document.addEventListener('DOMContentLoaded', () => {
const notifaya = new Notifaya();

//Show notifications
notifaya.show('This is a success message', 'success', 'fullscreen', true, 5000);
notifier.show('This is a warning message', 'warning', 'top-left');
notifaya.show('This is a danger message', 'danger', 'bottom', false);
notifaya.show('This is an info message', 'info', 'top-left');
notifier.show('This is a primary message', 'primary', 'top-left');


notifaya.show('This is a primary message', 'primary', 'top-right');

});
