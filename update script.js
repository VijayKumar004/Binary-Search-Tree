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
        const found = this.searchNode(this.root, value);
        alert(found ? "Node found" : "Node not found");
    }

    searchNode(node, value) {
        if (node === null) {
            return false;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else if (value > node.value) {
            return this.searchNode(node.right, value);
        } else {
            return true;
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
        bst.search(value);
    }
}

function drawTree() {
    const canvas = document.getElementById('bstCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 200;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (bst.root !== null) {
        drawNode(ctx, bst.root, canvas.width / 2, 30, canvas.width / 4);
    }
}

function drawNode(ctx, node, x, y, offset) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.value, x, y);

    if (node.left !== null) {
        ctx.moveTo(x, y);
        ctx.lineTo(x - offset, y + 60);
        ctx.stroke();
        drawNode(ctx, node.left, x - offset, y + 60, offset / 2);
    }

    if (node.right !== null) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + offset, y + 60);
        ctx.stroke();
        drawNode(ctx, node.right, x + offset, y + 60, offset / 2);
    }
}

drawTree();
