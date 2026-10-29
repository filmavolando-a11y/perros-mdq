'use client'
export default function Sel({ label, value, onChange, options, all }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; all?: boolean
}) {
  return (
    <label className="f">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {all && <option value="">Todos</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}

export function Colores({ value, onChange, options }: { value: string[]; onChange: (v: string[]) => void; options: string[] }) {
  return (
    <div className="chips">
      {options.map((c) => (
        <label key={c} className={value.includes(c) ? 'chip on' : 'chip'}>
          <input type="checkbox" checked={value.includes(c)}
            onChange={() => onChange(value.includes(c) ? value.filter((x) => x !== c) : [...value, c])} />
          {c}
        </label>
      ))}
    </div>
  )
}
