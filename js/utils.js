// Shared utilities for Readora (browser globals)
// Keep this file small and dependency-free so it can be loaded before other scripts.

/**
 * Return a sequential order id persisted in localStorage.
 * Format: ord-<number>, starting at 10001.
 */
function getNextOrderId() {
    const key = 'order_id_counter';
    let counter = parseInt(localStorage.getItem(key), 10);
    if (!counter || isNaN(counter)) counter = 10001;
    localStorage.setItem(key, String(counter + 1));
    return `ord-${counter}`;
}

// Export other small helpers here as needed in future.
