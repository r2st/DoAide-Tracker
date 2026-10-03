export function SummaryBar({ products, healthData }) {
  const totalProducts = products.length;
  const onlineCount = Object.values(healthData).filter(
    (h) => h.status === 'online'
  ).length;
  const viralCount = products.filter((p) => p.viral).length;
  const githubCount = products.length;

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: '📦' },
    { label: 'Online', value: onlineCount, icon: '🟢' },
    { label: 'Viral Features', value: viralCount, icon: '🚀' },
    { label: 'GitHub Repos', value: githubCount, icon: '📂' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-dark-card border border-dark-border rounded-xl p-5 text-center"
        >
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-3xl font-bold text-gold">{stat.value}</div>
          <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
