import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useId, useRef, type ReactNode } from "react";

export function OverlayPanel({
  open,
  onOpenChange,
  title,
  description,
  children,
  drawer = false,
  className = "",
  hideTitle = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  drawer?: boolean;
  className?: string;
  hideTitle?: boolean;
}) {
  const returnFocus = useRef<HTMLElement | null>(null);
  const descriptionId = useId();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={typeof document !== "undefined" ? document.getElementById("dovetail-root") : undefined}>
        <Dialog.Overlay className="store-overlay" />
        <Dialog.Content
          className={`${drawer ? "store-drawer" : "store-modal"} ${className}`}
          aria-describedby={description ? descriptionId : undefined}
          onOpenAutoFocus={() => {
            returnFocus.current = document.activeElement as HTMLElement;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const target =
              returnFocus.current?.isConnected &&
              returnFocus.current !== document.body &&
              returnFocus.current !== document.documentElement
                ? returnFocus.current
                : document.getElementById("bag-trigger");
            target?.focus({ preventScroll: true });
          }}
        >
          <div className={`panel-heading ${hideTitle ? "compact-heading" : ""}`}>
            <Dialog.Title className={hideTitle ? "sr-only" : "panel-title"}>{title}</Dialog.Title>
            {description && (
              <Dialog.Description id={descriptionId} className="muted">
                {description}
              </Dialog.Description>
            )}
            <Dialog.Close
              className="icon-button panel-close"
              aria-label={`Close ${title.toLowerCase()}`}
              title="Close"
            >
              <X size={20} />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
