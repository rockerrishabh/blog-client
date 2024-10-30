import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/gh')({
  component: () => <div>Hello /gh!</div>,
})
