import React, { useState, useRef, useEffect } from "react";

function noop() {}

interface HorizontalProps {
  minLeft?: number;
  minRight?: number;
  initialLeft?: number;
  initialRight?: number;
  onResize?: () => void;
  children: React.ReactElement[];
}

export function Horizontal(props: HorizontalProps) {
  const {
    initialLeft,
    initialRight,
    minLeft = 0,
    minRight = 0,
    onResize = noop,
    children,
  } = props;
  const currentWidth = useRef(0);
  const [hovering, setHovering] = useState(false);
  const dragging = useRef(false);
  const theContainer = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState([0, 0]);

  useEffect(() => {
    const { width } = theContainer.current?.getBoundingClientRect()!;
    if (initialLeft) {
      setColumns([initialLeft, width - initialLeft]);
    } else if (initialRight) {
      setColumns([width - initialRight, initialRight]);
    } else {
      setColumns([width / 2, width / 2]);
    }
  }, []);

  useEffect(() => {
    currentWidth.current = theContainer.current?.getBoundingClientRect().width!;
    function handleResize() {
      const newWidth = theContainer.current?.getBoundingClientRect().width!;
      if (newWidth > currentWidth.current) {
        setColumns([columns[0], newWidth - columns[0]]);
      } else if (newWidth < currentWidth.current) {
        // Shrink the right
        const newColumns = [columns[0], newWidth - columns[0]];
        // If the right is too small, shrink the left
        if (columns[1] < minRight) {
          columns[1] = minRight;
          columns[0];
        }
        // If the left isn't too small, then update the template columns. Otherwise, overflow
        if (columns[0] < minLeft) {
        }
      }
    }
    const observer = new ResizeObserver(handleResize);
    observer.observe(theContainer.current!);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove: React.MouseEventHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const container = theContainer.current || e.currentTarget;
    if (dragging.current) {
      const { left, right } = container.getBoundingClientRect()!;
      const cursorpos =
        e.clientX < left + minLeft
          ? left + minLeft
          : right - minRight < e.clientX
            ? right - minRight
            : e.clientX;
      const relativeCursorPosition = cursorpos - left;

      setColumns([
        relativeCursorPosition,
        container.clientWidth - relativeCursorPosition,
      ]);

      onResize();
    } else
      setHovering(
        Math.abs(
          e.clientX - container.children[0].getBoundingClientRect().right
        ) < 10
      );
  };

  return (
    <div
      ref={theContainer}
      className="resizable-horizontal"
      draggable={false}
      onMouseMove={handleMouseMove}
      onMouseDown={() => (dragging.current = hovering)}
      onMouseUp={() => (dragging.current = false)}
      style={{
        overflow: "auto",
        cursor: hovering ? "ew-resize" : "default",
        display: "grid",
        gridTemplateColumns: columns.map((c) => c + "px").join(" "),
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
