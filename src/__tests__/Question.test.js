import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import Question from "../components/Question";

const testQuestion = {
  id: 1,
  prompt: "lorem testum",
  answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
  correctIndex: 0,
};

const noop = () => {};

beforeEach(() => {
  jest.useFakeTimers(); // Mock timers
});

afterEach(() => {
  jest.runOnlyPendingTimers(); // Run any pending timers
  jest.useRealTimers(); // Restore real timers
});

test("creates an interval with setTimeout", () => {
  jest.spyOn(global, 'setTimeout'); // Spy on setTimeout

  render(<Question question={testQuestion} onAnswered={noop} />);

  expect(setTimeout).toHaveBeenCalled(); // Ensure setTimeout was called
});

test("decrements the timer by 1 every second", () => {
  render(<Question question={testQuestion} onAnswered={noop} />);
  
  expect(screen.queryByText(/10 seconds remaining/)).toBeInTheDocument(); // Initial state check

  // Advance the timer by 1 second and check state after
  act(() => {
    jest.advanceTimersByTime(1000); // Advance timers by 1 second
  });

  expect(screen.queryByText(/9 seconds remaining/)).toBeInTheDocument();

  // Advance the timer again and check
  act(() => {
    jest.advanceTimersByTime(1000); // Advance timers by another 1 second
  });

  expect(screen.queryByText(/8 seconds remaining/)).toBeInTheDocument();
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn(); // Mock the onAnswered function

  render(<Question question={testQuestion} onAnswered={onAnswered} />);

  // Fast-forward the timer by 10 seconds
  act(() => {
    jest.advanceTimersByTime(10000); // Simulate 10 seconds passing
  });

  expect(onAnswered).toHaveBeenCalledWith(false); // Ensure onAnswered was called with `false`
});

test("clears the timeout after unmount", () => {
  jest.spyOn(global, 'clearTimeout'); // Spy on clearTimeout

  const { unmount } = render(<Question question={testQuestion} onAnswered={noop} />);

  unmount(); // Unmount the component
  expect(clearTimeout).toHaveBeenCalled(); // Ensure clearTimeout was called
});
