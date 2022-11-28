import { useEffect, useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/seller/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsSeller(data.Seller);
          setSellerLoading(false);
        });
    }
  }, [email]);
  return [isSeller, sellerLoading];
};

export default useSeller;
