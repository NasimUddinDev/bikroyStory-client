import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoadin, setAdminLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(
        `https://bikroy-store-server-nasim0994.vercel.app/users/admin/${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.Admin);
          setAdminLoading(false);
        });
    }
  }, [email]);
  return [isAdmin, adminLoadin];
};

export default useAdmin;
