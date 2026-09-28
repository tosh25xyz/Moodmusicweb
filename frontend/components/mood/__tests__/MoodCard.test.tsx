import { render, screen, fireEvent } from "@testing-library/react";
import { MoodCard } from "../MoodCard";

describe("MoodCard", () => {
  it("renders the emoji and label", () => {
    render(<MoodCard emoji="😊" label="Happy" onClick={() => {}} />);
    expect(screen.getByText("😊")).toBeInTheDocument();
    expect(screen.getByText("Happy")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<MoodCard emoji="😊" label="Happy" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Happy"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies selected styling when selected is true", () => {
    const { container } = render(<MoodCard emoji="😊" label="Happy" selected onClick={() => {}} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("border-primary");
  });
});