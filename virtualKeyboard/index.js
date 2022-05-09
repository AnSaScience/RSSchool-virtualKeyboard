const keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    textarea: [],
    annotation: null,
  },
  properties: {
    value: '',
    capsLock: false,
    shift: false,
    language: 'eng',
    changelang: '',
  },

  keyLayout: {
    keyDefault: [
      '`',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '-',
      '=',
      'Backspace',
      'Tab',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      '[',
      ']',
      '\\',
      'Del',
      'Caps Lock',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      ';',
      '\'',
      'Enter',
      'Shift',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '/',
      '↑',
      'Shift',
      'Ctrl',
      'Win',
      'Alt',
      'Space',
      'Alt',
      '←',
      '↓',
      '→',
      'Ctrl',
    ],
    keyShifted: [
      '~',
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      '_',
      '+',
      'Backspace',
      'Tab',
      'Q',
      'W',
      'E',
      'R',
      'T',
      'Y',
      'U',
      'I',
      'O',
      'P',
      '{',
      '}',
      '|',
      'Del',
      'Caps Lock',
      'A',
      'S',
      'D',
      'F',
      'G',
      'H',
      'J',
      'K',
      'L',
      ';',
      '\'',
      'Enter',
      'Shift',
      'Z',
      'X',
      'C',
      'V',
      'B',
      'N',
      'M',
      '<',
      '>',
      '?',
      '↑',
      'Shift',
      'Ctrl',
      'Win',
      'Alt',
      'Space',
      'Alt',
      '←',
      '↓',
      '→',
      'Ctrl',
    ],
    keyCode:
     ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
    keyUkrainian:
    ["'", '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї', '\\', 'Del', 'Caps Lock', 'ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl'],
    keyUkrainianShifted:
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ї', '/', 'Del', 'Caps Lock', 'Ф', 'І', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Є', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '←', '↓', '→', 'Ctrl'],
  },

  init() {
    // create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // setup maim elements;
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard-keys');
    this.elements.keysContainer.append(this.createKeys(this.properties.language === 'eng' ? this.keyLayout.keyDefault : this.keyLayout.keyUkrainian));
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard-key');

    // add to DOM
    this.elements.main.append(this.elements.keysContainer);
    document.body.append(this.elements.main);

    // init show of keypress on physical keyboard
    this.showKeyPres();

    // add text area
    keyboard.elements.textarea = document.createElement('textarea');
    const textArea = keyboard.elements.textarea;
    textArea.classList.add('use-keyboard-input');
    keyboard.elements.main.append(textArea);
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
    });

    // init change language
    this.changeLang();
    // add annotation
    this.annotation = document.createElement('div');
    this.annotation.textContent = 'System: Windows; Change language: ctrl + alt';
    keyboard.elements.main.append(this.annotation);
  },

  createKeys(keyLayout) {
    const fragment = document.createDocumentFragment();
    // const keyLayout = this.keyLayout.keyDefault;

    // define left or right shift (1/0)
    let isLeftShift = true;
    let isLeftCtrl = true;

    keyLayout.forEach((key, i) => {
      const keyElement = document.createElement('button');
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard-key');
      keyElement.dataset.keyCode = this.keyLayout.keyCode[i];
      switch (key) {
        case 'Backspace':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.textContent = `${key}`;
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1,
            );
            this.inputText();
          });
          break;
        case 'Del':
          keyElement.textContent = `${key}`;
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1,
            );
            this.inputText();
          });
          break;

        case 'Caps Lock':
          keyElement.classList.add(
            'keyboard-key-capslock',
            'capslock-activatable',
          );
          keyElement.textContent = `${key}`;
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle(
              'capslock-activate',
              this.properties.capsLock,
            );
          });
          break;

        case 'Enter':
          keyElement.classList.add('keyboard-key-enter');
          keyElement.textContent = `${key}`;
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.inputText();
          });
          break;

        case 'Ctrl':
          keyElement.textContent = `${key}`;
          if (isLeftCtrl) {
            keyElement.classList.add('keyboard-key-lctrl');
            isLeftCtrl = !isLeftCtrl;
          } else {
            keyElement.classList.add('keyboard-key-rctrl');
          }
          break;

        case 'Alt':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.textContent = `${key}`;
          break;

        case 'Win':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.textContent = `${key}`;
          break;

        case 'Tab':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.textContent = `${key}`;
          keyElement.style.width = '50px';
          keyElement.addEventListener('click', () => {
            this.properties.value += '   ';
            this.inputText();
          });
          break;

        case 'Space':
          keyElement.classList.add('keyboard-key-space');
          keyElement.textContent = `${key}`;
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.inputText();
          });
          break;

        case 'Shift':
          if (isLeftShift) {
            keyElement.classList.add('keyboard-key-lshift');
            isLeftShift = !isLeftShift;
          } else {
            keyElement.classList.add('keyboard-key-rshift');
          }
          keyElement.textContent = `${key}`;
          keyElement.addEventListener('mousedown', () => {
            this.toggleCapsLock();
            this.toggleShift();
            this.inputText();
            // console.log(Event);
          });
          keyElement.addEventListener('mouseup', () => {
            this.toggleCapsLock();
            this.toggleShift();
            this.inputText();
            // console.log(Event);
          });

          break;

        default:
          keyElement.textContent = key;
          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this.inputText();
          });
          break;
      }
      fragment.append(keyElement);
    });
    return fragment;
  },

  showKeyPres() {
    // declaration of event imitation
    const keyTouchImitation = new Event('click');
    const keyHoldImitation = new Event('mousedown');
    const keyUnholdImitation = new Event('mouseup');

    // event listener for watching physical keyboard
    const eventKeyDown = (event) => {
      const targetKey = this.elements.keys[this.keyLayout.keyCode.indexOf(event.code)];
      if (targetKey) {
        targetKey.classList.add('keyboard-key-active');
        switch (event.code) {
          case 'ShiftLeft': {
            targetKey.dispatchEvent(keyHoldImitation);
            break;
          }
          case 'ShiftRight': {
            targetKey.dispatchEvent(keyHoldImitation);
            break;
          }

          case 'ControlLeft': {
            targetKey.dispatchEvent(keyHoldImitation);
            break;
          }

          case 'ControlRight': {
            targetKey.dispatchEvent(keyHoldImitation);
            break;
          }
          case 'AltLeft': {
            targetKey.dispatchEvent(keyHoldImitation);
            break;
          }

          case 'AltRight': {
            targetKey.dispatchEvent(keyHoldImitation);
            break;
          }
          default:
            targetKey.dispatchEvent(keyTouchImitation);
            break;
        }
        document.removeEventListener('keydown', eventKeyDown);
      }
    };
    document.addEventListener('keydown', eventKeyDown);

    document.addEventListener('keyup', (event) => {
      document.addEventListener('keydown', eventKeyDown);
      const targetKey = this.elements.keys[this.keyLayout.keyCode.indexOf(event.code)];
      if (targetKey) {
        targetKey.classList.remove('keyboard-key-active');
        switch (event.code) {
          case 'ShiftLeft': {
            targetKey.dispatchEvent(keyUnholdImitation);
            break;
          }
          case 'ShiftRight': {
            targetKey.dispatchEvent(keyUnholdImitation);
            break;
          }
          case 'ControlLeft': {
            targetKey.dispatchEvent(keyUnholdImitation);
            break;
          }

          case 'ControlRight': {
            targetKey.dispatchEvent(keyUnholdImitation);
            break;
          }
          case 'AltLeft': {
            targetKey.dispatchEvent(keyUnholdImitation);
            break;
          }

          case 'AltRight': {
            targetKey.dispatchEvent(keyUnholdImitation);
            break;
          }
          default:
            break;
        }
      }
    });
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (
        ![
          'Enter',
          'Del',
          'Shift',
          'Ctrl',
          'Win',
          'Alt',
          'Tab',
          'Caps Lock',
          'Space',
          'Backspace',
          'Del',
        ].includes(key.textContent)
      ) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  toggleShift() {
    this.properties.shift = !this.properties.shift;
    if (this.properties.shift) {
      while (this.elements.keysContainer.childNodes.length > 0) {
        keyboard.elements.keysContainer.removeChild(keyboard.elements.keysContainer.lastChild);
      }
      this.elements.keys = [];
      this.elements.keysContainer.append(this.createKeys(this.properties.language === 'eng' ? this.keyLayout.keyShifted : this.keyLayout.keyUkrainianShifted));
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard-key');
    } else {
      while (this.elements.keysContainer.childNodes.length > 0) {
        keyboard.elements.keysContainer.removeChild(keyboard.elements.keysContainer.lastChild);
      }
      this.elements.keys = [];
      this.elements.keysContainer.append(this.createKeys(this.properties.language === 'eng' ? this.keyLayout.keyDefault : this.keyLayout.keyUkrainian));
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard-key');
    }
  },

  inputText() {
    this.elements.textarea.textContent = this.properties.value;
  },

  changeLang() {
    document.addEventListener('keydown', (target) => {
      if (target.key === 'Alt') {
        keyboard.properties.changelang += 'Alt';
      }
      if (target.key === 'Control') {
        keyboard.properties.changelang += 'Ctrl';
      }
      if (keyboard.properties.changelang.includes('Ctrl')) {
        if (keyboard.properties.changelang.includes('Alt')) {
          // if (this.properties.language === 'eng') {
          //   this.elements.keys.forEach((x, i) => {
          //     x.textContent = this.keyLayout.keyUkrainian[i];
          //   });
          //   this.properties.language = 'ua';
          // } else {
          //   this.elements.keys.forEach((x, i) => {
          //     x.textContent = this.keyLayout.keyDefault[i];
          //   });
          //   this.properties.language = 'eng';
          // }
          while (this.elements.keysContainer.childNodes.length > 0) {
            keyboard.elements.keysContainer.removeChild(keyboard.elements.keysContainer.lastChild);
          }
          this.properties.language = (this.properties.language === 'eng') ? 'ua' : 'eng';
          this.elements.keys = [];
          this.elements.keysContainer.append(this.createKeys(this.properties.language === 'eng' ? this.keyLayout.keyDefault : this.keyLayout.keyUkrainian));
          this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard-key');
        }
      }
    });

    document.addEventListener('keyup', () => {
      const alt = /Alt/g;
      const ctrl = /Ctrl/g;
      this.properties.changelang = this.properties.changelang.replace(alt, '');

      this.properties.changelang = this.properties.changelang.replace(ctrl, '');
    });
  },
};
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
