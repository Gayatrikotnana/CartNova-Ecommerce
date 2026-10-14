
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:8087/api";

function getSavedToken() {
  return localStorage.getItem("cartnova_token");
}

function getSavedEmail() {
  return localStorage.getItem("cartnova_email");
}

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

async function apiRequest(path, options = {}) {
  const token = getSavedToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        (typeof data === "string" && data) ||
        `Request failed (${response.status})`
    );
  }

  return data;
}

function productEmoji(name = "") {
  const product = String(name).trim().toLowerCase();

  const icons = {
    laptop: "💻",
    "wireless headphones": "🎧",
    "classic wristwatch": "⌚",
    "ceramic coffee mug": "☕",
    "steel water bottle": "🧴",
    "wireless mouse": "🖱️",
    "canvas tote bag": "👜",
    "casual sneakers": "👟",
  };

  return icons[product] || "🛍️";
}

const styles = `
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Inter, Arial, sans-serif;
  background: #f7f8fc;
  color: #22283a;
}

button, input, select { font: inherit; }
button { cursor: pointer; }
button:disabled { opacity: .5; cursor: not-allowed; }
.app { min-height: 100vh; }

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 6%;
  background: white;
  border-bottom: 1px solid #eceef4;
  flex-wrap: wrap;
}

.brand {
  font-size: 25px;
  font-weight: 800;
  color: #6653d9;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.button {
  border: 0;
  border-radius: 10px;
  padding: 11px 16px;
  background: #6855dc;
  color: white;
  font-weight: 700;
}

.button.secondary {
  background: #eeebff;
  color: #5d49c6;
}

.button.danger {
  background: #fff0f0;
  color: #bd3535;
}

.hero {
  padding: 48px 6%;
  background: linear-gradient(120deg, #eeebff, #f8f5ff);
}

.hero h1 {
  font-size: clamp(30px, 5vw, 48px);
  margin: 0 0 12px;
}

.hero p {
  color: #676b7d;
  line-height: 1.7;
  margin: 0;
}

.main {
  max-width: 1250px;
  padding: 30px 22px 60px;
  margin: auto;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.filter {
  border: 1px solid #e0e2eb;
  border-radius: 22px;
  padding: 10px 15px;
  background: white;
  color: #555b6d;
}

.filter.active {
  background: #6855dc;
  color: white;
  border-color: #6855dc;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  gap: 20px;
}

.card {
  border: 1px solid #eceef4;
  border-radius: 17px;
  background: white;
  padding: 18px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  box-shadow: 0 4px 15px #25264a08;
}

.product-icon {
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f2ff;
  border-radius: 13px;
  font-size: 64px;
  margin-bottom: 16px;
}

.category {
  color: #7160ce;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.card h3 {
  margin: 9px 0;
  font-size: 18px;
}

.description {
  color: #777d8d;
  font-size: 14px;
  line-height: 1.6;
  min-height: 44px;
}

.price {
  font-size: 21px;
  font-weight: 800;
  margin: 13px 0 7px;
}

.stock {
  color: #777d8d;
  font-size: 13px;
  margin-bottom: 15px;
}

.card .button { margin-top: auto; }

.section { margin-top: 42px; }

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.section-heading h2 { margin: 0; }

.cart-list { display: grid; gap: 12px; }

.cart-row {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #eceef4;
  background: white;
}

.cart-icon {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  background: #f4f2ff;
  border-radius: 12px;
  font-size: 31px;
  flex-shrink: 0;
}

.cart-info { flex: 1; min-width: 0; }

.cart-info h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.cart-info p {
  margin: 0 0 4px;
  color: #777d8d;
  font-size: 14px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity button {
  border: 1px solid #e0e2eb;
  background: white;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  font-weight: 800;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: white;
  border-radius: 14px;
  margin-top: 15px;
  border: 1px solid #eceef4;
  font-weight: 800;
}

.notice {
  margin: 15px 0;
  padding: 13px 15px;
  border-radius: 10px;
  background: #f0edff;
  color: #5141a4;
  overflow-wrap: anywhere;
}

.notice.error {
  background: #fff0f0;
  color: #a92c2c;
}

.empty {
  text-align: center;
  padding: 35px 15px;
  color: #777d8d;
  border: 1px dashed #d9dbe6;
  border-radius: 14px;
  background: white;
}

footer {
  text-align: center;
  padding: 24px;
  color: #85899a;
  font-size: 13px;
}

/* Login and registration */

.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: radial-gradient(circle at top left, #e8e3ff, #f7f8fc 60%, #eeebff);
}

.auth-card {
  width: 100%;
  max-width: 430px;
  background: white;
  border: 1px solid #eceef4;
  border-radius: 22px;
  padding: 32px;
  box-shadow: 0 18px 60px #25264a12;
}

.auth-card h1 {
  font-size: 29px;
  margin: 22px 0 10px;
}

.auth-card > p {
  color: #777d8d;
  font-size: 14px;
  line-height: 1.7;
}

.auth-eyebrow {
  color: #7160ce;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-top: 28px;
}

.auth-label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  margin: 17px 0 7px;
}

.auth-field {
  width: 100%;
  padding: 13px;
  border: 1px solid #e0e2eb;
  border-radius: 10px;
  background: #fcfcff;
  outline: none;
}

.auth-field:focus {
  border-color: #6855dc;
  box-shadow: 0 0 0 3px #6855dc19;
}

.auth-submit {
  width: 100%;
  margin-top: 22px;
  padding: 13px;
}

.auth-switch {
  width: 100%;
  margin-top: 14px;
  padding: 9px;
  background: transparent;
  border: 0;
  color: #5d49c6;
  font-weight: 700;
}

.auth-user {
  font-size: 12px;
  color: #777d8d;
  max-width: 190px;
  overflow-wrap: anywhere;
}

/* Checkout popup */

.checkout-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(20, 24, 40, .58);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
}

.checkout-modal {
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 20px 60px #0003;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
}

.checkout-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.checkout-title h2 { margin: 0; font-size: 23px; }

.close-button {
  width: 35px;
  height: 35px;
  border: 0;
  border-radius: 50%;
  background: #f1f2f7;
  color: #333;
  font-size: 20px;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  padding: 16px;
  margin-top: 12px;
  text-align: left;
  border-radius: 13px;
  border: 1px solid #e0e2eb;
  background: white;
  color: #22283a;
}

.payment-option.selected {
  border: 2px solid #6855dc;
  background: #f6f4ff;
  padding: 15px;
}

.payment-icon {
  width: 45px;
  height: 45px;
  display: grid;
  place-items: center;
  background: #eeebff;
  border-radius: 12px;
  font-size: 24px;
  flex-shrink: 0;
}

.payment-details { flex: 1; }
.payment-details strong { display: block; margin-bottom: 5px; }
.payment-details small { color: #777d8d; line-height: 1.5; }
.payment-check { color: #6855dc; font-size: 20px; }

.checkout-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f8fc;
  border-radius: 12px;
  padding: 16px;
  margin: 18px 0;
  gap: 12px;
}

.checkout-total strong {
  font-size: 22px;
  color: #5d49c6;
}

.checkout-note {
  background: #fff8e8;
  color: #805719;
  padding: 12px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.6;
  margin-top: 14px;
}

.checkout-actions { display: grid; gap: 10px; margin-top: 18px; }
.checkout-actions .button { width: 100%; padding: 14px; }

.cancel-button {
  width: 100%;
  padding: 12px;
  background: white;
  color: #666;
  border: 1px solid #e0e2eb;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .hero { padding: 35px 22px; }
  .main { padding: 22px 14px 45px; }
  .cart-row { flex-wrap: wrap; }
  .quantity { margin-left: 76px; }
  .total { align-items: flex-start; flex-direction: column; }
  .checkout-modal { padding: 20px; }
  .auth-card { padding: 24px; }
}
`;

