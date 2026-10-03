import { RobotLogo } from './components/RobotLogo';
import { SummaryBar } from './components/SummaryBar';
import { ProductTable } from './components/ProductTable';
import { useHealthCheck } from './hooks/useHealthCheck';
import { products } from './data/products';

export default function App() {
  const { healthData, refresh } = useHealthCheck(products, 60000);

  return (
    <div className="min-h-screen bg-dark">
      <header className="border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RobotLogo />
            <div>
              <h1 className="text-xl font-bold text-white">
                DoAide <span className="text-gold">Tracker</span>
              </h1>
              <p className="text-xs text-gray-500">
                Product Adoption Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-gold/10 text-gold rounded-lg text-sm hover:bg-gold/20 transition-colors border border-gold/30"
          >
            Refresh All
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <SummaryBar products={products} healthData={healthData} />
        <div className="bg-dark-card border border-dark-border rounded-xl p-4 sm:p-6">
          <ProductTable products={products} healthData={healthData} />
        </div>
      </main>

      <footer className="border-t border-dark-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-gray-600">
          DoAide Product Adoption Tracker — {products.length} products
          monitored
        </div>
      </footer>
    </div>
  );
}
