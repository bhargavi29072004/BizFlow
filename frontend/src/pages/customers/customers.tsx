import { useState } from "react";

type Customer = {
    id: number;
    name: string;
    mobile: string;
    email: string;
    businessName: string;
    gstNumber: string;
    customerType: string;
    address: string;
    status: string;
    followUpDate: string;
    notes: string;
};

const Customers = () => {
    const [customers] = useState<Customer[]>([
        {
            id: 1,
            name: "Rahul Sharma",
            mobile: "9876543210",
            email: "rahul@example.com",
            businessName: "Sharma Enterprises",
            gstNumber: "24ABCDE1234F1Z5",
            customerType: "BUSINESS",
            address: "Vadodara, Gujarat",
            status: "ACTIVE",
            followUpDate: "2026-08-20",
            notes: "Regular customer",
        },
        {
            id: 2,
            name: "Priya Patel",
            mobile: "9876501234",
            email: "priya@example.com",
            businessName: "Patel Traders",
            gstNumber: "",
            customerType: "RETAIL",
            address: "Ahmedabad, Gujarat",
            status: "LEAD",
            followUpDate: "2026-08-18",
            notes: "New enquiry",
        },
    ]);

    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        businessName: "",
        gstNumber: "",
        customerType: "BUSINESS",
        address: "",
        status: "LEAD",
        followUpDate: "",
        notes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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

        console.log("Customer data:", formData);

        setShowForm(false);

        setFormData({
            name: "",
            mobile: "",
            email: "",
            businessName: "",
            gstNumber: "",
            customerType: "BUSINESS",
            address: "",
            status: "LEAD",
            followUpDate: "",
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
                    <h1>Customers</h1>
                    <p>Manage your customers and follow-ups.</p>
                </div>

                <button onClick={() => setShowForm(true)}>
                    + Add Customer
                </button>
            </div>

            {/* Add Customer Form */}
            {showForm && (
                <div
                    style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                    }}
                >
                    <h2>Add Customer</h2>

                    <form onSubmit={handleSubmit}>

                        <div>
                            <label>Name</label>
                            <br />
                            <input
                                name="name"
                                placeholder="Customer Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Mobile</label>
                            <br />
                            <input
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Email</label>
                            <br />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <br />

                        <div>
                            <label>Business Name</label>
                            <br />
                            <input
                                name="businessName"
                                placeholder="Business Name"
                                value={formData.businessName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>GST Number</label>
                            <br />
                            <input
                                name="gstNumber"
                                placeholder="GST Number"
                                value={formData.gstNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <br />

                        <div>
                            <label>Customer Type</label>
                            <br />
                            <select
                                name="customerType"
                                value={formData.customerType}
                                onChange={handleChange}
                            >
                                <option value="BUSINESS">Business</option>
                                <option value="RETAIL">Retail</option>
                                <option value="WHOLESALE">Wholesale</option>
                            </select>
                        </div>

                        <br />

                        <div>
                            <label>Address</label>
                            <br />
                            <textarea
                                name="address"
                                placeholder="Customer Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Status</label>
                            <br />
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="LEAD">Lead</option>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>
                        </div>

                        <br />

                        <div>
                            <label>Follow-up Date</label>
                            <br />
                            <input
                                name="followUpDate"
                                type="date"
                                value={formData.followUpDate}
                                onChange={handleChange}
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
                            Save Customer
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

            {/* Customer Table */}
            <div
                style={{
                    overflowX: "auto",
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "16px",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Business</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Follow-up</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.mobile}</td>
                                <td>{customer.businessName}</td>
                                <td>{customer.customerType}</td>
                                <td>{customer.status}</td>
                                <td>{customer.followUpDate || "-"}</td>

                                <td>
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

export default Customers;