import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
 
export default function Payment() {
   return (
       <PayPalScriptProvider options={{ "client-id": "AW5pF1We8b1Orr99Ci1jNQDuIxJg_lxtszoZ-qD7MUcxWeXcWOM1Y463UI49nOj6jkDuaiUfeycEb7lj" }}>
           <PayPalButtons style={{ layout: "horizontal" }} />
       </PayPalScriptProvider>
   );
}