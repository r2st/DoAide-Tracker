export function StatusDot({ status }) {
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    timeout: 'bg-yellow-500',
    checking: 'bg-gray-500',
  };

  const labels = {
    online: 'Online',
    offline: 'Offline',
    timeout: 'Timeout',
    checking: 'Checking...',
  };

  const colorClass = colors[status] || colors.checking;
  const label = labels[status] || labels.checking;

  return (
    <span className="flex items-center gap-2" title={label}>
      <span
        className={`inline-block w-2.5 h-2.5 rounded-full ${colorClass} ${status === 'online' ? 'animate-pulse' : ''}`}
        data-testid="status-dot"
        role="status"
        aria-label={label}
      />
      <span className="text-xs text-gray-400 hidden sm:inline">{label}</span>
    </span>
  );
}
