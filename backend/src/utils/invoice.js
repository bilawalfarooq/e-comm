const PDFDocument = require('pdfkit');
const fs = require('fs');

// Generate a PDF invoice for an order
const generateInvoice = (order, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Date: ${order.createdAt}`);
    doc.text(`Customer: ${order.userId}`);
    doc.moveDown();
    doc.text('Products:');
    order.products.forEach((item, idx) => {
      doc.text(`${idx + 1}. Product: ${item.product}, Quantity: ${item.quantity}`);
    });
    doc.moveDown();
    doc.text(`Status: ${order.status}`);
    doc.text(`Shipping: ${order.shippingInfo?.address || ''}`);
    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

module.exports = generateInvoice;
