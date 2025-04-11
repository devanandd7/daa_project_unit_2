import Navbar from "./navbar";

const AboutPage = () => {
    return (
        <>
        <Navbar />
        <div className="p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-white mb-6">About 0/1 Knapsack</h2>
            <p className="text-gray-300 mb-4">
                The 0/1 Knapsack problem is a classic optimization problem in computer science.
                Given a set of items, each with a weight and a value, the goal is to determine
                the subset of items to include in a knapsack so that the total weight is less
                than or equal to a given capacity, and the total value is maximized.
            </p>
            <p className="text-gray-300 mb-4">
                The "0/1" in the name indicates that you either take an entire item or leave it
                entirely; you cannot take a fraction of an item.
            </p>
            <p className="text-gray-300 mb-4">
                This problem has many applications in resource allocation, finance, and cryptography.
            </p>
            <h3 className="text-2xl font-semibold text-white mb-4">Key Concepts:</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
                <li>
                    <span className="font-semibold text-yellow-300">Capacity:</span> The maximum weight the knapsack can hold.
                </li>
                <li>
                    <span className="font-semibold text-yellow-300">Items:</span> A set of objects, each with a name, weight, and value.
                </li>
                <li>
                    <span className="font-semibold text-yellow-300">Optimal Solution:</span> The combination of items that maximizes the total value
                    while respecting the capacity constraint.
                </li>
            </ul>
            <h3 className="text-2xl font-semibold text-white mb-4">Solving the Problem:</h3>
            <p className="text-gray-300 mb-4">
                The 0/1 Knapsack problem is NP-hard, meaning there is no known polynomial-time
                algorithm to solve it exactly for all cases. However, dynamic programming can be
                used to solve it efficiently for moderate-sized inputs.
            </p>
            <p className="text-gray-300 mb-4">
                This application uses a dynamic programming approach to find the optimal solution.
            </p>
            <h3 className="text-2xl font-semibold text-white mb-4">Time Complexity:</h3>
            <p className="text-gray-300 mb-4">
                The time complexity of the dynamic programming solution used here is O(n*C),
                where 'n' is the number of items and 'C' is the knapsack capacity.
            </p>
        </div>
        </>
    );
};
export default AboutPage;