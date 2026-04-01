import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  MapPin, Calendar, Router, CreditCard, CheckCircle2,
  ChevronRight, ChevronLeft, Wifi, Shield, Building2, ArrowLeft, Lock
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";

type PaymentMethod = "card" | "paypal" | "applepay" | "googlepay" | "directdebit";
type CardType = "visa" | "mastercard" | "amex" | "discover" | "unknown";

interface LocationState {
  planName?: string;
  planSpeed?: string;
  planPrice?: number;
  billing?: "monthly" | "annually";
}

// ── Card type detection ──────────────────────────────────────────────────────
function detectCardType(number: string): CardType {
  const n = number.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^5[1-5]/.test(n) || /^2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^6(011|22|4[4-9]|5)/.test(n)) return "discover";
  return "unknown";
}
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 2) {
    return digits.slice(0, 2) + "/" + digits.slice(2, 4);
  }
  return digits.slice(0, 2);
}
function formatCardNumber(value: string, type: CardType): string {
  const digits = value.replace(/\D/g, "");
  // Amex: 4-6-5 groups; all others: 4-4-4-4
  if (type === "amex") {
    return digits.slice(0, 15).replace(/(\d{4})(\d{0,6})(\d{0,5})/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(" ")
    );
  }
  return digits.slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

// ── Card logo SVG components ─────────────────────────────────────────────────
function CardLogo({ type }: { type: CardType }) {
  if (type === "visa") return (
    <div className="h-6 px-2 bg-[#1A1F71] rounded flex items-center justify-center">
      <span className="text-white font-black italic text-sm tracking-tight">VISA</span>
    </div>
  );
  if (type === "mastercard") return (
    <div className="h-6 w-10 flex items-center justify-center">
      <div className="relative w-8 h-5">
        <div className="absolute left-0 w-5 h-5 bg-[#EB001B] rounded-full opacity-90" />
        <div className="absolute right-0 w-5 h-5 bg-[#F79E1B] rounded-full opacity-90" />
      </div>
    </div>
  );
  if (type === "amex") return (
    <div className="h-6 px-2 bg-[#2E77BC] rounded flex items-center justify-center">
      <span className="text-white font-black text-xs tracking-tight">AMEX</span>
    </div>
  );
  if (type === "discover") return (
    <div className="h-6 px-2 bg-[#FF6600] rounded flex items-center justify-center">
      <span className="text-white font-black text-xs tracking-tight">DISC</span>
    </div>
  );
  return <CreditCard size={20} className="text-zinc-500" />;
}

// ── Google Pay handler scaffold ──────────────────────────────────────────────
async function initiateGooglePay(amount: number): Promise<void> {
  // TODO: Replace with your real merchant config when ready
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [{
      type: "CARD",
      parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: ["MASTERCARD", "VISA"],
      },
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: "example",               // ← replace with your gateway (e.g. "stripe")
          gatewayMerchantId: "YOUR_MERCHANT_ID", // ← replace with your merchant ID
        },
      },
    }],
    merchantInfo: {
      merchantId: "YOUR_MERCHANT_ID",       // ← replace with your Google Pay merchant ID
      merchantName: "Vean Fibre",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPrice: amount.toFixed(2),
      currencyCode: "GBP",
      countryCode: "GB",
    },
  };
  console.log("Google Pay payload ready — wire up your gateway:", paymentRequest);
  // When ready: load the Google Pay JS lib and call paymentsClient.loadPaymentData(paymentRequest)
  alert("Google Pay: merchant credentials needed. See console for payload.");
}
const today = new Date().toISOString().split("T")[0];
// ── Apple Pay handler scaffold ───────────────────────────────────────────────
async function initiateApplePay(amount: number): Promise<void> {
  // Apple Pay only works in Safari on Apple devices with the Payment Request API
  if (!(window as any).ApplePaySession || !(window as any).ApplePaySession.canMakePayments()) {
    alert("Apple Pay is only available in Safari on Apple devices.");
    return;
  }
  const request = {
    countryCode: "GB",
    currencyCode: "GBP",
    supportedNetworks: ["visa", "masterCard", "amex"],
    merchantCapabilities: ["supports3DS"],
    total: { label: "Vean Fibre", amount: amount.toFixed(2) },
  };
  // TODO: Replace version number and add your merchant session validation endpoint
  const session = new (window as any).ApplePaySession(3, request);
  session.onvalidatemerchant = (event: any) => {
    // Call your server endpoint to validate with Apple:
    // fetch("/api/apple-pay/validate", { body: { validationURL: event.validationURL } })
    console.log("Apple Pay: validate merchant at", event.validationURL);
    alert("Apple Pay: add your merchant validation endpoint. See console.");
  };
  session.onpaymentauthorized = (event: any) => {
    console.log("Apple Pay token:", event.payment.token);
    session.completePayment((window as any).ApplePaySession.STATUS_SUCCESS);
  };
  session.begin();
}

