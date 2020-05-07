import { configure } from '@storybook/react';

configure(require.context('../product', true, /\.stories\.tsx$/), module);
