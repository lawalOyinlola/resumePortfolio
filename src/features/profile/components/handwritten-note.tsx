import { cn } from "@/lib/utils";

/**
 * A margin annotation in a handwriting font. Positioned absolutely, so the
 * parent must be `relative`. Decorative only: keep it out of the a11y tree.
 */
function HandwrittenNote({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="handwritten-note"
      aria-hidden
      className={cn(
        "pointer-events-none absolute font-handwritten text-xl/none tracking-normal text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  );
}

/** A sketched arrow that points down-left. Rotate or mirror it to aim it. */
function HandwrittenArrow({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      className={cn("size-8 shrink-0 text-muted-foreground", className)}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M34 4c1 15-5 26-21 30" />
      <path d="m22 37-9-3 7.5-8" />
    </svg>
  );
}

export { HandwrittenArrow, HandwrittenNote };
