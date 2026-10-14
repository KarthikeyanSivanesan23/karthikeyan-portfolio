export function DataState({ error, retry, empty = false }: { error?: string; retry?: () => void; empty?: boolean }) {
  return <div className="data-state" role={error ? 'alert' : 'status'}>
    <span className="eyebrow">{empty ? 'A LITTLE SPACE FOR WHAT’S NEXT' : 'CONNECTION INTERRUPTED'}</span>
    <p>{error || 'New work is being prepared. Check back soon.'}</p>
    {retry && <button className="text-link" onClick={retry}>Try again ↗</button>}
  </div>
}
