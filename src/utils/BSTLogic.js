

export class Transaction {
  constructor(data) {
    this.productType = data[4]?.trim();
    this.sku = data[5]?.trim();
    this.rating = parseFloat(data[6]) || 0.0;
    this.orderStatus = data[7]?.trim();
    this.paymentMethod = data[8]?.trim();
    this.totalPrice = parseFloat(data[9]) || 0.0;
    this.unitPrice = parseFloat(data[10]) || 0.0;
    this.quantity = parseInt(data[11]) || 0;
    this.purchaseDate = new Date(data[12]?.trim());
    this.shippingType = data[13]?.trim();
  }
}

export class Customer {
  constructor(id, age, gender, isLoyalty) {
    this.customerId = id;
    this.age = age;
    this.gender = gender;
    this.isLoyaltyMember = isLoyalty;
    this.transactions = [];
    this.rfm = { recency: 0, frequency: 0, monetary: 0 };
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  calculateRFM() {
    if (this.transactions.length === 0) return;

    // FREQUENCY
    this.rfm.frequency = this.transactions.length;

    // MONETARY
    this.rfm.monetary = this.transactions.reduce((sum, t) => sum + t.totalPrice, 0);

    // RECENCY (Days since last purchase relative to now)
    const latestDate = this.transactions.reduce((latest, t) => {
      return t.purchaseDate > latest ? t.purchaseDate : latest;
    }, new Date(0));
    
    const now = new Date();
    const diffTime = Math.abs(now - latestDate);
    this.rfm.recency = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  }
}

class TreeNode {
  constructor(customer) {
    this.customer = customer;
    this.left = null;
    this.right = null;
  }
}

export class CustomerBST {
  constructor() {
    this.root = null;
  }

  insert(customer) {
    this.root = this._insertRec(this.root, customer);
  }

  _insertRec(node, customer) {
    if (node === null) return new TreeNode(customer);

    if (customer.customerId < node.customer.customerId) {
      node.left = this._insertRec(node.left, customer);
    } else if (customer.customerId > node.customer.customerId) {
      node.right = this._insertRec(node.right, customer);
    }
    return node;
  }

  search(customerId) {
    return this._searchRec(this.root, customerId);
  }

  _searchRec(node, id) {
    if (node === null || node.customer.customerId === id) {
      return node ? node.customer : null;
    }
    return id < node.customer.customerId 
      ? this._searchRec(node.left, id) 
      : this._searchRec(node.right, id);
  }
}