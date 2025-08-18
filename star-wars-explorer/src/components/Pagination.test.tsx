import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  it("renders the current page", () => {
    render(
      <Pagination
        page={3}
        hasNext={true}
        hasPrevious={true}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByText(/Page 3/i)).toBeInTheDocument();
  });

  it("disables the Previous button when hasPrevious is false", () => {
    render(
      <Pagination
        page={1}
        hasNext={true}
        hasPrevious={false}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByText(/Previous/i)).toBeDisabled();
    expect(screen.getByText(/Next/i)).not.toBeDisabled();
  });

  it("disables the Next button when hasNext is false", () => {
    render(
      <Pagination
        page={5}
        hasNext={false}
        hasPrevious={true}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByText(/Next/i)).toBeDisabled();
    expect(screen.getByText(/Previous/i)).not.toBeDisabled();
  });

  it("calls onPageChange with the correct page when clicking Previous", () => {
    const mockOnPageChange = vi.fn();
    render(
      <Pagination
        page={2}
        hasNext={true}
        hasPrevious={true}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText(/Previous/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange with the correct page when clicking Next", () => {
    const mockOnPageChange = vi.fn();
    render(
      <Pagination
        page={2}
        hasNext={true}
        hasPrevious={true}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText(/Next/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
