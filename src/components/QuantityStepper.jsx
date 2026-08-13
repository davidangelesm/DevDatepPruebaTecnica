export default function QuantityStepper({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="w-full bg-red rounded-full py-2.5 px-4 flex items-center justify-between text-white">
      <button className="w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-white transition-colors" onClick={onDecrease}>
        <img src="/assets/images/icon-decrement-quantity.svg" alt="Decrease quantity" />
      </button>
      <span className="font-semibold text-sm">{quantity}</span>
      <button className="w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-white transition-colors" onClick={onIncrease}>
        <img src="/assets/images/icon-increment-quantity.svg" alt="Increase quantity" />
      </button>
    </div>
  );
}