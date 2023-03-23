import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import { Page } from './Page';

const meta: Meta<typeof Page> = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof Page>;

export const LoggedOut: Story = {};

LoggedOut.parameters = {
  gridOverlay: {
    gutter: '20px',
    color: 'rgba(32, 32, 32, 0.15)'
  }
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('button', {
      name: /Log in/i
    });
    await userEvent.click(loginButton);
  }
};

LoggedIn.parameters = {
  gridOverlay: {
    gutter: '20px',
    color: 'rgba(32, 32, 32, 0.15)'
  }
};
