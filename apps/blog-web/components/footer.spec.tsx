import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-06-15'));
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after each test
  });

  it('should render correctly', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
