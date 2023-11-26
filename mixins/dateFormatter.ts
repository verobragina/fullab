import Vue from "vue";
import {Component, mixins} from "nuxt-property-decorator";

@Component
export default class DateFormatterMixin extends Vue {
  mouths = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  monthsNominative = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ]

  days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

  shortDays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  minutesNominative = ['минут', 'минута', 'минуты', 'минуты', 'минуты', 'минут', 'минут', 'минут', 'минут', 'минут']

  hoursNominative = ['часов', 'час', 'часа', 'часа', 'часа', 'часов', 'часов', 'часов', 'часов', 'часов']

  formatUnderstandableDate(dateObj: Date | string) {
    dateObj = this.dateByString(dateObj);

    let date = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();

    return date + " " + this.getMonthByNumber(month + 1);
  }

  getMonthByNumber(month: number) {
    return this.mouths[month - 1]
  }

  getDayOfWeek(dateObj: Date | string) {
    dateObj = this.dateByString(dateObj);
    return this.days[dateObj.getDay()]
  }

  getShortDayOfWeek(dateObj: Date | string) {
    dateObj = this.dateByString(dateObj);
    return this.shortDays[dateObj.getDay()]
  }

  getDay(dateObj: Date | string) {
    dateObj = this.dateByString(dateObj);
    return dateObj.getDate()
  }

  getHoursStringByNumber(hours: number) {
    if (hours < 10 || hours > 20) {
      return this.hoursNominative[Number(hours.toString().slice(-1))]
    }
    return this.hoursNominative[0]
  }

  getMonthNominativeByNumber(month: number) {
    return this.monthsNominative[month - 1]
  }

  formatUnderstandableDateDotted(dateObj: Date | string) {
    dateObj = this.dateByString(dateObj);

    let date = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();

    return ('0' + date).slice(-2) + "." + ('0' + month).slice(-2) + "." + year;
  }

  formatUnderstandableDateWithYear(dateObj: Date | string) {
    dateObj = this.dateByString(dateObj);

    let date = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();

    return date + " " + this.mouths[month] + ", " + year;
  }

  formatUnderstandableDateTime(dateObj: Date | string) {
    dateObj = this.dateByString(dateObj);

    let date = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    let minutes = "00";
    if (dateObj.getMinutes() < 10) {
      let minutes = "0" + dateObj.getMinutes();
    } else {
      let minutes = dateObj.getMinutes();
    }

    return date + " " + this.mouths[month] + " " + year + " г. " + hours + ":" + minutes;
  }

  formatUnderstandableTime(dateObj: Date | string) {
    dateObj = this.dateByString(dateObj);

    let hours = dateObj.getHours();
    let minutes = "00";
    if (dateObj.getMinutes() < 10) {
      minutes = "0" + dateObj.getMinutes().toString();
    } else {
      minutes = dateObj.getMinutes().toString();
    }

    return hours.toString().padStart(2, "0") + ":" + minutes;
  }

  dateByString(dateObj: Date | string) {
    return this.convertTZ(dateObj)
  }

  convertTZ(date: Date | string, tzString = 'Europe/Moscow') {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
  }

}
