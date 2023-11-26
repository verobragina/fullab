import BaseSvg from '~/components/base/svg/BaseSvg.vue'
import { Meta, StoryFn } from '@storybook/vue'

export default {
  title: 'BaseSvg',
  component: BaseSvg,
} as Meta<typeof BaseSvg>;

export const Primary: StoryFn<typeof BaseSvg> = () => ({
  components: { BaseSvg },
  template: '<BaseSvg icon="heart"/>',
});