export default function App() {
  // Authentication state
  const [token, setToken] = useState(getSavedToken);
  const [loggedInEmail, setLoggedInEmail] = useState(getSavedEmail);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [authInitializing, setAuthInitializing] = useState(true);

  const [isRegister, setIsRegister] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Original shopping state
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Original checkout state
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [placingOrder, setPlacingOrder] = useState(false);

  function clearSession() {
    localStorage.removeItem("cartnova_token");
    localStorage.removeItem("cartnova_email");

    setToken(null);
    setLoggedInEmail(null);
    setLoggedInUserId(null);
    setProducts([]);
    setCart([]);
    setShowCheckout(false);
  }

  // Restore and verify a saved session after a page refresh.
  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const savedToken = getSavedToken();
      const savedEmail = getSavedEmail();

      if (!savedToken || !savedEmail) {
        if (!cancelled) {
          clearSession();
          setAuthInitializing(false);
          setLoading(false);
        }
        return;
      }

      try {
        const users = await apiRequest("/users");

        if (cancelled) return;

        const currentUser = Array.isArray(users)
          ? users.find(
              (user) =>
                user.email?.toLowerCase() === savedEmail.toLowerCase()
            )
          : null;

        if (!currentUser) {
          clearSession();
          setLoginError("Your session could not be verified. Please sign in again.");
        } else {
          setToken(savedToken);
          setLoggedInEmail(savedEmail);
          setLoggedInUserId(currentUser.id);
        }
      } catch {
        if (!cancelled) {
          clearSession();
          setLoginError(
            "Your session could not be verified. Please sign in again."
          );
        }
      } finally {
        if (!cancelled) {
          setAuthInitializing(false);
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load products only after login has been verified.
  useEffect(() => {
    if (!token || !loggedInUserId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest("/products");

        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Could not load products.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [token, loggedInUserId]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    setError("");

    const email = loginEmail.trim();

    try {
      if (!email || !loginPassword) {
        throw new Error("Please enter your email and password.");
      }

      // Register the account first, then sign in.
      if (isRegister) {
        if (!loginName.trim()) {
          throw new Error("Please enter your name.");
        }

        await apiRequest("/users", {
          method: "POST",
          body: JSON.stringify({
            name: loginName.trim(),
            email,
            password: loginPassword,
          }),
        });
      }

      const result = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password: loginPassword,
        }),
      });

      if (!result?.token) {
        throw new Error(
          "Login succeeded without a token. Check the response from /api/auth/login."
        );
      }

      // Save the JWT before requesting protected endpoints.
      localStorage.setItem("cartnova_token", result.token);
      localStorage.setItem("cartnova_email", result.email || email);

      setToken(result.token);
      setLoggedInEmail(result.email || email);

      const users = await apiRequest("/users");

      const currentUser = Array.isArray(users)
        ? users.find(
            (user) =>
              user.email?.toLowerCase() ===
              (result.email || email).toLowerCase()
          )
        : null;

      if (!currentUser || currentUser.id == null) {
        throw new Error(
          "The login worked, but the user ID could not be found from /api/users."
        );
      }

      setLoggedInUserId(currentUser.id);
      setLoginPassword("");
      setLoginError("");
      setMessage(`Welcome to CartNova, ${currentUser.name || email}!`);
    } catch (err) {
      localStorage.removeItem("cartnova_token");
      localStorage.removeItem("cartnova_email");

      setToken(null);
      setLoggedInEmail(null);
      setLoggedInUserId(null);

      setLoginError(
        err.message || "Unable to sign in. Please check your details."
      );
    } finally {
      setLoginLoading(false);
    }
  }

  function handleLogout() {
    clearSession();
    setLoginEmail("");
    setLoginPassword("");
    setLoginName("");
    setLoginError("");
    setMessage("");
    setError("");
    setSearch("");
    setCategory("All");
    setIsRegister(false);
  }

  const categories = useMemo(
    () => [
      "All",
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch =
        !query ||
        `${product.name || ""} ${product.description || ""} ${
          product.category || ""
        }`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  function addToCart(product) {
    if (product.stock <= 0) {
      setMessage(`${product.name} is out of stock.`);
      return;
    }

    setCart((current) => {
      const existing = current.find(
        (item) => item.productId === product.id
      );

      if (existing) {
        if (existing.quantity >= product.stock) {
          setMessage(`Only ${product.stock} units are available.`);
          return current;
        }

        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { productId: product.id, quantity: 1 }];
    });

    setMessage(`${product.name} added to your cart.`);
  }

  function changeQuantity(productId, amount) {
    setCart((current) =>
      current
        .map((item) => {
          if (item.productId !== productId) return item;

          const product = products.find((p) => p.id === productId);
          const quantity = item.quantity + amount;

          if (quantity > Number(product?.stock || 0)) {
            setMessage(`Only ${product?.stock || 0} units are available.`);
            return item;
          }

          return { ...item, quantity };
        })
        .filter((item) => item.quantity > 0)
    );

    setMessage("");
  }

  function checkout() {
    if (!cartItems.length) {
      setMessage("Your cart is empty.");
      return;
    }

    setSelectedPayment("COD");
    setMessage("");
    setShowCheckout(true);
  }

  async function confirmCheckout() {
    if (!cartItems.length || placingOrder) return;

    setPlacingOrder(true);
    setMessage("");

    try {
      const createdOrders = [];

      for (const item of cartItems) {
        const order = await apiRequest("/orders", {
          method: "POST",
          body: JSON.stringify({
            productId: item.productId,
            quantity: item.quantity,
          }),
        });

        if (!order || order.id == null) {
          throw new Error("The order response did not include an order ID.");
        }

        createdOrders.push(order);
      }

      setCart([]);
      setShowCheckout(false);

      const orderIds = createdOrders.map((order) => order.id).join(", ");

      if (selectedPayment === "COD") {
        setMessage(
          `Order placed successfully! Order ID(s): ${orderIds}. Payment is due on delivery.`
        );
      } else {
        setMessage(
          `Order created successfully. Order ID(s): ${orderIds}. Online payment is not integrated yet, so no payment was collected.`
        );
      }
    } catch (err) {
      setMessage(
        `Checkout failed: ${err.message}. If some orders were already created, check your order list before trying again.`
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  // Prevent the login form from flashing while checking a saved session.
  if (authInitializing) {
    return (
      <>
        <style>{styles}</style>
        <div className="auth-page">
          <div className="auth-card" style={{ textAlign: "center" }}>
            <div className="brand">🛍️ CartNova</div>
            <p>Checking your session...</p>
          </div>
        </div>
      </>
    );
  }

  // Login and registration page.
  if (!token || !loggedInUserId) {
    return (
      <>
        <style>{styles}</style>

        <div className="auth-page">
          <form className="auth-card" onSubmit={handleLogin}>
            <div className="brand">🛍️ CartNova</div>

            <div className="auth-eyebrow">A new way to shop</div>

            <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>

            <p>
              {isRegister
                ? "Register to start exploring CartNova."
                : "Sign in securely to continue shopping."}
            </p>

            {loginError && (
              <div className="notice error" role="alert">
                {loginError}
              </div>
            )}

            {isRegister && (
              <>
                <label className="auth-label" htmlFor="login-name">
                  Full name
                </label>
                <input
                  id="login-name"
                  className="auth-field"
                  value={loginName}
                  onChange={(event) => setLoginName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />
              </>
            )}

            <label className="auth-label" htmlFor="login-email">
              Email address
            </label>
            <input
              id="login-email"
              className="auth-field"
              type="email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <label className="auth-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              className="auth-field"
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
            />

            <button
              className="button auth-submit"
              type="submit"
              disabled={loginLoading}
            >
              {loginLoading
                ? "Please wait..."
                : isRegister
                  ? "Create account & sign in"
                  : "Sign in securely"}
            </button>

            <button
              type="button"
              className="auth-switch"
              onClick={() => {
                setIsRegister((value) => !value);
                setLoginError("");
              }}
            >
              {isRegister
                ? "Already registered? Sign in"
                : "New to CartNova? Create an account"}
            </button>

            <p style={{ textAlign: "center", marginTop: 12 }}>
              JWT authentication enabled · Demo store
            </p>
          </form>
        </div>
      </>
    );
  }

  // Original CartNova shopping page.
  return (
    <div className="app">
      <style>{styles}</style>

      <header className="nav">
        <div className="brand">🛍️ CartNova</div>

        <div className="nav-right">
          <input
            aria-label="Search products"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={{
              padding: "11px 13px",
              border: "1px solid #e0e2eb",
              borderRadius: 10,
              width: "min(230px, 65vw)",
            }}
          />

          <button
            className="button secondary"
            onClick={() =>
              document.getElementById("cart-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            🛒 Cart (
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </button>

          <span className="auth-user">{loggedInEmail}</span>

          <button
            className="button secondary"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>

      <section className="hero">
        <h1>Welcome to CartNova</h1>
        <p>A New Way to Shop.</p>
        <p style={{ marginTop: 8 }}>
          Discover everyday essentials and find something you love.
        </p>
      </section>

      <main className="main">
        {message && (
          <div className="notice" role="status">
            {message}
            <button
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
              style={{
                float: "right",
                border: 0,
                background: "transparent",
                color: "inherit",
              }}
            >
              ✕
            </button>
          </div>
        )}

        {error && <div className="notice error">{error}</div>}

        <div className="section-heading">
          <h2>Explore products</h2>
          <span>{products.length} products</span>
        </div>

        <div className="filters">
          {categories.map((item) => (
            <button
              key={item}
              className={`filter ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="empty">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty">
            {products.length === 0
              ? "No products were returned by the backend."
              : "No products match your search."}
          </div>
        ) : (
          <div className="grid">
            {filteredProducts.map((product) => (
              <article className="card" key={product.id}>
                <div className="product-icon" aria-label={product.name}>
                  {productEmoji(product.name)}
                </div>

                <span className="category">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <div className="price">{money(product.price)}</div>

                <div className="stock">
                  {product.stock > 0
                    ? `${product.stock} available`
                    : "Out of stock"}
                </div>

                <button
                  className="button"
                  onClick={() => addToCart(product)}
                  disabled={Number(product.stock) <= 0}
                >
                  Add to cart +
                </button>
              </article>
            ))}
          </div>
        )}

        <section className="section" id="cart-section">
          <div className="section-heading">
            <h2>Your picks</h2>
            <span>{cartItems.length} different items</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty">
              Your cart is taking a little break. Add a product to get
              started! 🛒
            </div>
          ) : (
            <>
              <div className="cart-list">
                {cartItems.map((item) => (
                  <div className="cart-row" key={item.productId}>
                    <div className="cart-icon">
                      {productEmoji(item.product.name)}
                    </div>

                    <div className="cart-info">
                      <h3>{item.product.name}</h3>
                      <p>{money(item.product.price)} each</p>
                      <p>
                        Subtotal:{" "}
                        {money(Number(item.product.price) * item.quantity)}
                      </p>
                    </div>

                    <div className="quantity">
                      <button
                        aria-label={`Decrease ${item.product.name} quantity`}
                        onClick={() => changeQuantity(item.productId, -1)}
                      >
                        −
                      </button>

                      <strong>{item.quantity}</strong>

                      <button
                        aria-label={`Increase ${item.product.name} quantity`}
                        disabled={item.quantity >= item.product.stock}
                        onClick={() => changeQuantity(item.productId, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="button danger"
                      onClick={() =>
                        setCart((current) =>
                          current.filter(
                            (cartItem) =>
                              cartItem.productId !== item.productId
                          )
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="total">
                <span>Grand total</span>
                <span>{money(total)}</span>

                <button className="button" onClick={checkout}>
                  Continue to checkout →
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      <footer>© 2026 CartNova. All rights reserved.</footer>

      {/* Original checkout popup */}
      {showCheckout && (
        <div
          className="checkout-overlay"
          onClick={(event) => {
            if (
              event.target === event.currentTarget &&
              !placingOrder
            ) {
              setShowCheckout(false);
            }
          }}
        >
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-heading"
          >
            <div className="checkout-title">
              <h2 id="checkout-heading">Checkout</h2>

              <button
                className="close-button"
                aria-label="Close checkout"
                disabled={placingOrder}
                onClick={() => setShowCheckout(false)}
              >
                ×
              </button>
            </div>

            <p style={{ color: "#777d8d", lineHeight: 1.6 }}>
              Choose how you would like to pay for your CartNova order.
            </p>

            <button
              type="button"
              className={`payment-option ${
                selectedPayment === "COD" ? "selected" : ""
              }`}
              disabled={placingOrder}
              onClick={() => setSelectedPayment("COD")}
            >
              <span className="payment-icon">💵</span>

              <span className="payment-details">
                <strong>Cash on Delivery</strong>
                <small>Pay when your order arrives</small>
              </span>

              <span className="payment-check">
                {selectedPayment === "COD" ? "✓" : "○"}
              </span>
            </button>

            <button
              type="button"
              className={`payment-option ${
                selectedPayment === "ONLINE" ? "selected" : ""
              }`}
              disabled={placingOrder}
              onClick={() => setSelectedPayment("ONLINE")}
            >
              <span className="payment-icon">💳</span>

              <span className="payment-details">
                <strong>Online Payment</strong>
                <small>UPI, QR code, or online payment gateway</small>
              </span>

              <span className="payment-check">
                {selectedPayment === "ONLINE" ? "✓" : "○"}
              </span>
            </button>

            {selectedPayment === "ONLINE" && (
              <div className="checkout-note">
                Online payment is currently a demo option. No QR code
                or payment gateway is connected, and no money will be
                charged.
              </div>
            )}

            <div className="checkout-total">
              <span>Total payable</span>
              <strong>{money(total)}</strong>
            </div>

            <div className="checkout-actions">
              <button
                type="button"
                className="button"
                disabled={placingOrder}
                onClick={confirmCheckout}
              >
                {placingOrder
                  ? "Placing your order..."
                  : selectedPayment === "COD"
                    ? "Confirm COD Order"
                    : "Continue with Online Payment"}
              </button>

              <button
                type="button"
                className="cancel-button"
                disabled={placingOrder}
                onClick={() => setShowCheckout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
