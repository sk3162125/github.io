// Example: Fetch stock data from a free API
async function fetchStockData(symbol) {
    try {
        const response = await fetch(`https://api.example.com/stocks/${symbol}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
}

// Display stock data on page load
document.addEventListener('DOMContentLoaded', async () => {
    const popularStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN'];
    const stockContainer = document.createElement('div');
    stockContainer.className = 'stock-ticker';
    
    for (const stock of popularStocks) {
        const data = await fetchStockData(stock);
        if (data) {
            const stockElement = document.createElement('div');
            stockElement.className = 'stock';
            stockElement.innerHTML = `
                <span class="symbol">${stock}</span>
                <span class="price">$${data.price.toFixed(2)}</span>
                <span class="change ${data.change >= 0 ? 'positive' : 'negative'}">
                    ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${data.changePercent.toFixed(2)}%)
                </span>
            `;
            stockContainer.appendChild(stockElement);
        }
    }
    
    document.querySelector('main').prepend(stockContainer);
});