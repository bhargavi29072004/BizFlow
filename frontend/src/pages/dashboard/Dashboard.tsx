import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
    const { user } = useAuth();

    const chartData = [
        { month: "Jan", value: 65 },
        { month: "Feb", value: 90 },
        { month: "Mar", value: 55 },
        { month: "Apr", value: 110 },
        { month: "May", value: 80 },
        { month: "Jun", value: 130 },
        { month: "Jul", value: 100 },
        { month: "Aug", value: 145 },
    ];

    return (
        <div className="dashboard">

            {/* HEADER */}
            <header className="dashboard-header">

                <div>
                    <p className="header-label">
                        BUSINESS OVERVIEW
                    </p>

                    <h1>
                        Welcome back, {user?.name || "User"} 👋
                    </h1>

                    <p className="header-subtitle">
                        Here's what's happening with your business today.
                    </p>
                </div>

                <div className="user-badge">
                    🛡️ {user?.role || "ADMIN"}
                </div>

            </header>


            {/* STAT CARDS */}
            <section className="stats-grid">

                <div className="stat-card cyan">
                    <div className="stat-icon">
                        👥
                    </div>

                    <p className="stat-title">
                        Total Customers
                    </p>

                    <h2 className="stat-value">
                        25
                    </h2>
                </div>


                <div className="stat-card violet">
                    <div className="stat-icon">
                        📦
                    </div>

                    <p className="stat-title">
                        Total Products
                    </p>

                    <h2 className="stat-value">
                        15
                    </h2>
                </div>


                <div className="stat-card green">
                    <div className="stat-icon">
                        📊
                    </div>

                    <p className="stat-title">
                        Total Stock
                    </p>

                    <h2 className="stat-value">
                        33
                    </h2>
                </div>


                <div className="stat-card orange">
                    <div className="stat-icon">
                        🚚
                    </div>

                    <p className="stat-title">
                        Total Challans
                    </p>

                    <h2 className="stat-value">
                        8
                    </h2>
                </div>

            </section>


            {/* MAIN CONTENT */}
            <section className="content-grid">

                {/* INVENTORY */}
                <div className="dashboard-card">

                    <div className="card-heading">

                        <div>
                            <h2>
                                Inventory Overview
                            </h2>

                            <p>
                                Stock movement over time
                            </p>
                        </div>

                        <span className="period-badge">
                            LAST 8 MONTHS
                        </span>

                    </div>


                    <div className="chart">

                        {chartData.map((item) => (
                            <div
                                className="chart-bar-wrapper"
                                key={item.month}
                            >
                                <div
                                    className="chart-bar"
                                    style={{
                                        height: `${item.value}px`,
                                    }}
                                    title={`${item.month}: ${item.value}`}
                                />
                            </div>
                        ))}

                    </div>


                    <div className="chart-labels">

                        {chartData.map((item) => (
                            <span key={item.month}>
                                {item.month}
                            </span>
                        ))}

                    </div>

                </div>


                {/* LOW STOCK */}
                <div className="dashboard-card">

                    <div className="card-heading">

                        <div>
                            <h2>
                                Low Stock
                            </h2>

                            <p>
                                Items requiring attention
                            </p>
                        </div>

                    </div>


                    <div className="alert-list">

                        <div className="stock-alert">

                            <div className="stock-product">

                                <div className="alert-icon">
                                    ⚠
                                </div>

                                <div>
                                    <strong>
                                        Keyboard
                                    </strong>

                                    <span>
                                        Minimum: 5 units
                                    </span>
                                </div>

                            </div>

                            <span className="stock-number">
                                3 left
                            </span>

                        </div>


                        <div className="stock-alert critical">

                            <div className="stock-product">

                                <div className="alert-icon">
                                    ⚠
                                </div>

                                <div>
                                    <strong>
                                        Mouse
                                    </strong>

                                    <span>
                                        Minimum: 10 units
                                    </span>
                                </div>

                            </div>

                            <span className="stock-number">
                                4 left
                            </span>

                        </div>


                        <div className="stock-alert">

                            <div className="stock-product">

                                <div className="alert-icon">
                                    ⚠
                                </div>

                                <div>
                                    <strong>
                                        USB Cable
                                    </strong>

                                    <span>
                                        Minimum: 8 units
                                    </span>
                                </div>

                            </div>

                            <span className="stock-number">
                                6 left
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* QUICK ACTIONS */}
            <section className="dashboard-card">

                <div className="card-heading">

                    <div>
                        <h2>
                            Quick Actions
                        </h2>

                        <p>
                            Quickly access common operations
                        </p>
                    </div>

                </div>


                <div className="quick-actions">

                    <button className="action-button cyan">
                        👥
                        Add Customer
                    </button>

                    <button className="action-button violet">
                        📦
                        Add Product
                    </button>

                    <button className="action-button green">
                        📊
                        Stock Movement
                    </button>

                    <button className="action-button orange">
                        🚚
                        Create Challan
                    </button>

                </div>

            </section>


            {/* ACCOUNT */}
            <section className="account-card">

                <div>
                    <h3 className="account-title">
                        Account Information
                    </h3>

                    <p className="account-subtitle">
                        Current logged-in account
                    </p>
                </div>


                <div className="account-details">

                    <span className="account-item">
                        👤{" "}
                        <strong>Name:</strong>{" "}
                        {user?.name || "N/A"}
                    </span>

                    <span className="account-item">
                        🛡️{" "}
                        <strong>Role:</strong>{" "}
                        {user?.role || "N/A"}
                    </span>

                    <span className="account-item">
                        🟢{" "}
                        <strong>Status:</strong>{" "}
                        Active
                    </span>

                </div>

            </section>

        </div>
    );
};

export default Dashboard;