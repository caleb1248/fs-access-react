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
        overflow: "hidden",
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
