/* Home.css */

.card-img-top {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 0 auto;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
}

.card-img-top:hover {
  transform: rotate(10deg);
}

.card {
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  margin: 20px;
  padding: 20px;
  text-align: center;
}

.card-gainer {
  border-left: 5px solid #28a745; /* Green border for top gainers */
}

.card-loser {
  border-left: 5px solid #dc3545; /* Red border for top losers */
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}

.card-text {
  font-size: 1rem;
  margin: 10px 0;
  color: #555;
}

.crypto-price,
.crypto-market-cap,
.crypto-change {
  font-size: 1rem;
  margin-top: 5px;
}

.crypto-price {
  color: #28a745;
}

.crypto-market-cap {
  color: #007bff;
}

.crypto-change {
  font-weight: bold;
}

.crypto-change.up {
  color: #28a745;
}

.crypto-change.down {
  color: #dc3545;
}

.search-container {
  position: relative;
  margin-bottom: 30px;
  text-align: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px 15px;
  border: 2px solid #ced4da;
  border-radius: 25px;
  font-size: 1.1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.25);
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #007bff;
  cursor: pointer;
  font-size: 1.2rem;
}

.dark-mode {
  background-color: #121212;
  color: #ffffff;
}

.dark-mode .card {
  background: linear-gradient(145deg, #333333, #2a2a2a);
}

.dark-mode .card-title,
.dark-mode .card-text {
  color: #ffffff;
}

.dark-mode .search-input {
  background-color: #333;
  color: #fff;
  border-color: #444;
}

.dark-mode .search-input:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(128, 189, 255, 0.25);
}

.dark-mode .search-icon {
  color: #ced4da;
}

.dark-mode .pagination,
.dark-mode .pagination-item {
  background-color: #333;
  color: #fff;
}

.dark-mode .pagination-item.active {
  background-color: #007bff;
  border-color: #007bff;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dark-mode-toggle {
  margin-right: 15px;
}

.sort-dropdown {
  margin-left: 15px;
}

@media (max-width: 576px) {
  .search-input {
    max-width: 100%;
  }
}
