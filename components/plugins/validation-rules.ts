import {extend, localize} from 'vee-validate'

// @ts-ignore
import ru from 'vee-validate/dist/locale/ru.json'
// @ts-ignore
import en from 'vee-validate/dist/locale/en.json'
import {email, max, max_value, min, min_value, numeric, required, regex, confirmed} from 'vee-validate/dist/rules'

localize({
  ru: {
    messages: {
      ...ru.messages,
      required: 'Не заполнено поле',
      email: 'Некорректный адрес',
      checked: 'Не отмечено',
      regex: 'Некорректный формат',
      confirmed: 'Пароли не совпадают'
    }
  },
  en: {
    messages: {
      ...en.messages,
      required: 'required',
      email: 'incorrect email',
      checked: "required",
      regex: 'incorrect format'
    }
  }
})

localize('ru')

extend('required', required)
extend('checked', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('min_value', min_value)
extend('max_value', max_value)
extend('numeric', numeric)
extend('regex', regex)
extend('confirmed', confirmed)
extend('phone', value => {
  if (value.match(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/)) {
    return true;
  }

  return 'Неверный формат';
})
