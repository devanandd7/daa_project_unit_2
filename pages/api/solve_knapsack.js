export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST method is allowed.' });
    }
  
    const { capacity, items } = req.body;
  
    if (typeof capacity !== 'number' || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid input format.' });
    }
  
    const n = items.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  
    // Build DP table
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }
  
    // Backtrack to find selected items
    const selectedItems = [];
    let w = capacity;
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selectedItems.push(items[i - 1]);
        w -= items[i - 1].weight;
      }
    }
  
    return res.status(200).json({
      optimal_value: dp[n][capacity],
      selected_items: selectedItems.reverse()
    });
  }
  