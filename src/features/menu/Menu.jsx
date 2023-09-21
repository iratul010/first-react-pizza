import { useLoaderData } from "react-router-dom";

import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // const menu = useLoaderData(); এই লাইনটি React Router DOM এর একটি হুক ফাংশন ব্যবহার করে করা হচ্ছে যা সার্ভার থেকে ডেটা লোড করে পাওয়া মেনু তথ্যে সেট করে দেয়।
  const menu = useLoaderData();

  return (
    <ul className=" divide-y divide-stone-200 bg-red-50 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
