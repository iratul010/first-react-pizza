import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [priority, setPriority] = useState(false);
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  //when submit then it word change dynamically
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formsErrors = useActionData();
  //my solution-"checked"
  const handlePriorityChange = e => {
    setPriority(e.target.checked);
  };
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/*React-Router-Dom-{Form} <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formsErrors?.phone && <p>{formsErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            //my codes
            checked={priority}
            onChange={handlePriorityChange}
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* hidden input : <div> এলিমেন্টটি আপনার ফর্মে একটি গোপন ইনপুট ফিল্ড যোগ করেছে। এই গোপন ইনপুট ফিল্ডটি ব্যবহার করে ডেটা স্টোর করা হয় যা ব্যবহারকারীর দৃষ্টিতে দেখা যায় না, কিন্তু ফর্ম জমা দেওয়া সময় সাথে পাঠানো যায়।*/}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting || !priority}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  //convert to object
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  //jonas-suggetions
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number, it might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;
  // top: if  return then under line not work
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
