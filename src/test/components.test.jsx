import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StatusDot } from '../components/StatusDot';
import { SummaryBar } from '../components/SummaryBar';
import { ProductTable } from '../components/ProductTable';
import { ProductDetail } from '../components/ProductDetail';
import { RobotLogo } from '../components/RobotLogo';
import { products } from '../data/products';

describe('StatusDot', () => {
  it('renders online status with green dot', () => {
    render(<StatusDot status="online" />);
    const dot = screen.getByTestId('status-dot');
    expect(dot).toHaveClass('bg-green-500');
  });

  it('renders offline status with red dot', () => {
    render(<StatusDot status="offline" />);
    const dot = screen.getByTestId('status-dot');
    expect(dot).toHaveClass('bg-red-500');
  });

  it('renders timeout status with yellow dot', () => {
    render(<StatusDot status="timeout" />);
    const dot = screen.getByTestId('status-dot');
    expect(dot).toHaveClass('bg-yellow-500');
  });

  it('renders checking status when no status provided', () => {
    render(<StatusDot status={undefined} />);
    const dot = screen.getByTestId('status-dot');
    expect(dot).toHaveClass('bg-gray-500');
  });
});

describe('SummaryBar', () => {
  it('shows total product count', () => {
    render(<SummaryBar products={products} healthData={{}} />);
    const values = screen.getAllByText('21');
    expect(values.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Total Products')).toBeInTheDocument();
  });

  it('shows online count from health data', () => {
    const healthData = {
      desk: { status: 'online' },
      med: { status: 'online' },
      gst: { status: 'offline' },
    };
    render(<SummaryBar products={products} healthData={healthData} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

describe('ProductTable', () => {
  it('renders all products by default', () => {
    render(<ProductTable products={products} healthData={{}} />);
    expect(screen.getByText('DoAide Desk')).toBeInTheDocument();
    expect(screen.getByText('DoAide AutoApply')).toBeInTheDocument();
  });

  it('filters by search input', () => {
    render(<ProductTable products={products} healthData={{}} />);
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'GST' } });
    expect(screen.getByText('DoAide GST')).toBeInTheDocument();
    expect(screen.queryByText('DoAide Desk')).not.toBeInTheDocument();
  });

  it('shows no results message when search matches nothing', () => {
    render(<ProductTable products={products} healthData={{}} />);
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'nonexistent' } });
    expect(
      screen.getByText('No products match your filter.')
    ).toBeInTheDocument();
  });
});

describe('ProductDetail', () => {
  const product = products[0];

  it('renders product name and description', () => {
    render(<ProductDetail product={product} health={null} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });

  it('shows server and subdomain info', () => {
    render(<ProductDetail product={product} health={null} />);
    expect(screen.getByText(product.server)).toBeInTheDocument();
    expect(screen.getByText(product.subdomain)).toBeInTheDocument();
  });
});

describe('RobotLogo', () => {
  it('renders the SVG logo', () => {
    render(<RobotLogo />);
    expect(screen.getByLabelText('DoAide logo')).toBeInTheDocument();
  });
});
