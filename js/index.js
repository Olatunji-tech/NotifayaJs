class Notifaya {
  constructor() {
    this.initStyles();
  }

  initStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      .notifier {
        position: fixed;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-family: Arial, sans-serif;
        color: #fff;
        display: none;
        opacity: 0;
        transition: opacity 0.5s, transform 0.5s;
      }
      .notifier.fullscreen {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5) !important;
      }

      .notifier.fullscreen .message{
        display: block;
        background: #fff;
        padding:3rem;
        min-width: 80%;
        box-shadow: 0px 0px 45px rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 50% !important;
        left: 10%;
        color: #000;
        text-align: center;
      }

      .notifier.top-left {
        top: 100px !important;
        left: 20px;
        transform: translateX(-100%);
        animation: slideInFromLeft 0.5s forwards;
      }

      .notifier.top-right {
        top: 100px !important;
        right: 10px;
        transform: translateX(-100%);
        animation: slideInFromRight 0.5s forwards;
      }

      .notifier.bottom {
        bottom: 20px;
        left: 50%;
        transform: translateY(100%);
        animation: slideInFromBottom 0.5s forwards;
      }
      .notifier .close-btn {
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
        font-size: 18px;
      }
      .notifier.success { background: #28a745; }
      .notifier.warning { background: #ffc107; }
      .notifier.danger { background: #dc3545; }
      .notifier.info { background: #17a2b8; }
      .notifier.primary { background: #007bff; }

      @keyframes slideInFromLeft {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
      }

       @keyframes slideInFromRight {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
      
      @keyframes slideInFromBottom {
        0% { transform: translateY(100%); }
        100% { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  show(message, type = 'info', position = 'top-left', autoClose = true, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notifier ${type} ${position}`;
    notification.innerHTML = `
      <span class="message">${message}</span>
      <span class="close-btn">&times;</span>
    `;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.style.display = 'block';
      requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
      });
    });

    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      this.close(notification);
    });

    if (autoClose) {
      setTimeout(() => {
        this.close(notification);
      }, duration);
    }
  }

  close(notification) {
    notification.style.opacity = '0';
    notification.style.transform = notification.classList.contains('bottom') ? 'translateY(100%)' : 'translateX(-100%)';
    notification.addEventListener('transitionend', () => {
      notification.remove();
    }, { once: true });
  }
}

// document.addEventListener('DOMContentLoaded', () => {
//   const notifaya = new Notifaya();

//   // Show notifications
//   notifaya.show('This is a success message', 'success', 'fullscreen', true, 5000);
//  // notifier.show('This is a warning message', 'warning', 'top-left');
//  notifaya.show('This is a danger message', 'danger', 'bottom', false);
//  notifaya.show('This is an info message', 'info', 'top-left');
//  // notifier.show('This is a primary message', 'primary', 'top-left');


//  notifaya.show('This is a primary message', 'primary', 'top-right');

// });
