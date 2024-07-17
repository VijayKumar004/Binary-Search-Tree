class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        drawTree();
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    delete(value) {
        this.root = this.deleteNode(this.root, value);
        drawTree();
    }

    deleteNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            } else if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            const minNode = this.findMinNode(node.right);
            node.value = minNode.value;
            node.right = this.deleteNode(node.right, minNode.value);
        }
        return node;
    }

    findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    search(value) {
        return this.searchNode(this.root, value);
    }

    searchNode(node, value) {
        if (node === null) {
            return false;
        }
        if (value === node.value) {
            return true;
        } else if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }
}

const bst = new BST();

function insertNode() {
    const value = parseInt(document.getElementById("valueInput").value);
    if (!isNaN(value)) {
        bst.insert(value);
        document.getElementById("valueInput").value = '';
    }
}

function deleteNode() {
    const value = parseInt(document.getElementById("valueInput").value);
    if (!isNaN(value)) {
        bst.delete(value);
        document.getElementById("valueInput").value = '';
    }
}

function searchNode() {
    const value = parseInt(document.getElementById("valueInput").value);
    if (!isNaN(value)) {
        const found = bst.search(value);
        if (found) {
            alert(`Node with value ${value} found in the tree.`);
        } else {
            alert(`Node with value ${value} not found in the tree.`);
        }
        document.getElementById("valueInput").value = '';
    }
}

function drawTree() {
    const canvas = document.getElementById('bstCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = Math.min(window.innerWidth - 80, 800); // Adjusted width with a maximum limit
    canvas.height = 400; // Fixed height for better visualization
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bst.root !== null) {
        const depth = getTreeDepth(bst.root);
        const initialX = canvas.width / 2;
        const initialY = 50;
        drawNode(ctx, bst.root, initialX, initialY, depth, initialX / 2, canvas.width - initialX / 2);
    }
}

function drawNode(ctx, node, x, y, depth, minX, maxX) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.stroke();
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '18px Segoe UI'; // Increased font size for node value
    ctx.fillText(node.value, x, y);

    // Draw circle for node
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.strokeStyle = '#333333';
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Draw text for node value
    ctx.fillStyle = '#333333';
    ctx.font = '18px Segoe UI';
    ctx.fillText(node.value, x, y);

    if (node.left !== null) {
        const childX = x - (maxX - minX) / Math.pow(2, depth);
        const childY = y + 60;
        ctx.moveTo(x, y);
        ctx.lineTo(childX, childY);
        ctx.stroke();
        drawNode(ctx, node.left, childX, childY, depth - 1, minX, x);
    }

    if (node.right !== null) {
        const childX = x + (maxX - minX) / Math.pow(2, depth);
        const childY = y + 60;
        ctx.moveTo(x, y);
        ctx.lineTo(childX, childY);
        ctx.stroke();
        drawNode(ctx, node.right, childX, childY, depth - 1, x, maxX);
    }
}

function getTreeDepth(node) {
    if (node === null) {
        return 0;
    }
    const leftDepth = getTreeDepth(node.left);
    const rightDepth = getTreeDepth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
}

drawTree();
