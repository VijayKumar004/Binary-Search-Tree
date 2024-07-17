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
