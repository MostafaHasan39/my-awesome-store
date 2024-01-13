import s from "./NavBar.module.scss";
import { useCart } from "@/contexts/cart";

const CartCount = () => {
  const { cartCount } = useCart();
  return <span className={s.cartCount}>{cartCount}</span>;
};
export default CartCount;
