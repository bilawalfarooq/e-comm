import React from 'react';

const OrderTracking = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: 'Order Placed', icon: '📝' },
    { id: 2, label: 'Processing', icon: '⚙️' },
    { id: 3, label: 'Shipped', icon: '🚚' },
    { id: 4, label: 'Delivered', icon: '📦' }
  ];

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="order-tracking">
      <h3>Order Status</h3>
      <div className="tracking-steps">
        <div className="step-line">
          <div 
            className="step-line-progress" 
            style={{ width: `${progress}%` }}
          />
        </div>
        {steps.map(step => (
          <div key={step.id} className="tracking-step">
            <div 
              className={`step-icon ${
                step.id === currentStep ? 'active' : 
                step.id < currentStep ? 'completed' : ''
              }`}
            >
              {step.icon}
            </div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
      <p className="tracking-info">
        {currentStep === 1 && 'Your order has been placed and is being reviewed.'}
        {currentStep === 2 && 'We are processing your order and preparing it for shipment.'}
        {currentStep === 3 && 'Your order is on its way! Track your package with the provided tracking number.'}
        {currentStep === 4 && 'Your order has been delivered. Enjoy your purchase!'}
      </p>
    </div>
  );
};

export default OrderTracking;
