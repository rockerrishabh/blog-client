import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/contact")({
  component: ContactComponent,
});

function ContactComponent() {
  return (
    <div className="p-2 text-red-500">
      <h3>Welcome Contact!</h3>
    </div>
  );
}
