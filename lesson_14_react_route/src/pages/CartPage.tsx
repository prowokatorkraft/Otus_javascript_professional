import React from "react";
import { Link } from 'react-router';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Cart from "../components/Cart";
import styles from "../styles/App.module.css";

const CartPage: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <div className={styles.pageContainer}>
      {items.length === 0 ? (
        <div className={styles.centerContent}>
          <div style={{ textAlign: "center" }}>
            <h2>Ваша корзина пуста</h2>
            <p>Добавьте товары из каталога, чтобы они появились здесь.</p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                marginTop: "1rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Перейти к каталогу
            </Link>
          </div>
        </div>
      ) : (
        <Cart />
      )}
    </div>
  );
};

export default CartPage;
