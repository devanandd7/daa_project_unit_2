import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './navbar';

export default function Home() {
  const [capacity, setCapacity] = useState('');
  const [items, setItems] = useState([{ name: '', weight: '', value: '' }]);
  const [result, setResult] = useState(null);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', weight: '', value: '' }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const solveKnapsack = async () => {
    const validItems = items.filter(item => item.name && item.weight && item.value);

    if (!capacity || validItems.length === 0) {
      alert('Please enter a valid capacity and at least one item.');
      return;
    }

    try {
      const response = await fetch('/api/solve_knapsack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          capacity: parseInt(capacity),
          items: validItems.map(item => ({
            name: item.name,
            weight: parseInt(item.weight),
            value: parseInt(item.value)
          }))
        })
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'An error occurred.');
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert('Failed to fetch result from the server.');
      console.error(err);
    }
  };

  return (
    <>
    <Navbar />
    <motion.div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen font-sans p-6 sm:p-10 md:p-12 lg:p-16 text-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.h1 className="text-3xl sm:text-4xl font-bold text-purple-700 text-center mb-10 drop-shadow-lg" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        🎒 0/1 Knapsack Solver
      </motion.h1>

      <motion.div className="bg-white rounded-2xl shadow-xl p-6 mb-10 max-w-3xl mx-auto" whileHover={{ scale: 1.02 }}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Knapsack Capacity</h2>
        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} min="1"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-purple-400 focus:outline-none" />
      </motion.div>

      <motion.div className="bg-white rounded-2xl shadow-xl p-6 mb-10 max-w-3xl mx-auto" whileHover={{ scale: 1.02 }}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Items</h2>
        {items.map((item, index) => (
          <motion.div key={index} className="flex flex-col sm:flex-row gap-4 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <input type="text" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} placeholder="Item Name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow focus:ring-purple-400 focus:outline-none" />
            <input type="number" value={item.weight} onChange={(e) => handleItemChange(index, 'weight', e.target.value)} placeholder="Weight" min="0"
              className="w-28 px-4 py-2 border border-gray-300 rounded-lg shadow focus:ring-purple-400 focus:outline-none" />
            <input type="number" value={item.value} onChange={(e) => handleItemChange(index, 'value', e.target.value)} placeholder="Value" min="0"
              className="w-28 px-4 py-2 border border-gray-300 rounded-lg shadow focus:ring-purple-400 focus:outline-none" />
            <button onClick={() => removeItem(index)} className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-transform hover:scale-105">
              Remove
            </button>
          </motion.div>
        ))}
        <button onClick={addItem} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-transform hover:scale-105">
          ➕ Add Item
        </button>
      </motion.div>

      <div className="flex justify-center mb-10">
        <motion.button onClick={solveKnapsack} whileTap={{ scale: 0.95 }} className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg transition-transform hover:scale-105">
          🚀 Solve Knapsack
        </motion.button>
      </div>

      {result && (
        <motion.div id="results" className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
          <p className="text-2xl text-green-600 mb-4">Optimal Value: <span className="font-bold">{result.optimal_value}</span></p>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Items:</h3>
          <ul className="list-disc list-inside">
            {result.selected_items.map((item, index) => (
              <li key={index} className="py-1 text-gray-700"><strong>{item.name}</strong> (Weight: {item.weight}, Value: {item.value})</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
    </>
  );
}