// ── Main component ───────────────────────────────────────────────────────────
export function Checkout() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mesh, setMesh] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  // Address
  const [postcode, setPostcode] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [addressTouched, setAddressTouched] = useState({ postcode: false, address1: false, city: false });
  const addressValid = postcode.trim() !== "" && address1.trim() !== "" && city.trim() !== "";
  const touchAll = () => setAddressTouched({ postcode: true, address1: true, city: true });

  // Card
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardType, setCardType] = useState<CardType>("unknown");

  useEffect(() => {
    setCardType(detectCardType(cardNumber));
  }, [cardNumber]);

  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || {};

  const planName  = state.planName  ?? "Pro";
  const planSpeed = state.planSpeed ?? "500";
  const planPrice = state.planPrice ?? 35.00;
  const billing   = state.billing   ?? "monthly";

  const steps = [
    { num: 1, title: "Address",      icon: <MapPin size={20} /> },
    { num: 2, title: "Installation", icon: <Calendar size={20} /> },
    { num: 3, title: "Equipment",    icon: <Router size={20} /> },
    { num: 4, title: "Payment",      icon: <CreditCard size={20} /> },
  ];

  const nextStep = () => {
    if (step === 1 && !addressValid) { touchAll(); return; }
    if (step === 4) { navigate("/order-success"); return; }
    setStep((s) => Math.min(4, s + 1));
  };
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const meshPrice = mesh ? 10.00 : 0;
  const total = planPrice + meshPrice;

  const paymentOptions: { id: PaymentMethod; label: string; description: string }[] = [
    { id: "card",        label: "Credit / Debit Card", description: "Visa, Mastercard, Amex, Discover" },
    { id: "applepay",    label: "Apple Pay",           description: "Safari on iPhone, iPad, or Mac" },
    { id: "googlepay",   label: "Google Pay",          description: "Chrome on Android or desktop" },
    { id: "paypal",      label: "PayPal",              description: "Pay via your PayPal balance or linked card" },
    { id: "directdebit", label: "Direct Debit",        description: "UK bank account — most common for bills" },
  ];

  return (
    <div className="flex w-full bg-zinc-950 min-h-screen pt-32 pb-24 text-zinc-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Floating Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-8 left-8 z-50 flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-5 py-3 rounded-full font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-2/3 flex flex-col">

          {/* Progress bar */}
          <div className="w-full mb-12">
            <div className="flex justify-between items-center relative mb-8">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-zinc-800 -z-10 rounded-full">
                <motion.div className="h-full bg-lime-400 rounded-full" initial={{ width: "0%" }} animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} transition={{ duration: 0.3 }} />
              </div>
              {steps.map((s) => (
                <div key={s.num} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${step >= s.num ? "bg-lime-400 text-zinc-950" : "bg-zinc-900 border border-zinc-700 text-zinc-500"}`}>
                    {step > s.num ? <CheckCircle2 size={20} /> : s.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide hidden sm:block ${step >= s.num ? "text-lime-400" : "text-zinc-600"}`}>{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            <AnimatePresence mode="wait">
            
            const today = new Date().toISOString().split("T")[0];
              // ONLY showing Step 1 & Step 2 sections with improvements applied

// Add this above your component


/* ── Step 1: Address ── */
{step === 1 && (
  <motion.div
    key="step1"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="flex flex-col gap-6"
  >
    <h2 className="text-3xl font-black mb-2">Where are we connecting?</h2>
    <p className="text-zinc-400 mb-4">
      We just need a few details to get your installation sorted.
    </p>

    {/* 
      ── Google Maps Integration (TODO) ──

      1. Add script in index.html:
         <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

      2. Replace inputs with autocomplete:
         const autocomplete = new google.maps.places.Autocomplete(inputRef)

      3. Autofill:
         - postcode
         - address line 1
         - city

      4. Optional:
         - Map preview
         - Lat/Lng storage
         - Service availability check

      Recommended libs:
         - @react-google-maps/api
         - use-places-autocomplete
    */}

    <div className="space-y-4">
      {/* Postcode */}
      <div>
        <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">
          Postcode <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
          placeholder="e.g. SW1A 1AA"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">
          Address Line 1 <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
          placeholder="123 Fibre Street"
        />
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">
          City <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
          placeholder="London"
        />
      </div>
    </div>

    <div className="mt-8 flex justify-end">
      <button
        onClick={nextStep}
        className="bg-lime-400 text-zinc-950 px-8 py-3 rounded-full font-black"
      >
        Continue
      </button>
    </div>
  </motion.div>
)}

/* ── Step 2: Installation ── */
{step === 2 && (
  <motion.div
    key="step2"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="flex flex-col gap-6"
  >
    <h2 className="text-3xl font-black mb-2">Schedule your visit</h2>
    <p className="text-zinc-400 mb-4">
      Our engineers usually take about 1-2 hours.
    </p>

    <div className="space-y-6">
      {/* Date with past disabled */}
      <div>
        <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">
          Select Date
        </label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
        />
      </div>

      {/* Time Slots (Better UI) */}
      <div>
        <label className="block text-sm font-bold text-zinc-500 mb-3 uppercase tracking-wide">
          Select Time
        </label>

        {/*
          Replace native <input type="time"> with selectable slots
          Benefits:
          - Better UI
          - Control availability
          - Easy backend integration
        */}

        <div className="grid grid-cols-3 gap-3">
          {[
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
          ].map((slot) => (
            <button
              key={slot}
              onClick={() => setTime(slot)}
              className={`py-3 rounded-xl border font-bold transition-all
                ${
                  time === slot
                    ? "bg-lime-400 text-zinc-950 border-lime-400"
                    : "bg-zinc-950 border-zinc-800 hover:border-lime-400"
                }`}
            >
              {slot}
            </button>
          ))}
        </div>

        <p className="text-xs text-zinc-500 mt-2">
          Engineers arrive within 2 hours of selected slot.
        </p>
      </div>
    </div>

    <div className="mt-8 flex justify-between">
      <button onClick={prevStep} className="text-zinc-400">
        Back
      </button>

      <button
        onClick={nextStep}
        disabled={!date || !time}
        className="bg-lime-400 text-zinc-950 px-8 py-3 rounded-full font-black disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  </motion.div>
)}

              {/* ── Step 3: Equipment ── */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="text-3xl font-black mb-2">Choose your gear</h2>
                  <p className="text-zinc-400 mb-4">Every plan includes our standard Wi-Fi 6 router, but you can upgrade to our Pro Mesh system if you have a larger home.</p>
                  <div className="space-y-4">
                    <label className={`relative flex p-6 rounded-2xl border-2 cursor-pointer transition-colors ${!mesh ? "border-lime-400 bg-lime-400/5" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"}`}>
                      <div className="flex items-center h-6"><input name="router" type="radio" checked={!mesh} onChange={() => setMesh(false)} className="w-5 h-5 text-lime-400 bg-zinc-900 border-zinc-700 focus:ring-lime-400 focus:ring-2" /></div>
                      <div className="ml-4 flex flex-col"><span className="font-black text-lg text-white">Standard Router</span><span className="text-zinc-400 text-sm mt-1">Included free. Great for apartments and smaller houses.</span></div>
                      <div className="ml-auto font-black text-lime-400 flex items-center">Free</div>
                    </label>
                    <label className={`relative flex p-6 rounded-2xl border-2 cursor-pointer transition-colors ${mesh ? "border-lime-400 bg-lime-400/5" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"}`}>
                      <div className="flex items-center h-6"><input name="router" type="radio" checked={mesh} onChange={() => setMesh(true)} className="w-5 h-5 text-lime-400 bg-zinc-900 border-zinc-700 focus:ring-lime-400 focus:ring-2" /></div>
                      <div className="ml-4 flex flex-col"><span className="font-black text-lg text-white">Vean Pro Mesh System</span><span className="text-zinc-400 text-sm mt-1">2-node Wi-Fi 6E system. Eliminates dead zones in large homes.</span></div>
                      <div className="ml-auto font-black text-white flex flex-col items-end justify-center"><span className={mesh ? "text-lime-400" : ""}>+£10</span><span className="text-xs text-zinc-500 font-bold">/month</span></div>
                    </label>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={prevStep} className="text-zinc-400 hover:text-white px-4 py-3 rounded-full font-bold flex items-center gap-2 transition-colors"><ChevronLeft size={20} /> Back</button>
                    <button onClick={nextStep} className="bg-lime-400 hover:bg-lime-500 text-zinc-950 px-8 py-3 rounded-full font-black flex items-center gap-2 transition-transform active:scale-95">
                      Continue to Payment <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 4: Payment ── */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                  <h2 className="text-3xl font-black mb-2">Payment Details</h2>
                  <p className="text-zinc-400 mb-2">You won't be charged until your service is active and installed.</p>

                  {/* Payment method selector */}
                  <div className="space-y-3">
                    {paymentOptions.map((option) => (
                      <button key={option.id} onClick={() => setPaymentMethod(option.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${paymentMethod === option.id ? "border-lime-400 bg-lime-400/5" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"}`}
                      >
                        {/* Badge */}
                        <div className="w-16 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden bg-zinc-900 border border-zinc-700">
                          {option.id === "card"        && <CreditCard size={18} className="text-zinc-300" />}
                          {option.id === "applepay"    && <span className="text-white font-bold text-xs tracking-tight"> Pay</span>}
                          {option.id === "googlepay"   && <span className="font-bold text-xs"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span></span>}
                          {option.id === "paypal"      && <span className="text-[#009CDE] font-black text-xs">Pay<span className="text-[#003087]">Pal</span></span>}
                          {option.id === "directdebit" && <span className="text-[#7ec8f7] font-bold text-xs">DD</span>}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-white">{option.label}</div>
                          <div className="text-zinc-400 text-sm">{option.description}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${paymentMethod === option.id ? "border-lime-400 bg-lime-400" : "border-zinc-600"}`}>
                          {paymentMethod === option.id && <div className="w-2 h-2 rounded-full bg-zinc-950" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic fields per method */}
                  <AnimatePresence mode="wait">

                    {/* ── Card fields with live detection ── */}
                    {paymentMethod === "card" && (
                      <motion.div key="card-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">Name on Card</label>
                            <input type="text" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium" placeholder="Jane Doe" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide flex items-center justify-between">
                              <span>Card Number</span>
                              {/* Live card type logo */}
                              <AnimatePresence>
                                {cardType !== "unknown" && (
                                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                                    <CardLogo type={cardType} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => {
                                  const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                                  const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
                                  setCardNumber(formatted);
                                }}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium font-mono"
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                {cardType === "unknown" ? <CreditCard size={20} className="text-zinc-500" /> : <CardLogo type={cardType} />}
                              </div>
                            </div>
                            {cardType !== "unknown" && (
                              <p className="text-lime-400 text-xs mt-1 font-bold capitalize">{cardType} card detected</p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">Expiry</label>
                              <input 
                                type="text" 
                                value={cardExpiry}
                                onChange={(e) => {
                                  const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                                  if (digits.length >= 2) {
                                    setCardExpiry(digits.slice(0, 2) + "/" + digits.slice(2, 4));
                                  } else {
                                    setCardExpiry(digits);
                                  }
                                }}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium font-mono" 
                                placeholder="MM / YY" 
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">
                                {cardType === "amex" ? "CID (4 digits)" : "CVV"}
                              </label>
                              <input type="text" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium font-mono" placeholder={cardType === "amex" ? "0000" : "123"} maxLength={cardType === "amex" ? 4 : 3} />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-500 text-xs">
                            <Lock size={12} /> Your card details are encrypted and never stored on our servers.
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Apple Pay ── */}
                    {paymentMethod === "applepay" && (
                      <motion.div key="applepay-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center gap-4">
                          <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-white text-xl font-bold"></div>
                          <p className="text-sm text-zinc-400 text-center">Click the button below to pay with Apple Pay. You'll be prompted to confirm with Face ID or Touch ID.</p>
                          <button
                            onClick={() => initiateApplePay(total)}
                            className="w-full bg-black text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 hover:bg-zinc-900 border border-zinc-700 transition-colors"
                          >
                             Pay  £{total.toFixed(2)}
                          </button>
                          <p className="text-xs text-zinc-600 text-center">Only available in Safari on Apple devices. Add your merchant ID to activate.</p>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Google Pay ── */}
                    {paymentMethod === "googlepay" && (
                      <motion.div key="googlepay-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center gap-4">
                          <div className="flex items-center gap-1 text-2xl font-bold">
                            <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
                            <span className="text-white ml-1">Pay</span>
                          </div>
                          <p className="text-sm text-zinc-400 text-center">Click the button below to pay with Google Pay. Works in Chrome on Android and desktop.</p>
                          <button
                            onClick={() => initiateGooglePay(total)}
                            className="w-full bg-white text-zinc-950 font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors"
                          >
                            <span className="text-[#4285F4] font-black">G</span> Pay  £{total.toFixed(2)}
                          </button>
                          <p className="text-xs text-zinc-600 text-center">Add your Google Pay merchant ID and gateway to activate.</p>
                        </div>
                      </motion.div>
                    )}

                    {/* ── PayPal ── */}
                    {paymentMethod === "paypal" && (
                      <motion.div key="paypal-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center gap-4">
                          <p className="text-sm text-zinc-400 text-center">After confirming your order you'll be redirected to PayPal to complete your payment securely.</p>
                          <div className="w-full bg-[#FFC439] text-[#003087] font-black py-4 rounded-2xl text-base flex items-center justify-center gap-2">
                            <span className="text-[#003087]">Pay</span><span className="text-[#009CDE]">Pal</span> — £{total.toFixed(2)}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Direct Debit ── */}
                    {paymentMethod === "directdebit" && (
                      <motion.div key="dd-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">Account Holder Name</label>
                            <input type="text" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium" placeholder="Full name as on your account" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">Sort Code</label>
                              <input type="text" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium font-mono" placeholder="00-00-00" maxLength={8} />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">Account Number</label>
                              <input type="text" className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-medium font-mono" placeholder="12345678" maxLength={8} />
                            </div>
                          </div>
                          <div className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                            <Building2 className="text-lime-400 shrink-0 mt-0.5" size={18} />
                            <p className="text-xs text-zinc-400 leading-relaxed">
                              Protected by the <span className="text-white font-bold">Direct Debit Guarantee</span>. Cancel any time with a full refund of any erroneous payments.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex justify-between items-center">
                    <button onClick={prevStep} className="text-zinc-400 hover:text-white px-4 py-3 rounded-full font-bold flex items-center gap-2 transition-colors"><ChevronLeft size={20} /> Back</button>
                    {paymentMethod !== "applepay" && paymentMethod !== "googlepay" && (
                      <button onClick={nextStep} className="bg-lime-400 hover:bg-lime-500 text-zinc-950 px-8 py-4 rounded-full font-black flex items-center gap-2 transition-transform active:scale-95 text-lg">
                        Confirm Order
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl sticky top-32">
            <h3 className="text-xl font-black mb-6">Order Summary</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-zinc-800 pb-6">
                <div>
                  <div className="font-bold text-lg">Vean {planName}</div>
                  <div className="text-zinc-400 text-sm flex items-center gap-1 mt-1"><Wifi size={14} /> {planSpeed} Mbps Average Speed</div>
                  {billing === "annually" && (
                    <div className="mt-2 inline-flex items-center gap-1 bg-lime-400/10 text-lime-400 text-xs font-bold px-2 py-0.5 rounded-full border border-lime-400/20">Annual billing — 10% off</div>
                  )}
                </div>
                <div className="font-black text-lg">£{planPrice.toFixed(2)}</div>
              </div>
              <div className="space-y-3 border-b border-zinc-800 pb-6">
                <div className="flex justify-between items-center text-sm"><span className="text-zinc-400">Upfront installation</span><span className="font-bold text-lime-400">FREE</span></div>
                <div className="flex justify-between items-center text-sm"><span className="text-zinc-400">Standard Wi-Fi 6 Router</span><span className="font-bold">Included</span></div>
                {mesh && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">Pro Mesh Upgrade</span><span className="font-bold">£{meshPrice.toFixed(2)}</span>
                  </motion.div>
                )}
                {date && time && (
                  <div className="flex justify-between items-start text-sm bg-zinc-950 p-3 rounded-lg border border-zinc-800 mt-2">
                    <span className="text-zinc-400">Install Visit</span>
                    <div className="text-right">
                      <div className="font-bold">{new Date(date).toLocaleDateString()}</div>
                      <div className="text-xs text-lime-400">{time}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-zinc-400">Monthly total</span>
                <span className="text-3xl font-black text-white">£{total.toFixed(2)}</span>
              </div>
              <div className="bg-lime-400/10 border border-lime-400/20 rounded-xl p-4 flex gap-3 mt-4">
                <Shield className="text-lime-400 shrink-0" size={20} />
                <p className="text-xs text-lime-400/80 leading-relaxed">Fixed price guarantee. Your monthly price won't increase during your contract term.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
