// @ts-ignore
import Vue from "vue";
import {Component} from "nuxt-property-decorator";

@Component
export default class MetricaMixin extends Vue {

  reachGoal(target?: string) {
    // @ts-ignore
    if (typeof window.ym === 'function') {
      if (target) {
        // @ts-ignore
        window.ym(window.ym.a[0][0], 'reachGoal', target);
      }
      // @ts-ignore
      window.ym(window.ym.a[0][0], 'reachGoal', 'lead');
    } else {
      if (target) {
        console.log(target);
      }
      console.log('lead');
      console.log('not exist ym');
    }
  }

  dataLayerPush(event: string, category: string, action: string, addData?: any) {
    let data = {
      event: event,
      eventCategory: category,
      eventAction: action,
      eventLabel : ''
    };
    data = Object.assign(data, addData);

    // @ts-ignore
    if (typeof window.dataLayer === 'object') {
      if (event) {
        // @ts-ignore
        window.dataLayer.push(data)
        console.log(data);

        if (action === 'sent') {
          let data = {
            event: 'event',
            eventCategory: 'event',
            eventAction: 'lead',
            eventLabel : ''
          };

          data = Object.assign(data, addData);

          if (data.eventLabel) {
            data.eventAction = data.eventAction + '-' + data.eventLabel
          }

            // @ts-ignore
          window.dataLayer.push(data)
          console.log(data);
        }
      }
    } else {
      console.log(data);
      console.log('not exist dataLayer');
    }
  }
}
