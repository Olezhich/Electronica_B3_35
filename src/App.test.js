import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Integration Tests', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    render(<App />);
  });

  test('should turn on calculator, press digit "1", and update SymbolStr', async () => {
    // Вспомогательный элемент для тестирования SymbolStr
    expect(screen.getByTestId('display')).toHaveTextContent('');

    const powerButton = screen.getByTestId('power-sw');
    await user.click(powerButton);

    const b_1 = screen.getByTestId('1');
    await user.click(b_1);

    await waitFor(() => {
      expect(screen.getByTestId('display')).toHaveTextContent('1');
    });
  });
});