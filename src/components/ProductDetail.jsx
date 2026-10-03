export function ProductDetail({ product, health }) {
  return (
    <div className="bg-dark-card border-t border-dark-border p-6 mx-3 mb-3 rounded-b-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gold mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 mb-4">{product.description}</p>
          <div className="space-y-2 text-sm">
            <InfoRow label="Subdomain" value={product.subdomain} />
            <InfoRow label="Server" value={product.server} />
            <InfoRow
              label="Ports"
              value={
                product.ports.length > 0 ? product.ports.join(', ') : 'N/A'
              }
            />
            <InfoRow label="Category" value={product.category} />
            <InfoRow
              label="Viral Features"
              value={product.viral ? 'Enabled' : 'Disabled'}
            />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">
            Health Status
          </h4>
          <div className="space-y-2 text-sm">
            <InfoRow
              label="Status"
              value={health?.status || 'Checking...'}
            />
            <InfoRow
              label="Response Time"
              value={
                health?.responseTime != null
                  ? `${health.responseTime}ms`
                  : '—'
              }
            />
            <InfoRow
              label="Last Checked"
              value={
                health?.lastChecked
                  ? new Date(health.lastChecked).toLocaleTimeString()
                  : '—'
              }
            />
          </div>
          <div className="flex gap-3 mt-4">
            <a
              href={`https://${product.subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold rounded-lg text-xs hover:bg-gold/20 transition-colors"
            >
              Visit Site
            </a>
            <a
              href={`https://github.com/${product.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs hover:bg-gray-700 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>
      <span className="text-white font-mono text-xs">{value}</span>
    </div>
  );
}
