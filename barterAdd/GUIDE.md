# Project Guide

## Overview

Till now, I have completed the backend part. My dear fellow mates, your task is to complete the UI part. The design template is available at the link below:

**[Figma Design](https://www.figma.com/design/1W9tOaRUY3sKW2JvXIduhg/BarterX-Ui%2FUx-Godown?node-id=0-1&t=XMTG8WhgkE8FZwhD-1)**

All the required functions have already been implemented, and the boilerplate code is set up. You only need to work on the **pages** folder and improve the UI based on the Figma design.

## Folder Structure

```bash
barterx/
├─ pages/
│  ├─ AddProducts.js
│  ├─ dashboard.js
│  ├─ Myproducts.js
│  └─ Profit.js
```

## UI Guidelines

### 🔹 **AddProducts.js** (Product Addition Page)

- The following function **must not be changed**: `executeTransaction`.
- Data should be passed in the format shown below:

```bash
executeTransaction, # Do not change
"0.1", # Price must be a string value
10, # Stock must be a number
"Laptop", # Product name (String)
"image.jpg", # Image hash (Upload to IPFS and pass the CID here)
"A cool laptop", # Description (String)
"Electronics", # Type (Make a dropdown if possible)
"New" # Dropdown with options: 'New' and 'Refurbished'
```

### 🔹 **Handling Image Upload to IPFS**

- Use the custom hook **`usePinata`**.
- The function **`useUpload`** inside `usePinata` is responsible for image uploads.
- Pass the image file to **`useUpload`**, retrieve the image hash (CID), and use it in the contract.

#### Hooks Directory

```bash
barterx/
├─ hooks/
│  ├─ useBrtxBalance.js
│  ├─ useConnect.js
│  └─ usePinata.js
```

### 🔹 **dashboard.js** (User Dashboard)

- Design the UI **exactly as shown in the Figma template**.
- If you think any UI improvements are necessary, feel free to make changes. **No objections!**
- Ensure that all components are responsive and user-friendly.

### 🔹 **Myproducts.js** (User's Product Listing)

- Fetch products and store them in the **`product` state**.
- Simply map the products and display them in a **card-style layout**.

```bash
const [product, setProduct] = useState([]);
# Just map this and create a card-like layout
```

## Running the Project

After UI modifications, test them by running:

```sh
npm run dev
# OR
yarn dev
```

Then, open `http://localhost:3000/` in your browser.

## Committing Your Changes

After making updates, commit them using Git:

```sh
git add .
git commit -m "Updated UI for MyProducts"
git checkout -b "your-branch-name"
git push origin [your-branch-name]
```

# i need to update useBrtxBalance.js custom hook so this is the only pending part in this half of the project if you face any error please ping me
