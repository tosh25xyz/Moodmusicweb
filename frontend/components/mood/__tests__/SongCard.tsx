import { render, screen, fireEvent } from "@testing-library/react";
import { SongCard } from "../SongCard";

describe("SongCard", () => {
  const defaultProps = {
    title: "Test Song",
    artist: "Test Artist",
    thumbnail: "https://placehold.co/64x64",
  };

  it("renders the title and artist", () => {
    render(<SongCard {...defaultProps} onPlay={() => {}} />);
    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("renders the thumbnail image with correct src", () => {
    render(<SongCard {...defaultProps} onPlay={() => {}} />);
    const img = screen.getByAltText("Test Song") as HTMLImageElement;
    expect(img.src).toBe(defaultProps.thumbnail);
  });

  it("calls onPlay when the play button is clicked", () => {
    const handlePlay = jest.fn();
    render(<SongCard {...defaultProps} onPlay={handlePlay} />);
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    expect(handlePlay).toHaveBeenCalledTimes(1);
  });
});