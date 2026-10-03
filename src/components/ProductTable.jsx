import { useState } from 'react';
import { StatusDot } from './StatusDot';
import { ProductDetail } from './ProductDetail';

export function ProductTable({ products, healthData }) {
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) => {
    if (filter === 'viral' && !p.viral) return false;
    if (filter === 'core' && p.category !== 'Core') return false;
    if (filter === 'new' && p.category !== 'New') return false;
    if (filter === 'online' && healthData[p.id]?.status !== 'online')
      return false;
    if (filter === 'offline' && healthData[p.id]?.status === 'online')
      return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold flex-1"
          aria-label="Search products"
        />
        <div className="flex gap-2 flex-wrap">
          {['all', 'viral', 'core', 'new', 'online', 'offline'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-gold text-dark'
                  : 'bg-dark-card text-gray-400 border border-dark-border hover:border-gold'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-dark-border text-gray-400 text-left">
              <th className="py-3 px-3 font-medium">Status</th>
              <th className="py-3 px-3 font-medium">Product</th>
              <th className="py-3 px-3 font-medium hidden md:table-cell">
                Response
              </th>
              <th className="py-3 px-3 font-medium hidden sm:table-cell">
                Category
              </th>
              <th className="py-3 px-3 font-medium hidden sm:table-cell">
                Viral
              </th>
              <th className="py-3 px-3 font-medium hidden lg:table-cell">
                Server
              </th>
              <th className="py-3 px-3 font-medium">Links</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const health = healthData[product.id];
              const isExpanded = expandedId === product.id;
              return (
                <ProductRow
                  key={product.id}
                  product={product}
                  health={health}
                  isExpanded={isExpanded}
                  onToggle={() =>
                    setExpandedId(isExpanded ? null : product.id)
                  }
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No products match your filter.
        </div>
      )}
    </div>
  );
}

function ProductRow({ product, health, isExpanded, onToggle }) {
  return (
    <>
      <tr
        className="border-b border-dark-border hover:bg-dark-card cursor-pointer transition-colors"
        onClick={onToggle}
        role="row"
      >
        <td className="py-3 px-3">
          <StatusDot status={health?.status} />
        </td>
        <td className="py-3 px-3">
          <a
            href={`https://${product.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gold transition-colors font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {product.name}
          </a>
          <div className="text-xs text-gray-500">{product.subdomain}</div>
        </td>
        <td className="py-3 px-3 hidden md:table-cell">
          {health?.responseTime != null ? (
            <span
              className={`text-xs font-mono ${health.responseTime < 500 ? 'text-green-400' : health.responseTime < 1500 ? 'text-yellow-400' : 'text-red-400'}`}
            >
              {health.responseTime}ms
            </span>
          ) : (
            <span className="text-xs text-gray-600">—</span>
          )}
        </td>
        <td className="py-3 px-3 hidden sm:table-cell">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${product.category === 'Core' ? 'bg-blue-900/50 text-blue-400' : 'bg-purple-900/50 text-purple-400'}`}
          >
            {product.category}
          </span>
        </td>
        <td className="py-3 px-3 hidden sm:table-cell">
          {product.viral ? (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold">
              Yes
            </span>
          ) : (
            <span className="text-xs text-gray-600">No</span>
          )}
        </td>
        <td className="py-3 px-3 hidden lg:table-cell">
          <span className="text-xs font-mono text-gray-400">
            {product.server}
          </span>
        </td>
        <td className="py-3 px-3">
          <div
            className="flex gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={`https://${product.subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors"
              title="Visit site"
            >
              <LinkIcon />
            </a>
            <a
              href={`https://github.com/${product.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold transition-colors"
              title="GitHub repo"
            >
              <GithubIcon />
            </a>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="7" className="p-0">
            <ProductDetail product={product} health={health} />
          </td>
        </tr>
      )}
    </>
  );
}

function LinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
