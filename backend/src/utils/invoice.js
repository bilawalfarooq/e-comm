const PDFDocument = require('pdfkit');
const fs = require('fs');

// Generate a PDF invoice for an order
// order: { _id, userId, products, total, shippingInfo, createdAt }
// user: { name, email }
async function generateInvoice(order, user, filePath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Date: ${order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}`);
    doc.text(`Customer: ${user.name} (${user.email})`);
    doc.moveDown();
    doc.text('Shipping Info:');
    doc.text(`${order.shippingInfo?.address || ''}`);
    doc.text(`${order.shippingInfo?.city || ''}, ${order.shippingInfo?.postalCode || ''}`);
    doc.text(`${order.shippingInfo?.country || ''}`);
    doc.text(`Phone: ${order.shippingInfo?.phone || ''}`);
    doc.moveDown();
    doc.text('Products:');
    order.products.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item.product?.name || item.product} x${item.quantity}`);
    });
    doc.moveDown();
    doc.fontSize(14).text(`Total: $${order.total || ''}`, { align: 'right' });
    doc.end();
    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
}

module.exports = { generateInvoice };
