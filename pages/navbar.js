import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-purple-700 text-white p-4 shadow-md flex flex-col sm:flex-row justify-between items-center">
      <div className="text-2xl font-bold mb-2 sm:mb-0">🎒 Knapsack App</div>
      <div className="space-x-4 text-lg">
        <Link href="/" className="hover:text-yellow-300 transition-colors">Home</Link>
        <Link href="/aboutpage" className="hover:text-yellow-300 transition-colors">About</Link>
        <Link href="/videopage" className="hover:text-yellow-300 transition-colors">Video</Link>
      </div>
    </nav>
  );
}
