import { useState } from "react";

type ChallanItem = {
    productName: string;
    quantity: number;
    unitPrice: number;
};

type Challan = {
    id: number;
    challanNumber: string;
    customerName: string;
    date: string;
    status: string;
    items: ChallanItem[];
    totalAmount: number;
};

const Challans = () => {
    const [challans] = useState<Challan[]>([
        {
            id: 1,
            challanNumber: "CH-001",
            customerName: "Sharma Enterprises",
            date: "2026-08-10",
            status: "DELIVERED",
            items: [
                {
                    productName: "Laptop",
                    quantity: 2,
                    unitPrice: 50000,
                },
            ],
            totalAmount: 100000,
        },
        {
            id: 2,
            challanNumber: "CH-002",
            customerName: "Patel Traders",
            date: "2026-08-11",
            status: "PENDING",
            items: [
                {
                    productName: "Keyboard",
                    quantity: 5,
                    unitPrice: 1500,
                },
            ],
            totalAmount: 7500,
        },
    ]);

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        customerName: "",
        date: "",
        productName: "",
        quantity: "",
        unitPrice: "",
        notes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
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

        console.log("Challan data:", formData);

        setShowForm(false);

        setFormData({
            customerName: "",
            date: "",
            productName: "",
            quantity: "",
            unitPrice: "",
            notes: "",
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
                    <h1>Challans</h1>
                    <p>Create and manage delivery challans.</p>
                </div>

                <button onClick={() => setShowForm(true)}>
                    + Create Challan
                </button>
            </div>

            {/* Summary Cards */}
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
                    <h3>Total Challans</h3>
                    <h2>{challans.length}</h2>
                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>Pending</h3>
                    <h2>
                        {
                            challans.filter(
                                (challan) =>
                                    challan.status === "PENDING"
                            ).length
                        }
                    </h2>
                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>Delivered</h3>
                    <h2>
                        {
                            challans.filter(
                                (challan) =>
                                    challan.status === "DELIVERED"
                            ).length
                        }
                    </h2>
                </div>
            </div>

            {/* Create Challan Form */}
            {showForm && (
                <div
                    style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                    }}
                >
                    <h2>Create Challan</h2>

                    <form onSubmit={handleSubmit}>

                        <div>
                            <label>Customer Name</label>
                            <br />
                            <input
                                name="customerName"
                                placeholder="Customer Name"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Challan Date</label>
                            <br />
                            <input
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

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
                            <label>Unit Price</label>
                            <br />
                            <input
                                name="unitPrice"
                                type="number"
                                min="0"
                                placeholder="Unit Price"
                                value={formData.unitPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Notes</label>
                            <br />
                            <textarea
                                name="notes"
                                placeholder="Notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>

                        <br />

                        <button type="submit">
                            Save Challan
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

            {/* Challan Table */}
            <div
                style={{
                    overflowX: "auto",
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "16px",
                }}
            >
                <h2>Challan List</h2>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th>Challan No.</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {challans.map((challan) => (
                            <tr key={challan.id}>
                                <td>{challan.challanNumber}</td>

                                <td>
                                    {challan.customerName}
                                </td>

                                <td>
                                    {challan.date}
                                </td>

                                <td>
                                    {challan.items.length}
                                </td>

                                <td>
                                    ₹{challan.totalAmount}
                                </td>

                                <td>
                                    {challan.status}
                                </td>

                                <td>
                                    <button>
                                        View
                                    </button>

                                    {" "}

                                    <button>
                                        Edit
                                    </button>

                                    {" "}

                                    <button>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Challans;