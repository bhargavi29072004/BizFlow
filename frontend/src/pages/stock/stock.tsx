import { useState } from "react";

type StockItem = {
    id: number;
    productName: string;
    sku: string;
    warehouse: string;
    currentStock: number;
    minimumStock: number;
    unit: string;
};

const Stock = () => {
    const [stockItems] = useState<StockItem[]>([
        {
            id: 1,
            productName: "Laptop",
            sku: "LAP001",
            warehouse: "Warehouse A",
            currentStock: 10,
            minimumStock: 5,
            unit: "Pieces",
        },
        {
            id: 2,
            productName: "Keyboard",
            sku: "KEY001",
            warehouse: "Warehouse A",
            currentStock: 3,
            minimumStock: 5,
            unit: "Pieces",
        },
        {
            id: 3,
            productName: "Mouse",
            sku: "MOU001",
            warehouse: "Warehouse B",
            currentStock: 20,
            minimumStock: 10,
            unit: "Pieces",
        },
    ]);

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        productName: "",
        sku: "",
        warehouse: "",
        quantity: "",
        movementType: "IN",
        remarks: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Stock movement:", formData);

        setShowForm(false);

        setFormData({
            productName: "",
            sku: "",
            warehouse: "",
            quantity: "",
            movementType: "IN",
            remarks: "",
        });
    };

    return (
        <div style={{ padding: "24px" }}>

            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <div>
                    <h1>Stock Management</h1>
                    <p>Monitor and manage your inventory.</p>
                </div>

                <button onClick={() => setShowForm(true)}>
                    + Stock Movement
                </button>
            </div>

            {/* Stock Summary */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                    marginBottom: "24px",
                }}
            >
                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>Total Products</h3>
                    <h2>{stockItems.length}</h2>
                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>Total Units</h3>
                    <h2>
                        {stockItems.reduce(
                            (total, item) => total + item.currentStock,
                            0
                        )}
                    </h2>
                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>Low Stock Items</h3>
                    <h2>
                        {
                            stockItems.filter(
                                (item) =>
                                    item.currentStock <= item.minimumStock
                            ).length
                        }
                    </h2>
                </div>
            </div>

            {/* Stock Movement Form */}
            {showForm && (
                <div
                    style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                    }}
                >
                    <h2>Stock Movement</h2>

                    <form onSubmit={handleSubmit}>

                        <div>
                            <label>Product Name</label>
                            <br />
                            <input
                                name="productName"
                                placeholder="Product Name"
                                value={formData.productName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>SKU</label>
                            <br />
                            <input
                                name="sku"
                                placeholder="SKU"
                                value={formData.sku}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Warehouse</label>
                            <br />
                            <input
                                name="warehouse"
                                placeholder="Warehouse"
                                value={formData.warehouse}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Quantity</label>
                            <br />
                            <input
                                name="quantity"
                                type="number"
                                min="1"
                                placeholder="Quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Movement Type</label>
                            <br />
                            <select
                                name="movementType"
                                value={formData.movementType}
                                onChange={handleChange}
                            >
                                <option value="IN">
                                    Stock In
                                </option>

                                <option value="OUT">
                                    Stock Out
                                </option>
                            </select>
                        </div>

                        <br />

                        <div>
                            <label>Remarks</label>
                            <br />
                            <textarea
                                name="remarks"
                                placeholder="Remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                            />
                        </div>

                        <br />

                        <button type="submit">
                            Save Movement
                        </button>

                        {" "}

                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>

                    </form>
                </div>
            )}

            {/* Stock Table */}
            <div
                style={{
                    overflowX: "auto",
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "16px",
                }}
            >
                <h2>Current Stock</h2>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Warehouse</th>
                            <th>Current Stock</th>
                            <th>Minimum Stock</th>
                            <th>Unit</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stockItems.map((item) => {
                            const isLowStock =
                                item.currentStock <= item.minimumStock;

                            return (
                                <tr key={item.id}>
                                    <td>{item.productName}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.warehouse}</td>
                                    <td>{item.currentStock}</td>
                                    <td>{item.minimumStock}</td>
                                    <td>{item.unit}</td>

                                    <td>
                                        {isLowStock
                                            ? "LOW STOCK"
                                            : "IN STOCK"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Stock;