import { useState } from "react";

type Product = {
    id: number;
    name: string;
    sku: string;
    category: string;
    unitPrice: number;
    currentStock: number;
    minimumStock: number;
    warehouseLocation: string;
};

const Products = () => {
    const [products] = useState<Product[]>([
        {
            id: 1,
            name: "Laptop",
            sku: "LAP001",
            category: "Electronics",
            unitPrice: 50000,
            currentStock: 10,
            minimumStock: 5,
            warehouseLocation: "Warehouse A",
        },
        {
            id: 2,
            name: "Keyboard",
            sku: "KEY001",
            category: "Accessories",
            unitPrice: 1500,
            currentStock: 3,
            minimumStock: 5,
            warehouseLocation: "Warehouse A",
        },
    ]);

    // Controls whether the Add Product form is visible
    const [showForm, setShowForm] = useState(false);

    // Stores the values entered in the form
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: "",
        unitPrice: "",
        currentStock: "",
        minimumStock: "",
        warehouseLocation: "",
    });

    // Handles changes in form fields
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handles form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Product data:", formData);

        setShowForm(false);

        setFormData({
            name: "",
            sku: "",
            category: "",
            unitPrice: "",
            currentStock: "",
            minimumStock: "",
            warehouseLocation: "",
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
                    <h1>Products</h1>
                    <p>Manage your products and inventory.</p>
                </div>

                <button onClick={() => setShowForm(true)}>
                    + Add Product
                </button>
            </div>

            {/* Add Product Form */}
            {showForm && (
                <div
                    style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                    }}
                >
                    <h2>Add Product</h2>

                    <form onSubmit={handleSubmit}>

                        <div>
                            <label>Product Name</label>
                            <br />
                            <input
                                name="name"
                                placeholder="Product Name"
                                value={formData.name}
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
                            <label>Category</label>
                            <br />
                            <input
                                name="category"
                                placeholder="Category"
                                value={formData.category}
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
                                placeholder="Unit Price"
                                value={formData.unitPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Current Stock</label>
                            <br />
                            <input
                                name="currentStock"
                                type="number"
                                placeholder="Current Stock"
                                value={formData.currentStock}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Minimum Stock</label>
                            <br />
                            <input
                                name="minimumStock"
                                type="number"
                                placeholder="Minimum Stock"
                                value={formData.minimumStock}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Warehouse Location</label>
                            <br />
                            <input
                                name="warehouseLocation"
                                placeholder="Warehouse Location"
                                value={formData.warehouseLocation}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <button type="submit">
                            Save Product
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

            {/* Product Table */}
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
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Minimum Stock</th>
                            <th>Warehouse</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.sku}</td>
                                <td>{product.category}</td>
                                <td>₹{product.unitPrice}</td>
                                <td>{product.currentStock}</td>
                                <td>{product.minimumStock}</td>
                                <td>{product.warehouseLocation}</td>

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

export default Products;