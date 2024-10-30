import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pts")({
  component: () => <div>Hello /pts!</div>,
});
