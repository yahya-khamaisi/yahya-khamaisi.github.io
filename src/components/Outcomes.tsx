export function Outcomes({ items }: { items: { value: string; label: string }[] }) {
  return (
    <ul className="outcomes">
      {items.map((o) => (
        <li key={o.label}>
          <b>{o.value}</b>
          <span>{o.label}</span>
        </li>
      ))}
    </ul>
  )
}
