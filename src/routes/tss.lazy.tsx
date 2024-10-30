import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/tss')({
  component: () => <div>Hello /tss!</div>,
})
